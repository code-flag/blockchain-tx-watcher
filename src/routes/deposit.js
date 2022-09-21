const express = require("express");
const jwt = require("jsonwebtoken");
const getMessage = require("../message/message-handler");
const getTxnDetails = require("../model/query/eth_gettransactionbyhash");
const web3 = require("web3");
const getUserDetail = require("../model/query/get-user-detail");
const creditUserAccount = require("../model/mutation/deposit-to-user-account");
const getAddressDetails = require("../model/query/getAddressDetails");
const creditCoinRimpUserAccount = require("../model/mutation/coinrimp-user-deposit");
const getSZCB = require("../model/query/get-SZCB-Txn-hash-detail");

require("dotenv/config");

const router = express.Router();

/**
 * This method determine what type of coin is sent
 * @param {string} contract - contract is the 'to' field return from transaction hash
 * - The contract is constant for USDT and SZCB only while varies for BNB
 * @returns string
 */
const getCoinType = (contract) => {
  if (contract == `${process.env.USDT}`) {
    return "USDT";
  } else if (contract == `${process.env.SZCB}`) {
    return "SZCB";
  } else {
    return "BNB";
  }
};

/**
 * This method extract transaction hash details into needed object
 * @param {object} result -
 * @returns object
 */
const convertTOWei = (result) => {
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

/**
 *
 * @param {string} receiverAdd - reciever address to check if user exist
 * @param {string} coinType - type of coin to deposit
 * @param {any} value - amount to deposit value
 * @param {string} requestId - request id
 */
const getAndCreditUser = (res, receiverAdd, coinType, value, requestId, coinrimpUserId, creditEnpoint) => {
  // get user details with receiver address
  getUserDetail(receiverAdd)
    .then(async (response) => {
      // create param object to be sent to the credit endpoint;
      const zugavalizeData = {
        wallet_id: coinType,
        amount: value,
        request_id: requestId,
        user_id: response.data.data.eth_wallet_deposit_address.user_id,
        note: "",
      };

      const coinrimpData = {
        wallet_id: coinType,
        amount: value,
        request_id: requestId,
        user_id: coinrimpUserId,
        note: "",
      };
      let coinrimpRes;
      let zugavalizeRes;
      try {
        //deposit transaction to coin rimp account
      const creditCoinrimpResponse = await creditCoinRimpUserAccount(
        coinrimpData
      );
      console.log(
        "credit coinrimp response",
        creditCoinrimpResponse.data?.data
      );
      coinrimpRes = creditCoinrimpResponse.data?.data;
      } catch (error) {
        coinrimpRes = error.message;
      }
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
      } catch (error) {
        zugavalizeRes = error.message;
      }

      res
        .status(200)
        .json(
          getMessage(
            {
              cr_data: coinrimpRes,
              us_data: zugavalizeRes
            },
            "transaction completed successfully",
            true,
            200
          )
        );
    })
    .catch((err) => {
      res
        .status(400)
        .json(
          getMessage(
            err.response?.data,
            err.message,
            true,
            400
          )
        );
    });
};

router.post("/", async (req, res) => {
  console.log("request hash", req.body.transaction_hash);
  // cehck if all the required parameters passed
  if (
    req.body?.transaction_hash === "" ||
    req.body?.transaction_hash === undefined ||
    req.body?.transaction_hash === null ||
    req.body?.to_address === "" ||
    req.body?.to_address === undefined ||
    req.body?.to_address === null
  ) {
    console.log("Incomplete or invalide argument provided");
    res
      .status(400)
      .json(
        getMessage([], "Incomplete or invalide argument provided", false, 400)
      );
  } else {
    try {
      // retrieve user details from the address
      const addressDetail = await getAddressDetails(req.body.to_address);
      console.log("addressDetail response", addressDetail.data.data);

      // check if user has data with us if not return error user does not exist
      if (addressDetail.data.data.extra_data === false) {
        res
          .status(400)
          .json(getMessage([], "invalid user address", false, 400));
      } else {
        // save webhook endpoint for crediting user account later
        const creditEnpoint =
          addressDetail.data.data?.extra_data?.webhook_url_deposit;
        // save coinrimp user id for coinrimp deposit later
        const coinrimpUserId = addressDetail.data.data?.user_allocated_to;
        //GET transaction hash details
        getTxnDetails(req.body.transaction_hash)
          .then( async (response) => {
            console.log("web3api response", response.data.result.to);

            const contractAddress = response.data.result.to;
            const coinType = getCoinType(contractAddress);
            console.log('coin type', coinType);

            if (coinType == "USDT") {
              console.log('response.data', response.data);
              // let responseData = JSON.parse(JSON.stringify(response.data));
              //  extract needed data in their proper format
              //  extract needed data in their proper format
              let responseData = response.data;
              responseData = convertTOWei(responseData.result);

              // check the return data if not zero
              if (responseData == 0) {
                res.status(200).json(
                    getMessage( [], "Can not find a transaction detail", true, 200)
                  );
              } else {
                const response = await getSZCB(req.body.to_address, responseData.block_number);
                // console.log('address', response.data.result[0]);
                let tokenDecimal = parseInt(response.data.result[0].tokenDecimal);
                let dec_point = Math.pow(10, tokenDecimal);
                let value_of_token_in_wei = parseFloat(response.data.result[0].value) / dec_point ;
                console.log('amount', value_of_token_in_wei);

                // get user details with receiver address
                getAndCreditUser(
                  res,
                  req.body.to_address,
                  coinType,
                  value_of_token_in_wei,
                  responseData.request_id,
                  coinrimpUserId,
                  creditEnpoint
                );
              }
            } 
            // SZCB coin
            else if (coinType == "SZCB") {
            
              //  extract needed data in their proper format
              let responseData = response.data;
              responseData = convertTOWei(responseData.result);

              // check the return data if not zero
              if (responseData == 0) {
                res.status(200).json(
                    getMessage( [], "Can not find a transaction detail", true, 200)
                  );
              } else {
                const response = await getSZCB(req.body.to_address, responseData.block_number);
                // console.log('address', response.data.result[0]);
                let tokenDecimal = parseInt(response.data.result[0].tokenDecimal);
                let dec_point = Math.pow(10, tokenDecimal);
                let value_of_token_in_wei = parseFloat(response.data.result[0].value) / dec_point ;
                console.log('amount', value_of_token_in_wei);

                // get user details with receiver address
                getAndCreditUser(
                  res,
                  req.body.to_address,
                  coinType,
                  value_of_token_in_wei,
                  responseData.request_id,
                  coinrimpUserId,
                  creditEnpoint
                );
              }
            } else {
              // let responseData = JSON.parse(JSON.stringify(response.data));
              //  extract needed data in their proper format
              let responseData = response.data;
              responseData = convertTOWei(responseData.result);

              // check the return data if not zero
              if (responseData == 0) {
                res
                  .status(200)
                  .json(
                    getMessage(
                      [],
                      "Can not find a transaction detail",
                      true,
                      200
                    )
                  );
              } else {
                // get user details with receiver address
                getAndCreditUser(
                  res,
                  req.body.to_address,
                  coinType,
                  responseData.value,
                  responseData.request_id,
                  coinrimpUserId,
                  creditEnpoint
                );
              }
            }
          })
          .catch((err) => {
            console.log("error reponse: ", err.response?.data);
            res
              .status(400)
              .json(
                getMessage(
                  err.response?.data,
                  err.message,
                  false,
                  400
                )
              );
          });
      }
    } catch (error) {
      console.log("error response => ", error.getMessage);
      res
        .status(400)
        .json(getMessage(error?.response?.data, error.message, false, 400));
    }
  }
});

module.exports = router;
