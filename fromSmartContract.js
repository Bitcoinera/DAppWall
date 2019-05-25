const Web3 = require('web3');
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
const DappWallContract = new web3.eth.Contract(DappWallABI, '0x6a826edef7645119bf0f3fea05a480f9bb89fb9a');

function SmartContractGet() {
	DappWallContract.getPastEvents('listIP', {
		fromBlock: 0, 	//meter el bloque donde se despliega el contrato
		toBlock: 'latest'
	}, (error, events) => {
		console.log(events);
	})
}

SmartContractGet();

// function SmartContractSend(swarmHashList) {
// 	DappWallContract.methods.update(swarmHashList).send({from: '0x0dcd2f752394c41875e259e00bb44fd505297caf'}, (error, transactionHash) => {
// 		console.log(transactionHash);
// 		return transactionHash
// 	});
// };
