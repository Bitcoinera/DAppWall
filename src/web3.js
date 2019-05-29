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

window.dappWallABI = DappWallABI;