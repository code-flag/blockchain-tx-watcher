const axios = require('axios');
require("dotenv/config");
const ENDPOINT = process.env.WEB3API_ENDPOINT + process.env.WEB3API_KEY;

/** this is used to recieve user data */
 const getTxnDetails = async (txnHash) => {
    return axios.post(`${ENDPOINT}`, {method: 'eth_getTransactionByHash', params: [`${txnHash}`], id: 1}, {
        headers: {
            "Content-type": "application/json"
        }
    })
  }

module.exports = getTxnDetails;