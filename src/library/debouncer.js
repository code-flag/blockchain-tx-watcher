/**
 * This library is used to prevent user trying to hack the system with mutlple calls
 * @authur Francis OLawumi Awe - <awefrancolaz@gmail.com>
 * @param {number} waitTime - the debounce period in seconds
 * @param {number | string} userId - this is the caller id
 */
 const createFilter = (waitTime = 200, userId) => {
    let timerInterval = null;
    let userIdSet = new Set();

    /**
     * 
     * @param {boolean | null} filterCondition - true will apply the debouncer effect while force won't
     * @param {Function} callback - user callback function after time has elapse
     */
     const debounceAction = (filterCondition, callback) => {

      if (timerInterval) clearTimeout(timerInterval);

      if (filterCondition === true) {
        timerInterval = setTimeout(() => {
          callback();
        }, waitTime);
      }
    }
    return debounceAction;
}

    // usage
    locationUpdatedebounceDelimiterTime = this.debounceService.createFilter(10000);

    locationUpdatedebounceDelimiterTime(true, () => {
        
      });