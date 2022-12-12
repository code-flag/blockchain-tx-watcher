/**
 * @author - Francis Olawumi Awe <awefrancolaz@gmail.com>
 * @description - transaction watcher class 
 */

import { sendReqToWebhookSite } from "../model/mutation/webhook-sample";


interface ITxWatcher {
    watch(type: string, watchTimer: number, subTopic: string): any;
}


export class TxWatcher implements ITxWatcher {
    public account: Array<string>;
    web3: any;
    web3ws: any;
    subsciption: any;

    /**
     * @comnstructor
     * @param web3 - web3 http instance
     * @param web3ws - web3 subscription instance
     * @param addresses - Array of addresses
     */
    constructor(web3: any, web3ws: any, addresses: Array<any>) {
        this.web3 = web3;
        this.web3ws = web3ws;
        this.account = addresses;
    }

    /**
     * This method watch the transaction done on any address
     * @param type - watching method pollin gor subscription
     * @param watchTimer - watch time interval 
     * @param subTopic - subscription type or topic for web socket subscription type of watching
     */
    public watch(type: string = 'polling', watchTimer: number, subTopic: string = "pendingTransactions") {
        

        if (type.toLowerCase() === 'polling') {
            setInterval(() => {
                this.checkLastBlock();
            }, watchTimer);
        }
        if (type.toLowerCase() === 'subscription') {
            if (subTopic) {
                this.subscribe(subTopic);
                this.watchTransactions(watchTimer);
            }
        }
    }

    public checkLastBlock = async () => {
        let block = await this.web3.eth.getBlock('latest');
        let blockNumber = block.number;

        console.log(`[*] Searching block ${blockNumber}...`);

        if (block && block.transactions) {
            for (let txHash of block.transactions) {
                let tx = await this.web3.eth.getTransaction(txHash);
                console.log('address found', tx.to.toLowerCase());
                
                if (tx && this.account.includes(tx.to)) {
                    console.log('address: ', tx.to.toLowerCase());                            
                    console.log(`[+] Transaction found on block ${blockNumber}`);
                    console.log({
                        address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'),
                        timestamp: new Date()
                    });
                    sendReqToWebhookSite({from: 'middey-blockchain', data: tx});
                }
            }
        }
    }

    public checkBlocks = async (start: number, end: number) => {
        for (let i = start; i < end; i++) {
            let block = await this.web3.eth.getBlock(i)
            console.log(`[*] Searching block ${i}`);
            if (block && block.transactions) {
                for (let ts of block.transactions) {
                    let tx = await this.web3.eth.getTransaction(ts);
                    console.log('address found', tx.to.toLowerCase());
                    if ( tx && this.account.includes(tx.to)) {
                        console.log('address: ', tx.to.toLowerCase());                            
                        console.log(`[+] Transaction found on block ${block.number}`);
                        console.log({ address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() });
                    }
                }
            }
        }
    }

    /**
     * This method subscribe to transaction event. It gets update anytime there is update
     * @param topic - transaction subscription type
     */
    subscribe(topic: any) {
        this.subsciption = this.web3ws.eth.subscribe(topic, (err: any, res: any) => {
            if (err) console.error(err);
        });
    }

    /**
     * This method is used to check for which address has been added to the transaction and verify 
     * if it has been approved and check if it on any of our address
     * @param checkTimeInterval - checking time interval
     */
    watchTransactions(checkTimeInterval: number = 60000) {
        console.log('watch all pending transactions...');
        this.subsciption.on('data', (txHash: any) => {
            setTimeout(async () => {
                try {
                    let tx = await this.web3ws.eth.getTransaction(txHash);
                    if (tx != null) {
                        if (this.account.includes(tx.to)) {
                            console.log({ from: tx.from, to: tx.to, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() });
                            tx.value = this.web3.utils.fromWei(tx.value, 'ether');
                            sendReqToWebhookSite({from: 'middey-blockchain', data: tx});
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            }, checkTimeInterval);
        });

    }
}
