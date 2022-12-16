"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setWatcherForAddAddressRoute = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = require("../model/database/schemas/schema");
const message_handler_1 = require("../message/message-handler");
dotenv_1.default.config();
exports.router = express_1.default.Router();
var address = [];
var txWatcher;
var watcherTimer = 0;
var addressDetail;
/**
 * THis method set value for add address route.
 * It helps us to reset watcher after a new address is added
 * @param {Array} txAddress - Current transaction addresses
 * @param txWatcherInstance - transaction watcher instance
 * @param {number} watchTimer - time in seconds used to check transaction block
 */
const setWatcherForAddAddressRoute = (txAddress, addressData, txWatcherInstance, watchTimer) => {
    address = txAddress;
    addressDetail = addressData;
    txWatcher = txWatcherInstance;
    watcherTimer = watchTimer;
};
exports.setWatcherForAddAddressRoute = setWatcherForAddAddressRoute;
const resetWatcher = () => {
    txWatcher.addressDetail = addressDetail;
    txWatcher.account = address;
    txWatcher.watch(watcherTimer, "alchemy_pendingTransactions"); // use this for alchemy network
    // txWatcher.watch(watcherTimer); // use this for infura network
};
exports.router.post("/", (req, res) => {
    var _a;
    if (address && !(address === null || address === void 0 ? void 0 : address.includes(req.body.address))) {
        if (req.body.address && typeof req.body.address === 'string' &&
            req.body.allocation_id &&
            req.body.webhook_url && typeof req.body.webhook_url === 'string') {
            const addressData = {
                address: req.body.address,
                allocation_id: typeof req.body.allocation_id == 'string' ? parseInt(req.body.allocation_id) : req.body.allocation_id,
                webhook_url: req.body.webhook_url,
                meta: (_a = req.body) === null || _a === void 0 ? void 0 : _a.meta
            };
            // insert to database
            let response = new schema_1.TransactionDb(addressData)
                .save()
                .then((data) => {
                // update address var
                address.push(req.body.address);
                // update address details
                addressDetail[req.body.address] = {
                    allocation_id: req.body.allocation_id,
                    webhook_url: req.body.webhook_url,
                    meta: req.body.meta
                };
                // rest watcher
                resetWatcher();
                console.log("New Address added. Total address: ", address === null || address === void 0 ? void 0 : address.length, ' __Addresses List >>', address);
                // send response back
                res
                    .status(200)
                    .json((0, message_handler_1.getMessage)(data, "Address data added successfully", true));
            })
                .catch((err) => {
                res
                    .status(400)
                    .json((0, message_handler_1.getMessage)(err, "Could not add address. Parameter error! Ensure all parameters are correct.", false, 400));
            });
        }
    }
    else {
        res.status(401).json((0, message_handler_1.getMessage)([], "Address already exist. Kindly try another address", false, 401));
    }
});
