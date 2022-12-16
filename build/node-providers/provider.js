"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeFactory = void 0;
const alchemy_1 = require("./providers/alchemy");
const infura_1 = require("./providers/infura");
class NodeFactory {
    /**
     * @constructor
     * @param web3 - web3 instance
     * @param clientName - node provider name
     * @param netType - type of network
     * - mainnet
     * - testnet
     */
    constructor(web3, clientName, netType) {
        this.networkType = 'testnet';
        this.web3 = web3;
        this.clientName = clientName;
        this.networkType = netType;
    }
    createClient() {
        if (!this.web3) {
            return null;
        }
        else {
            if (!this.clientName) {
                console.log('error provider can not be null | undefined');
                return null;
            }
            else {
                if (this.clientName.toLowerCase() === "infura") {
                    return new infura_1.Infura(this.web3, this.networkType);
                }
                else if (this.clientName.toLowerCase() === "alchemy") {
                    return new alchemy_1.Alchemy(this.web3, this.networkType);
                }
                else if (this.clientName.toLowerCase() === "ankar") {
                }
                else if (this.clientName.toLowerCase() === "quicknode") {
                }
                else if (this.clientName.toLowerCase() === "moralis") {
                }
                else {
                    console.error('unrecognised node provider');
                    return null;
                }
            }
        }
    }
}
exports.NodeFactory = NodeFactory;
