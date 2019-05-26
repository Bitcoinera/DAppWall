let container = document.querySelectorAll('div')[0];
let form = document.getElementById('ip-form');
let ip = document.getElementById('ip');
let id = document.getElementById('id');
let contractEvents;
let swarmHash;
let swarmHashList;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let contract = window.contract;

    // events = SmartContractGet(contract)
    contract.getPastEvents('listIP', {
        fromBlock: 0, 	//meter el bloque donde se despliega el contrato
        toBlock: 'latest'
    }, (error, events) => {
        console.log(events[0].returnValues);
        contractEvents = events[0].returnValues;
        swarmHashList = contractEvents['_swarmHashList'];
        swarmHashList = swarmHashList.slice(2, swarmHashList.length);

        let paragraph = document.createElement('p');
        paragraph.innerHTML = 'This is your hash';
        container.appendChild(paragraph);

        // add link to make Swarm GET Request
        let hash = document.createElement('a');
        hash.href = swarmHashList;
        hash.innerHTML = swarmHashList;
        container.appendChild(hash);

        let formData = {
            id: id.value,
            ip: ip.value
        }

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
            console.log(data);
            swarmHash = data;

            // GET from Swarm with fetch
            //http://swarm.protocol-bt.ml/bzz:/
            fetch(`https://swarm-gateways.net/bzz:/${swarmHash}`, {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method: "GET",
            })
            .then( res => res.text())
            .then( data => console.log(data))
            .catch( err => console.log(err));
        })
        .catch(err => console.log({err}));



        // contract.methods.update(swarmHashList).send({from: '0x0dcd2f752394c41875e259e00bb44fd505297caf'}, (error, transactionHash) => {
        //     console.log(transactionHash);
        //     return transactionHash
        // });
    })
})
