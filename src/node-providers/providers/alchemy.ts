import { IProvider } from "../types";
import dotEnv from "dotenv";
dotEnv.config();
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ALCHEMY_TESTNET_API_KEY = process.env.ALCHEMY_TESTNET_API_KEY;

export class Alchemy implements IProvider {
    providerName = 'ALCHEMY';
    web3ws: any;
    web3http: any;
    httpUrl: string = "https://eth-goerli.g.alchemy.com/v2/" + ALCHEMY_TESTNET_API_KEY;
    wsUrl: string = "wss://eth-goerli.g.alchemy.com/v2/" + ALCHEMY_API_KEY;
    mainHttpUrl: string = "http://eth-mainnet.g.alchemy.com/v2/" + ALCHEMY_API_KEY;
    mainWsUrl: string = "wss://eth-mainnet.g.alchemy.com/v2/" + ALCHEMY_API_KEY;

    /**
     * Configure node network connection
     * @param web3 - web3 instance
     * @param netType - type of network 
     * - mainnet
     * - testnet
     */
    constructor(web3: any, netType: string) {
        if (netType === 'mainnet') {
            this.web3http = new web3(new web3.providers.HttpProvider(this.mainHttpUrl));
            this.web3ws = new web3(new web3.providers.WebsocketProvider(this.mainWsUrl));
        }
        if (netType === 'testnet') {
            this.web3http = new web3(new web3.providers.HttpProvider(this.httpUrl));
            this.web3ws = new web3(new web3.providers.WebsocketProvider(this.wsUrl));
        }
        
    }


    /**
     * Return node provider connection instance to http polling and web socket subscription
     * @returns - object of connection types - web3http and web3ws
     */
    clientConnection() {
        return {
            web3http: this.web3http,
            web3ws: this.web3ws
        }
    }
}

// # Get the latest block
// $ curl https://eth-mainnet.g.alchemy.com/v2/XWJmf8dxIfaF71VS0e5Uz5hiP_k_qNNw -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":0}'

// # Get all outbound transfers for a provided address
// $ curl https://eth-mainnet.g.alchemy.com/v2/XWJmf8dxIfaF71VS0e5Uz5hiP_k_qNNw -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"alchemy_getTokenBalances","params": ["0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be", ["0x607f4c5bb672230e8672085532f7e901544a7375", "0x618e75ac90b12c6049ba3b27f5d5f8651b0037f6", "0x63b992e6246d88f07fc35a056d2c365e6d441a3d", "0x6467882316dc6e206feef05fba6deaa69277f155", "0x647f274b3a7248d6cf51b35f08e7e7fd6edfb271"]],"id":"42"}'

// # Get all the NFTs owned by an address
// $ curl 'https://eth-mainnet.g.alchemy.com/v2/XWJmf8dxIfaF71VS0e5Uz5hiP_k_qNNw/getNFTs/?owner=vitalik.eth'

