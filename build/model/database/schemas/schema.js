"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionDb = void 0;
const mongoose = require("mongoose");
/** ___________________________Transaction address to watch________________________ */
const BlockchainAddress = mongoose.Schema({
    address: { type: Array, required: true },
});
exports.TransactionDb = mongoose.model("blockchain_address", BlockchainAddress);
