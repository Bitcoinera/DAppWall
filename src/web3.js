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
        window.web3 = web3;

        if (web3.eth.accounts.length) {
            // if not locked, get account
            const account = web3.eth.accounts[0];
            // updates UI, state, pull data
        } else {
            // locked. update UI. Ask user to unlock.
            console.log('Your account is locked');
        }

        console.log('web3 version', web3.version.network);
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
    }
})