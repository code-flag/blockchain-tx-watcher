"use strict";
/**
 * @author - Francis OLawumi Awe <awefrancolaz@gmail.com>
 * @description - This api handles blockchain transaction watching
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const provider_1 = require("./node-providers/provider");
const express_1 = __importDefault(require("express"));
const web3_1 = __importDefault(require("web3"));
const dotenv_1 = __importDefault(require("dotenv"));
const transaction_watcher_1 = require("./controller/transaction-watcher");
const add_address_1 = require("./routes/add-address");
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
const txAddress = ['0x768019974C79D480d213334eB9cd14e2Bf42D29d', '0x38a8640A3Cc146d227910e8c3D3e5552f560a7E3'];
const nodeProvider = new provider_1.NodeFactory(web3_1.default, 'Infura');
const providerConnection = (_a = nodeProvider.createClient()) === null || _a === void 0 ? void 0 : _a.clientConnection();
const { web3http, web3ws } = providerConnection;
const txWatcher = new transaction_watcher_1.TxWatcher(web3http, web3ws, txAddress);
//  txWatcher.watch('polling', 7000);
txWatcher.watch('subscription', 18000);
// Body Parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
/** _______________________________API ROUTES_________________________________ */
app.use("/api/tx/address", add_address_1.router);
app.listen(PORT || 5400, () => {
    console.log("server started on port", PORT);
});
