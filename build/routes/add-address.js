"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = require("../model/database/schemas/schema");
const message_handler_1 = require("../message/message-handler");
dotenv_1.default.config();
exports.router = express_1.default.Router();
exports.router.post("/", (req, res) => {
    if (req.body.address && typeof req.body.address === 'string') {
        const address = [];
        address.push(req.body.address);
        // insert to database
        let emp = new schema_1.TransactionDb(address)
            .save()
            .then((data) => {
            res
                .status(200)
                .json((0, message_handler_1.getMessage)(data, "Transaction address added successfully", true));
        })
            .catch((err) => {
            res
                .status(400)
                .json((0, message_handler_1.getMessage)(err, "Something went wrong. Could not add address", false, 400));
        });
    }
});
