/**
 * @author - Francis Olawumi Awe - <awefrancolaz@gmail.com>
 */

/**
 * This function helps in converting camel case to kebabcase
 * @param {string} str - the string value in camel case to be converted to kebab case
 * @returns {string} - the formatted kebabcase value
 */

const camelCaseTokebabCase = (str) => {
  return str
    .split("")
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? "-" : ""}${letter?.toLowerCase()}`
        : letter;
    })
    .join("");
};

/**
 * This function helps in converting camel case to underscore
 * @param {string} str - the string value in camel case to be converted to underscore
 * @returns {string} - the formatted underscore value
 */
const camelCaseToUnderscore = (str) => {
  return str
    .split("")
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? "_" : ""}${letter?.toLowerCase()}`
        : letter;
    })
    .join("");
};

const isObjectKey = (obj, key) => {
  if (typeof obj == "object") {
    // check for payee key
    if (Object.keys(obj).includes(key)) {
      return true;
    } else {
      return false;
    }
  } else {
    console.log(
      "Argument is not a valid object or object of objects",
      obj,
      "search key",
      key
    );
    return false;
  }
};

const extractAccountNumber = (payload) => {
  /** check if payload data is an object and not null data */
  const key = Object.keys(payload.data.data);
  var accountNo;
  var bankName;
  key.forEach((element) => {
    if (element === "account_number") {
      accountNo = payload.data.data[element];
    } else if (element === "bank_name") {
      bankName = payload.data.data[element];
    }
  });
  const data = { account_number: accountNo, bank_name: bankName };
  console.log(data);
  return data;
};

const extractAccountNumber2 = (payload) => {
  /** check if payload data is an object and not null data */

  const data = {
    account_number: payload.data.account_number,
    bank_name: payload.data.bank.name,
    account_name: payload.data.account_name,
  };
  console.log(data);
  return data;
};

const extractAccountNumber3 = (payload) => {
  /** check if payload data is an object and not null data */

  const data = {
    account_number: payload.data.account_number,
    bank_name: payload.data.bank.name,
    account_name: payload.data.account_name,
    first_name: payload.data.customer.first_name,
    last_name: payload.data.customer.last_name,
  };
  console.log(data);
  return data;
};

module.exports = {
  camelCaseTokebabCase,
  camelCaseToUnderscore,
  isObjectKey,
  extractAccountNumber,
  extractAccountNumber2,
  extractAccountNumber3
};
