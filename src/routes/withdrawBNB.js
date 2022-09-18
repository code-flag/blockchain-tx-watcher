const express = require("express");
const router = express.Router();
const getMessage = require("../message/message-handler");
const submitTXN = require("../model/transactions/processTransaction");

require("dotenv/config");

const PRIVATE_KEY = process.env.PRIVATE_KEY;

router.post("/", async (req, res) => {

  if (req.body?.address_to == undefined || 
    req.body?.address_to == null ||
    req.body?.address_to == '' ||
    typeof req.body?.address_to == "number" ||
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
      const transactionResponse = await submitTXN(req.body?.address_to, req.body?.amount, PRIVATE_KEY);
      console.log('transaction response', transactionResponse);
      res.status(200).json(getMessage([transactionResponse], 'Transaction completed', true, 200));
    } catch (error) {
      console.log(error.message);
      res.status(400).json(getMessage([], error?.message, false, 400));
    }

  }

});


module.exports = router;

transaction_reciept = {
  "blockHash": "0x44020397bb2af225e390e6f6c20404911dc762e94dd6c86b6e37573c27add3af",
  "blockNumber": 22952573,
  "contractAddress": null,
  "cumulativeGasUsed": 227433,
  "effectiveGasPrice": 10000000000,
  "from": "0x4484fc5bc738a5428a90e0c828cbd23f57fa2975",
  "gasUsed": 21000,
  "logs": [],
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "status": true,
  "to": "0x5482bd172bbf0cb54bb3e4e5ba1467508ac8b4d8",
  "transactionHash": "0xc39b75972438e77ccedfabdb3dae50a99d1b577954c3a5fbf5d8a399ee4019ba",
  "transactionIndex": 2,
  "type": "0x0"
}






