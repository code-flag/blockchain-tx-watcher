
const crypto = require("crypto");
const UUID = () => {
    const id = crypto.randomBytes(16).toString("hex");
    return id;
}

module.exports = UUID;