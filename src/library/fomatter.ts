/**
 * @author - Francis Olawumi Awe - <awefrancolaz@gmail.com>
 */

/**
 * This function helps in converting camel case to kebabcase
 * @param {string} str - the string value in camel case to be converted to kebab case
 * @returns {string} - the formatted kebabcase value
 */

const camelCaseTokebabCase = (str: string) => {
  return str
    .split("")
    .map((letter: any, idx: any) => {
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
const camelCaseToUnderscore = (str: string) => {
  return str
    .split("")
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? "_" : ""}${letter?.toLowerCase()}`
        : letter;
    })
    .join("");
};

const isObjectKey = (obj: any, key: any) => {
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
module.exports = {
  camelCaseTokebabCase,
  camelCaseToUnderscore,
  isObjectKey,
};
