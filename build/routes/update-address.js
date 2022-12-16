"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.router.put("/:address", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    schema_1.TransactionDb.findOneAndUpdate({ 'address': req.params.address }, req.body, {
        new: true,
    })
        .then((data) => {
        console.log('adddress data successfully update >> ', data);
        res.status(200)
            .json((0, message_handler_1.getMessage)(data, "Address data data successfully updated", true));
    })
        .catch((err) => {
        res
            .status(400)
            .json((0, message_handler_1.getMessage)(err, "Something went wrong", false, 400));
    });
}));
// module.exports = router;
