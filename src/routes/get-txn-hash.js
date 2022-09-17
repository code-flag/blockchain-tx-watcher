const express = require("express");
const jwt = require("jsonwebtoken");
const getMessage = require("../message/message-handler");
const getTxnDetails = require("../model/query/eth_gettransactionbyhash");
const web3 = require("web3");

require("dotenv/config");

const router = express.Router();

require("dotenv/config");
// const SECRET_KEY = process.env.TOKEN_SALT;

const convertTOWei = (result) => {
  console.log("recieve result", result);
  if (result !== null) {
    const objKeys = Object.keys(result);
    let element;
    let valueInWei;
    let blockNUmebrInString;
    let receiverAdd;
    let senderAdd;
    let hash;

    for (let index = 0; index < objKeys.length; index++) {
      // convert value hex-wei value to normal wei value
      if (objKeys[index] == "value") {
        const hexToNumberString = web3.utils.hexToNumberString(
          result[objKeys[index]]
        );
        valueInWei = web3.utils.fromWei(hexToNumberString, "ether");
      }
      // convert blocknumber hex value to number in string
      if (objKeys[index] == "blockNumber") {
        blockNUmebrInString = web3.utils.hexToNumberString(
          result[objKeys[index]]
        );
      }
      if (objKeys[index] == "from") {
        senderAdd = result[objKeys[index]];
      }
      if (objKeys[index] == "to") {
        receiverAdd = result[objKeys[index]];
      }
      if (objKeys[index] == "hash") {
        hash = result[objKeys[index]];
      }
    }

    //format output data
    element = {
      value: valueInWei,
      block_number: blockNUmebrInString,
      sender_address: senderAdd,
      receiver_address: receiverAdd,
      request_id: hash,
    };

    return element;
  } else {
    return 0;
  }
};

router.post("/", async (req, res) => {
  console.log("request hash", req.body.transaction_hash);

  getTxnDetails(req.body.transaction_hash)
    .then((response) => {
      console.log("main ", response.data);
      let responseData = JSON.parse(JSON.stringify(response.data));
      //  extract need data in their proper format
      responseData = convertTOWei(responseData.result);
      res
        .status(200)
        .json(getMessage(responseData, "transaction recieved", true, 200));
    })
    .catch((err) => {
      console.log("error reponse: ", err);
      res.status(400).json(getMessage([], "blockchain testing...", false, 400));
    });
});

module.exports = router;
