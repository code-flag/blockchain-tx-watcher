"use strict";
/**
 * @author - Francis OLawumi Awe <awefrancolaz@gmail.com>
 * @description - This api handles blockchain transaction watching
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const provider_1 = require("./node-providers/provider");
const express_1 = __importDefault(require("express"));
const web3_1 = __importDefault(require("web3"));
const dotenv_1 = __importDefault(require("dotenv"));
const transaction_watcher_1 = require("./controller/transaction-watcher");
const add_address_1 = require("./routes/add-address");
const get_address_1 = require("./routes/get-address");
const update_address_1 = require("./routes/update-address");
const delete_address_1 = require("./routes/delete-address");
const connection_1 = require("./model/database/connection");
const schema_1 = require("./model/database/schemas/schema");
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
const txAddress = [];
const addressDetail = {};
/** ________________________Database connection_________________________ */
(0, connection_1.DBConnection)();
/** get address from database */
schema_1.TransactionDb.find()
    .then((addressData) => {
    var _a;
    let address = new Set();
    addressData.forEach((element) => {
        if (!address.has(element.address)) {
            address.add(element.address);
            txAddress.push(element.address);
            addressDetail[element.address] = {
                allocation_id: element.allocation_id,
                webhook_url: element.webhook_url,
                meta: element.meta
            };
        }
    });
    console.log('addresses >>', txAddress);
    const watcherTimer = 15000; // time in seconds
    const nodeProvider = new provider_1.NodeFactory(web3_1.default, 'Infura');
    const providerConnection = (_a = nodeProvider.createClient()) === null || _a === void 0 ? void 0 : _a.clientConnection();
    const { web3http, web3ws } = providerConnection;
    const txWatcher = new transaction_watcher_1.TxWatcher(web3http, web3ws, txAddress, addressDetail, 'subscription');
    txWatcher.watch(watcherTimer);
    /** this method is added to help reset watcher address anytime a new address is added */
    (0, add_address_1.setWatcherForAddAddressRoute)(txAddress, addressDetail, txWatcher, watcherTimer);
});
// Body Parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
/** _______________________________API ROUTES_________________________________ */
app.use("/api/watchman/address", add_address_1.router);
app.use("/api/watchman", get_address_1.router);
app.use("/api/watchman", get_address_1.router);
app.use("/api/watchman", update_address_1.router);
app.use("/api/watchman", delete_address_1.router);
app.listen(PORT || 5400, () => {
    console.log("server started on port", PORT);
});
