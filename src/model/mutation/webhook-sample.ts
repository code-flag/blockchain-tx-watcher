import axios from 'axios';
import dotEnv from 'dotenv';
dotEnv.config();
const ENDPOINT = process.env.WEBHOOK_API;

/**
 *  This method handles dumping of data in webhooke website
* @param {object} incomingData 
* @returns promise
*/
export const sendReqToWebhookSite = async (incomingData: any) => {
    return axios.post(`${ENDPOINT}`, incomingData, {
        headers: {
            "Authorization": `Bearer`
        }
    })
}
