const axios = require('axios');

require("dotenv/config");
const TOKEN = process.env.ZUGAVALIZE_CREDIT_TOKEN;

 /**
  * This method handles deposit to user account
  * @param {object} incomingData 
  * @returns promise
  */
 const creditUserAccount = async (endpoint, incomingData) => {
    console.log('endpoint', endpoint, 'INCOMING DATA', incomingData);
    return axios.post(endpoint, incomingData, {
        headers: {
            "Authorization": `Bearer ${TOKEN}`
        }
    })
  }

  module.exports = creditUserAccount;