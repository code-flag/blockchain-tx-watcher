
/**
 * This method is use to format and structure response data
 * @author - Francis Olawumi Awe - <awefrancolaz@gmail.com>
 * @param {Object} data - data to return back to the consumer if any
 * @param {string} message - descriptive message for the consumer
 * @param {boolean} mtype -message type <true or false> - true for success and false for error or failure
 * @returns Object
 */
export const getMessage = (retData: any, message: string, mtype: boolean, status_code: number = 200) => {
    let msg;
    if (mtype === true) {
         msg = {
            status: true,
            status_code: status_code,
            data: retData ,
            message: message
        }

        return msg;
    }
    else if(mtype === false) {
        msg = {
            status: false,
            status_code: 400,
            message: message,
            data: retData
        }

        return msg;
    }
}
