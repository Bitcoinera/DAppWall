let container = document.querySelectorAll('div')[0];
let form = document.getElementById('ip-form');
let input = document.getElementById('ip');
let contractEvents;
let swarmHashList;

form.addEventListener('submit', async (e) => {
    //e.preventDefault();
    console.log(input.value);
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
        console.log('This is the list ' + swarmHashList);

        let paragraph = document.createElement('p');
        paragraph.innerHTML = 'This is your hash';
        container.appendChild(paragraph);

        // add link to make Swarm GET Request
        let hash = document.createElement('a');
        hash.href = swarmHashList;
        hash.innerHTML = swarmHashList;
        container.appendChild(hash);

        // contract.methods.update(swarmHashList).send({from: '0x0dcd2f752394c41875e259e00bb44fd505297caf'}, (error, transactionHash) => {
        //     console.log(transactionHash);
        //     return transactionHash
        // });
    })
})
