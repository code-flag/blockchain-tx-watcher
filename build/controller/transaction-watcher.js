"use strict";
/**
 * @author - Francis Olawumi Awe <awefrancolaz@gmail.com>
 * @description - transaction watcher class
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxWatcher = void 0;
const webhook_sample_1 = require("../model/mutation/webhook-sample");
class TxWatcher {
    /**
     * @comnstructor
     * @param web3 - web3 http instance
     * @param web3ws - web3 subscription instance
     * @param addresses - Array of addresses
     * @param watchType - watch method to use
 *  - subscription - for subscription method
 *  - polling - for polling method
     */
    constructor(web3, web3ws, addresses, addressData, watchType) {
        this.checkLastBlock = () => __awaiter(this, void 0, void 0, function* () {
            let block = yield this.web3.eth.getBlock('latest');
            let blockNumber = block.number;
            console.log(`[*] Searching block ${blockNumber}...`);
            if (block && block.transactions) {
                for (let txHash of block.transactions) {
                    let tx = yield this.web3.eth.getTransaction(txHash);
                    console.log('address found', tx.to.toLowerCase());
                    if (tx && this.account.includes(tx.to)) {
                        console.log('address: ', tx.to.toLowerCase());
                        console.log(`[+] Transaction found on block ${blockNumber}`);
                        console.log({
                            address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'),
                            timestamp: new Date()
                        });
                        (0, webhook_sample_1.sendReqToWebhookSite)({
                            from: 'middey-blockchain',
                            addressDetail: this.addressDetail[tx.to],
                            data: tx
                        });
                    }
                }
            }
        });
        this.web3 = web3;
        this.web3ws = web3ws;
        this.account = addresses;
        this.watchType = watchType;
        this.addressDetail = addressData;
    }
    /**
     * This method watch the transaction done on any address
     * @param watchTimer - watching time interval
     * @param subTopic - subscription type or topic for web socket subscription type of watching
     */
    watch(watchTimer, subTopic = "pendingTransactions") {
        try {
            if (this.watchType.toLowerCase() === 'polling') {
                if (this.watcherId)
                    clearInterval(this.watcherId);
                this.watcherId = setInterval(() => {
                    this.checkLastBlock();
                }, watchTimer);
            }
            if (this.watchType.toLowerCase() === 'subscription') {
                if (subTopic) {
                    this.subscribe(subTopic);
                    this.watchTransactions(watchTimer);
                }
            }
        }
        catch (error) {
            console.log("watcher error", error);
        }
    }
    // public checkBlocks = async (start: number, end: number) => {
    //     for (let i = start; i < end; i++) {
    //         let block = await this.web3.eth.getBlock(i)
    //         console.log(`[*] Searching block ${i}`);
    //         if (block && block.transactions) {
    //             for (let ts of block.transactions) {
    //                 let tx = await this.web3.eth.getTransaction(ts);
    //                 console.log('address found', tx.to.toLowerCase());
    //                 if (tx && this.account.includes(tx.to)) {
    //                     console.log('address: ', tx.to.toLowerCase());
    //                     console.log(`[+] Transaction found on block ${block.number}`);
    //                     console.log({ address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() });
    //                 }
    //             }
    //         }
    //     }
    // }
    /**
     * This method subscribe to transaction event. It gets update anytime there is update
     * @param topic - transaction subscription type
     */
    subscribe(topic) {
        this.subsciption = this.web3ws.eth.subscribe(topic, (err, res) => {
            if (err)
                console.error(err);
        });
    }
    /**
     * This method is used to check for which address has been added to the transaction and verify
     * if it has been approved and check if it on any of our address
     * @param checkTimeInterval - checking time interval
     */
    watchTransactions(checkTimeInterval = 60000) {
        console.log('watch all pending transactions...');
        this.subsciption.on('data', (txHash) => {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    let tx = yield this.web3ws.eth.getTransaction(txHash);
                    if (tx != null) {
                        if (this.account.includes(tx.to)) {
                            console.log({ from: tx.from, to: tx.to, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() });
                            tx.value = this.web3.utils.fromWei(tx.value, 'ether');
                            (0, webhook_sample_1.sendReqToWebhookSite)({
                                from: 'middey-blockchain',
                                addressDetail: this.addressDetail[tx.to],
                                data: tx
                            });
                        }
                    }
                }
                catch (error) {
                    console.error("subscription error", error === null || error === void 0 ? void 0 : error.message);
                }
            }), checkTimeInterval);
        });
    }
}
exports.TxWatcher = TxWatcher;
