"use strict";
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
            ? `${idx !== 0 ? "-" : ""}${letter === null || letter === void 0 ? void 0 : letter.toLowerCase()}`
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
            ? `${idx !== 0 ? "_" : ""}${letter === null || letter === void 0 ? void 0 : letter.toLowerCase()}`
            : letter;
    })
        .join("");
};
const isObjectKey = (obj, key) => {
    if (typeof obj == "object") {
        // check for payee key
        if (Object.keys(obj).includes(key)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        console.log("Argument is not a valid object or object of objects", obj, "search key", key);
        return false;
    }
};
module.exports = {
    camelCaseTokebabCase,
    camelCaseToUnderscore,
    isObjectKey,
};
