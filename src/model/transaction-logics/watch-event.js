const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

web3.eth.sendTransaction({from: '0x123...', data: '0x432...'})
.once('sending', function(payload){ console.log('testing'); })
.once('sent', function(payload){ console.log('testing'); })
.once('transactionHash', function(hash){ console.log('testing'); })
.once('receipt', function(receipt){ console.log('testing'); })
.on('confirmation', function(confNumber, receipt, latestBlockHash){ console.log('testing'); })
.on('error', function(error){ console.log('testing'); })
.then(function(receipt){
    // will be fired once the receipt is mined
});