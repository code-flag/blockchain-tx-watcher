import { IProvider } from "../types";
import dotEnv from "dotenv";
dotEnv.config();
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const INFURA_TESTNET_API_KEY = process.env.INFURA_TESTNET_API_KEY;

export class Infura implements IProvider {
    providerName = 'Infura';
    web3ws: any;
    web3http: any;
    httpUrl: string = "https://goerli.infura.io/v3/" + INFURA_TESTNET_API_KEY;
    wsUrl: string = "wss://goerli.infura.io/ws/v3/" + INFURA_TESTNET_API_KEY;
    mainHttpUrl: string = "https://mainnet.infura.io/v3/" + INFURA_API_KEY;
    mainWsUrl: string = "wss://mainnet.infura.io/ws/v3/" + INFURA_API_KEY;

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