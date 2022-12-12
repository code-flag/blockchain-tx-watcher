"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALCHEMY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
class ALCHEMY {
    constructor(web3) {
        this.providerName = 'ALCHEMY';
        this.httpUrl = "http://eth-mainnet.g.alchemy.com/v2/" + ALCHEMY_API_KEY;
        this.wsUrl = "wss://eth-mainnet.g.alchemy.com/v2/" + ALCHEMY_API_KEY;
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
            web3: this.web3ws
        };
    }
}
exports.ALCHEMY = ALCHEMY;
// # Get the latest block
// $ curl https://eth-mainnet.g.alchemy.com/v2/XWJmf8dxIfaF71VS0e5Uz5hiP_k_qNNw -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":0}'
// # Get all outbound transfers for a provided address
// $ curl https://eth-mainnet.g.alchemy.com/v2/XWJmf8dxIfaF71VS0e5Uz5hiP_k_qNNw -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"alchemy_getTokenBalances","params": ["0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be", ["0x607f4c5bb672230e8672085532f7e901544a7375", "0x618e75ac90b12c6049ba3b27f5d5f8651b0037f6", "0x63b992e6246d88f07fc35a056d2c365e6d441a3d", "0x6467882316dc6e206feef05fba6deaa69277f155", "0x647f274b3a7248d6cf51b35f08e7e7fd6edfb271"]],"id":"42"}'
// # Get all the NFTs owned by an address
// $ curl 'https://eth-mainnet.g.alchemy.com/v2/XWJmf8dxIfaF71VS0e5Uz5hiP_k_qNNw/getNFTs/?owner=vitalik.eth'
