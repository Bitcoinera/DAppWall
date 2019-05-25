let form = document.getElementById('ip-form');
let input = document.getElementById('ip');
let events;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(input.value);
    let contract = window.contract;

    // events = SmartContractGet(contract)
    contract.getPastEvents('listIP', {
        fromBlock: 0, 	//meter el bloque donde se despliega el contrato
        toBlock: 'latest'
    }, (error, events) => {
        console.log(events[0].returnValues)
        return events;
    })
})
