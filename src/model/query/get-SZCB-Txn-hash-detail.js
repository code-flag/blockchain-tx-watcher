const axios = require('axios');
require("dotenv/config");
/** 
 * This method is used to get the transaction details with amount inclusive using the address and blocknumber
 * @param {string} address - request body address
 * @param {number} blockNumber - blocknumber after convertion from hex
 * @returns object
 */
 const getSZCB = async (address, blockNumber) => {
   if (blockNumber !== null && blockNumber !== '') {
    const uri = `https://api.bscscan.com/api?module=account&action=tokentx&address=${address}&startblock=${blockNumber}&endblock=${blockNumber}&sort=asc`
    console.log('uri', uri);
    return axios.get(uri, {
    })
   }
   else {
    return Promise.reject(new Error('receiver address can not be null'));
   }
  }

module.exports = getSZCB;