const axios = require('axios');
require("dotenv/config");
const TOKEN = process.env.USER_DATA_ACCESS_TOKEN;
const ENDPOINT =  process.env.USER_DETAILS_ENDOINT;

/** this is used to recieve user data */
 const getUserDetail = async (receiverAddress) => {
   if (receiverAddress !== null && receiverAddress !== '') {
    let uri =  `${ENDPOINT}utils?action=check_if_meta_value_exists&entity_type=user&meta_key=eth_wallet_deposit_address&meta_value=${receiverAddress}`;
    console.log('uri', uri);
    return axios.get(uri, {
        headers: {
            "Authorization": `Bearer ${TOKEN}`, "Content-type": "application/json"
        }
    })
   }
   else {
    return Promise.reject(new Error('receiver address can not be null'));
   }
  }

module.exports = getUserDetail;