const axios = require('axios');
require("dotenv/config");
const ENDPOINT = process.env.WEB3API_ENDPOINT + process.env.WEB3API_KEY;

/** this is used to recieve user data */
 const getTxnDetails = async (txnHash) => {
    const data = {"jsonrpc":"2.0", method: 'eth_getTransactionByHash', params: [txnHash], id: 1};
    console.log(data, 'data');
    return axios.post (`${ENDPOINT}`, data)
  }

module.exports = getTxnDetails;