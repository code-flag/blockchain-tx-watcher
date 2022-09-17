const axios = require('axios');

require("dotenv/config");
const ENDPOINT = process.env.DEPOSIT_ENPOINT; 
const TOKEN = process.env.ZUGAVALIZE_CREDIT_TOKEN;

 /**
  * This method handles deposit to user account
  * @param {object} incomingData 
  * @returns promise
  */
 const creditUserAccount = async (incomingData) => {
    console.log('endpoint', ENDPOINT, 'INCOMING DATA', incomingData);
    return axios.post(`${ENDPOINT}`, incomingData, {
        headers: {
            "Authorization": `Bearer ${TOKEN}`
        }
    })
  }

  module.exports = creditUserAccount;