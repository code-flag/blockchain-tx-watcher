const express = require("express");
const router = express.Router();
const Web3 = require('web3');
const getMessage = require("../message/message-handler");
const { submitTXNWithContract } = require("../model/transactions/processTransaction");
// const Tx = require("ethereumjs-tx").Transaction;
// import { Transaction } from '@ethereumjs/tx';

// const axios = require('axios');
require("dotenv/config");
const MAINNET = process.env.MAINNET_ENDPOINT;
const TESTNET =  process.env.TEST_ENDPOINT;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const web3 = new Web3(TESTNET);

const submitTXN = async (address_to, amount, privateKey) => {
  
  const amountCoin = Web3.utils.toWei(amount, 'ether');//BNB value
  console.log("Request ID : "+ address_to, "Amount : "+amount);

  let rawTx = {
    to: address_to, 
    gas: "26000", 
    value: amountCoin,
  };
  try {
    const signedTx  = await web3.eth.accounts.signTransaction(rawTx, privateKey);
     console.log("SIGNED TXN", "Txn Hash : " + signedTx.transactionHash);

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
     console.log("TXN RECEIPT", receipt);
     const result = {
      transaction_hash: signedTx.transactionHash,
      transaction_reciept: receipt
     }

     console.log('txn result', result);

     return result;
    
  }catch(err) {
    console.log(err);
    return err.message;
  }
}

router.post("/", async (req, res) => {

  if (req.body?.address_to == undefined || 
    req.body?.address_to == null ||
    req.body?.address_to == '' ||
    typeof req.body?.address_to == "number" ||

    req.body?.contract_address == undefined || 
    req.body?.contract_address == null ||
    req.body?.contract_address == '' ||
    typeof req.body?.contract_address == "number" ||
    
    req.body?.amount == undefined ||
    req.body?.amount == null ||
    req.body?.amount == '' 
    ) {
    res.status(400).json(
      getMessage([], 'Invalid parameter or incompleted data', false, 400 )
    );
  }
  else {
    try {
      const transactionResponse = await submitTXNWithContract(req.body?.address_to, req.body?.amount, req.body?.contract_address, PRIVATE_KEY);
      console.log('transaction response', transactionResponse);
      res.status(200).json(getMessage([transactionResponse], 'Transaction completed', true, 200));
    } catch (error) {
      console.log(error.message);
      res.status(400).json(getMessage([], error?.message, false, 400));
    }

  }

});


module.exports = router;





