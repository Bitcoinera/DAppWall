// Hacer bien import
const web3 = new Web3("https://rinkeby.infura.io/v1");
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
const DappWallContract = new web3.eth.Contract(DappWallABI, 0x0dcd2f752394c41875e259e00bb44fd505297caf);

DappWallContract.getPastEvents('listIP', {
    fromBlock: 4444785, 	//meter el bloque donde se despliega el contrato
    toBlock: 'latest'
}, (error, events) => {
	console.log(events);
});

function SmartContractSend(swarmHashList) {
	DappWallContract.methods.update(swarmHashList).send({from: '0x0dcd2f752394c41875e259e00bb44fd505297caf'}, (error, transactionHash) => {
	    return transactionHash
	});
};
