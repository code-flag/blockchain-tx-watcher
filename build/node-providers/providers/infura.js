"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Infura = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const INFURA_API_KEY = process.env.INFURA_API_KEY;
class Infura {
    constructor(web3) {
        this.providerName = 'Infura';
        this.httpUrl = "https://goerli.infura.io/v3/" + INFURA_API_KEY;
        this.wsUrl = "wss://goerli.infura.io/ws/v3/" + INFURA_API_KEY;
        this.web3http = new web3(new web3.providers.HttpProvider(this.httpUrl));
        this.web3ws = new web3(new web3.providers.WebsocketProvider(this.wsUrl));
    }
    /**
     * Return node provider connection instance to http polling and web socket subscription
     * @returns - object of connection types - web3http and web3ws
     */
    clientConnection() {
        return {
            web3http: this.web3http,
            web3ws: this.web3ws
        };
    }
}
exports.Infura = Infura;
