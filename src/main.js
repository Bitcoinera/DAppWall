let form = document.getElementById('ip-form');
let input = document.getElementById('ip');

form.addEventListener('submit', async (e) => {
    //e.preventDefault();
    console.log(input.value);
})


// Para coger el código del Smart Contract
var upadateEvent = dappWallContract.Deposit({_swarmHashList: web3.eth.coinbase});
upadateEvent.watch(function(err, result) {
  if (err) {
    console.log("Esto no sale")
    return;
  }
  console.log(result.args._value)
  // check that result.args._swarmHashList is web3.eth.coinbase then
  // display result.args._value in the UI and call
  // upadateEvent.stopWatching()
})
dappWallContract.update.sendTransaction(2, {from: web3.eth.coinbase})
