let container = document.querySelectorAll('div')[0];
let form = document.getElementById('ip-form');
let ip = document.getElementById('ip');
let id = document.getElementById('id');
let cleanButton = document.getElementById('clean');
let contractEvents;
let swarmHash;
let swarmHashList;
let IPList = [];
let formData;
let accounts;

window.addEventListener('load', () => {
    // Set up web3 in...
    // Modern dapp browsers...
   if (window.ethereum) {
       window.web3 = new Web3(ethereum);
       try {
           // Request account access if needed
           ethereum.enable();
           // Acccounts now exposed
           web3.eth.sendTransaction({/* ... */});
       } catch (error) {
           // User denied account access...
       }
   }
   // Legacy dapp browsers...
   else if (window.web3) {
       window.web3 = new Web3(web3.currentProvider);
       // Acccounts always exposed
       web3.eth.sendTransaction({/* ... */});
       console.log(web3.currentProvider);
   }
   // Non-dapp browsers...
   else {
       console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
   }

   if (web3) {
       if (web3.eth.accounts.length) {
           // if not locked, get account
           const account = web3.eth.accounts[0];
           // updates UI, state, pull data
       } else {
           // locked. update UI. Ask user to unlock.
           console.log('Your account is locked');
       }

    switch (web3.version.network) {
        case '1':
            console.log('This is mainnet');
            break;
        case '2':
            console.log('This is the deprecated Morden test network.');
            break;
        case '3':
            console.log('This is the ropsten test network.');
            break;
        case '4':
            console.log('This is the Rinkeby test network.');
            break;
        case '42':
            console.log('This is the Kovan test network.');
            break;
        default:
            console.log('This is an unknown network.');
            break;
    }

    const desiredNetwork = '4';
    if (web3.version.network !== desiredNetwork) {
        // ask user to switch to desired network
        console.log('Please switch to Rinkeby network.');
    }
    
    // get user's account
    web3.eth.getAccounts((error,result) => {
        if (error) {
            console.log(error);
        } else {
            console.log(result);
            accounts = result;
        }       
    });
    console.log('accounts', accounts);

    // get smart contract
    const DappWallABI = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_swarmHashList",
                    "type": "bytes32"
                }
            ],
            "name": "update",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "_from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "_swarmHashList",
                    "type": "bytes32"
                }
            ],
            "name": "listIP",
            "type": "event"
        }
    ];
    const DappWallContract = new web3.eth.Contract(DappWallABI, '0x6a826edef7645119bf0f3fea05a480f9bb89fb9a');

    // the real thing
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // events = SmartContractGet(DappWallContract)
        DappWallContract.getPastEvents('listIP', {
            fromBlock: 4445524, 	//meter el bloque donde se despliega el contrato
            toBlock: 'latest'
        }, (error, events) => {
            for ( let i = 0; i < events.length; i++ ) {
                console.log('Past events from smart contract', events[i].returnValues);
            }
            contractEvents = events[events.length - 1].returnValues;
            swarmHash = contractEvents['_swarmHashList'];
            // swarmHashList.push(swarmHashList.slice(2, swarmHashList.length));
        })
        
        formData = {
            id: id.value,
            ip: ip.value
        }

        IPList.push(formData);
        console.log('This is the current ip list', IPList);

        // POST to Swarm with fetch
        fetch("https://swarm-gateways.net/bzz:/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(formData)
        })
        .then(res => res.text())
        .then(data => {
            console.log('Swarm hash after post', data);
            swarmHash = data;

            // POST IP list to Swarm
            fetch("https://swarm-gateways.net/bzz:/", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(IPList)
            })
            .then( res => res.text())
            .then( data => {
                console.log('Swarm hash for the IP list', data);

                swarmHashList = data;

                // POST SwarmHashList to smart DappWallContract
                DappWallContract.methods.update('0x' + swarmHashList).send({from: accounts[0]}, (error, transactionHash) => {
                    console.log(transactionHash);
                    return transactionHash
                });

                 // This is ONLY FOR CHECKING PURPOSES
                // GET from Swarm with fetch
                // http://swarm.protocol-bt.ml/bzz:/
                fetch(`https://swarm-gateways.net/bzz:/${swarmHashList}`, {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    method: "GET",
                })
                .then( res => res.text())
                .then( data => {
                    console.log('IP list in Swarm', data);
                })
                .catch( err => console.log(err));

            })
            .catch( err => console.log(err));

        })

    });
    }
})