const express = require("express");
const jwt = require("jsonwebtoken");
const getMessage = require("../message/message-handler");
const getTxnDetails = require("../model/query/eth_gettransactionbyhash");

require("dotenv/config");

const router = express.Router();

require("dotenv/config");
// const SECRET_KEY = process.env.TOKEN_SALT;


router.post("/", async (req, res) => {
    console.log('request hash', req.body.transaction_hash);

    getTxnDetails(req.body.transaction_hash).then((response) => {
        res.status(200).json(getMessage(
            reponse.data,
            response.message,
            true,
            200
        ));
    }).catch((err) => {
        console.log('error reponse: ', err.message);
        res.status(400).json(getMessage(
            [],
            'blockchain testing...',
            true,
            400
        ));
    })
   
});

module.exports = router;