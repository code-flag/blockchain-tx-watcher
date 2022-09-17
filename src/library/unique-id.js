
const crypto = require("crypto");
const uniqueId = () => {
    const id = crypto.randomBytes(16).toString("hex");
    return id;
}

module.exports = uniqueId;