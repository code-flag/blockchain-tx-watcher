const mongoose = require("mongoose");

/** ___________________________Transaction address to watch________________________ */

const BlockchainAddress = mongoose.Schema({
  address:{type: Array, required: true},
});


export const TransactionDb = mongoose.model("blockchain_address", BlockchainAddress);

