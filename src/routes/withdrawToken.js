const express = require("express");
const router = express.Router();
const Web3 = require('web3');
const getMessage = require("../message/message-handler");
const creditUserAccount = require("../model/mutation/deposit-to-user-account");
const { submitTXNWithContract } = require("../model/transactions/processTransaction");
// const Tx = require("ethereumjs-tx").Transaction;
// import { Transaction } from '@ethereumjs/tx';
// const axios = require('axios');
require("dotenv/config");
const MAINNET = process.env.MAINNET_ENDPOINT;
const TESTNET =  process.env.TEST_ENDPOINT;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const web3 = new Web3(TESTNET);

/**
 * This method determine what type of coin is sent
 * @param {string} walletType- walletTypeis the 'to' field return from transaction hash
 * - The contract is constant for USDT and SZCB only while varies for BNB
 * @returns string
 */
 const getCoinType = (walletType) => {
  if (walletType.toLowerCase() == "usdt") {
    return process.env.USDT;
    // return "USDT";
  }
  else if (walletType.toLowerCase() == "szcb") {
    return process.env.SZCB;
    // return "SZCB"
  }
  else {return 0};
};


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

    req.body?.wallet_id == undefined || 
    req.body?.wallet_id == null ||
    req.body?.wallet_id == '' ||
    typeof req.body?.wallet_id == "number" ||
    
    req.body?.amount == undefined ||
    req.body?.amount == null ||
    req.body?.amount == '' ||
    req.body?.request_id == undefined ||
    req.body?.request_id == null ||
    req.body?.request_id == '' ||
    req.body?.user_id == undefined ||
    req.body?.user_id == null ||
    req.body?.user_id == ''
    ) {
    res.status(400).json(
      getMessage([], 'Invalid parameter or incompleted data', false, 400 )
    );
  }
  else {
    try {
      const contractAddress = getCoinType(req.body?.wallet_id);
      const transactionResponse = await submitTXNWithContract(req.body?.address_to, req.body?.amount,contractAddress, PRIVATE_KEY, req.body?.wallet_id);
      console.log('transaction response', transactionResponse);
      if (transactionResponse.status === true) {
        res.status(200).json(getMessage(transactionResponse, 'Transaction completed', true, 200));
      }
      else {
        const zugavalizeData = {
          wallet_id: req.body.wallet_id,
          amount: transactionResponse.amount,
          request_id: req.body.request_id,
          user_id: req.body.user_id,
          note: "user transaction failed. Money reversed",
        };
        const creditEnpoint = "https://backend.zugavalize.io/wp-json/rimplenet/v1/credits";
        try {
          // deposit transaction value to user account
        const creditUserAcctResponse = await creditUserAccount(
          creditEnpoint,
          zugavalizeData
        );
        console.log(
          "credit user acct response",
          creditUserAcctResponse.data?.data
        );
        zugavalizeRes = creditUserAcctResponse.data?.data;
        res.status(400).json(getMessage(zugavalizeRes, 'Transaction failed. Money reversed.', false, 400));
        } catch (error) {
          zugavalizeRes = error.message;
          res.status(400).json(getMessage(transactionResponse, 'Transaction failed. '+ error.message, false, 400));
        }
      }
      
    } catch (error) {
      console.log(error.message);
      res.status(400).json(getMessage([], error?.message, false, 400));
    }

  }

});


module.exports = router;





