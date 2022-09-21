const axios = require('axios');
require("dotenv/config");
const ENDPOINT =  process.env.COIN_RIMP_DEPOSIT_ADDR_DETAIL;


/** this is used to recieve user data */
 const getAddressDetails = async (receiverAddress) => {
   if (receiverAddress !== null && receiverAddress !== '') {
    const endPoint = `${ENDPOINT}=${receiverAddress}&security_secret=CODE`;
    console.log('coinrimp deposit address detail endpoint', endPoint);
    return axios.get(endPoint, {
        headers: {
            "Content-type": "application/json"
        }
    })
   }
   else {
    return Promise.reject(new Error('receiver address can not be null'));
   }
  }

module.exports = getAddressDetails;