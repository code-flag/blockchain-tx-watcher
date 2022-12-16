"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionDb = void 0;
const mongoose = require("mongoose");
/** ___________________________Transaction address to watch________________________ */
const AddressData = mongoose.Schema({
    address: { type: String, required: true },
    allocation_id: { type: Number, required: true },
    webhook_url: { type: String, required: true },
    meta: { type: Object },
});
exports.TransactionDb = mongoose.model("address_data", AddressData);
