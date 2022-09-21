const axios = require('axios');

require("dotenv/config");
const ENDPOINT = process.env.COIN_RIMP_DEPOSIT_ENPOINT; 
const TOKEN = process.env.COIN_RIMP_CREDIT_TOKEN;

 /**
  * This method handles deposit to user account
  * @param {object} incomingData 
  * @returns promise
  */
 const creditCoinRimpUserAccount = async (incomingData) => {
    console.log('endpoint', ENDPOINT, 'INCOMING DATA', incomingData);
    return axios.post(`${ENDPOINT}`, incomingData, {
        headers: {
            "Authorization": `Bearer ${TOKEN}`
        }
    })
  }

  module.exports = creditCoinRimpUserAccount;