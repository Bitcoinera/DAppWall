let container = document.querySelectorAll('div')[0];
let form = document.getElementById('ip-form');
// let id = document.getElementById('id');
let ip = document.getElementById('ip');
let label = document.getElementById('label');
let ipRegExp = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/)(\d{2})$/;
let labelRegExp = /^SBL(\d{6})$/;
let contractEvents;
let swarmHash;
let swarmHashList;
let IPList = [];
let formData;
let accounts;
let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

window.addEventListener('load', () => {

    if(window.web3) {

        // get smart contract
        const DappWallContract = new web3.eth.Contract(window.dappWallABI, '0x6a826edef7645119bf0f3fea05a480f9bb89fb9a');

        // the real thing
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            // delete warning message
            let warnings = document.querySelectorAll('.warning');
            // retrieve red from input
            ip.style.borderColor = '';
            label.style.borderColor = '';
            if ( warnings.length > 0 ) {
                warnings.forEach( w => w.remove() );
            }

            let ipForm = ip.value;
            let labelForm = label.value;
            // validate input is a ipv4 address
            if ( ipForm.match(ipRegExp) && labelForm.match(labelRegExp) ) {

                // First of all, call smart contract and get the current IP list from Swarm
                DappWallContract.getPastEvents('listIP', {
                    fromBlock: 4445524, 	//meter el bloque donde se despliega el contrato
                    toBlock: 'latest'
                }, (error, events) => {

                    contractEvents = events[events.length - 1].returnValues;
                    swarmHash = contractEvents['_swarmHashList'];
                    swarmHashList = swarmHash.slice(2, swarmHash.length);
                    console.log('current swarmHashList is', swarmHashList);

                    // GET IP List from Swarm
                    fetch(`https://swarm-gateways.net/bzz:/${swarmHashList}`, {
                        headers: headers,
                        method: 'GET',
                    })
                    .then( res => res.text())
                    .then( data => {
                        console.log('IP list in Swarm', data);
                        IPList = JSON.parse(data);

                        formData = {
                            // id: id.value,
                            ip: ip.value,
                            label: label.value
                        }
                        
                        IPList.push(formData);
                        console.log('This is the current ip list', IPList);
                        
                        // POST IP list to Swarm
                        fetch('https://swarm-gateways.net/bzz:/', {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify(IPList)
                        })
                        .then( res => res.text())
                        .then( data => {
                            console.log('new swarmHashList', data);
            
                            swarmHashList = data;
            
                            // POST SwarmHashList to smart DappWallContract
                            DappWallContract.methods.update('0x' + swarmHashList).send({from: accounts[0]}, (error, transactionHash) => {
                                console.log('tx hash from smart contract', transactionHash);
                            });
            
                            // This is ONLY FOR CHECKING PURPOSES
                            // GET from Swarm with fetch
                            fetch(`https://swarm-gateways.net/bzz:/${swarmHashList}`, {
                                headers: headers,
                                method: 'GET',
                            })
                            .then( res => res.text())
                            .then( data => {
                                console.log('IP list in Swarm AFTER POST', data);
                                // send current iplist after post to node, to update iptables
                                fetch('http://localhost:3000', {
                                    headers: headers,
                                    method: 'POST',
                                    body: data
                                })
                            })
                            .catch( err => console.log(err));
            
                        })
                    })
                    .catch( err => console.log(err));
    
                })
            } else {
                // warning messages & form validation
                let warningMessage = document.createElement('span');
                warningMessage.className = 'warning';
                warningMessage.style.color = 'red';

                // check whether the ip range or label was incorrectly entered
                if (!ipForm.match(ipRegExp)) {
                    ip.style['border-color'] = 'red';
                    warningMessage.innerHTML = 'Please, enter a correct IP range';
                } else {
                    label.style['border-color'] = 'red';
                    warningMessage.innerHTML = 'Please, enter a correct IP label';
                }

                document.body.appendChild(warningMessage);
            }


        });

    }
})