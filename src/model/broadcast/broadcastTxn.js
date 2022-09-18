const Web3 = require('web3');
const Tx = require("ethereumjs-tx").Transaction;
import { Transaction } from '@ethereumjs/tx'
//let web3 = new Web3("https://ropsten.infura.io/v3/API-KEY");
//let web3 = new Web3("https://mainnet.infura.io/v3/API-KEY");
let web3 = new Web3("https://bsc-mainnet.web3api.com/v1/API-KEY");

async function broadcastTXN(signedTx) {
              
    try {
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
       console.log("TXN RECEIPT");
       console.log(receipt);
      
    }catch(err) {
      console.log(err);
    }
}
module.exports.broadcastTXN = broadcastTXN;