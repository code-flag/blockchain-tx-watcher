import { IProvider } from "../types";
import dotEnv from "dotenv";
dotEnv.config();
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const BSC_APP_KEY = process.env.BSC_APP_KEY;

export class Infura implements IProvider {
    providerName = 'BSC';
    web3ws: any;
    web3http: any;
    httpUrl: string = "https://bsc-testnet.web3api.com/v1/" + BSC_APP_KEY;
    wsUrl: string = "wss://bsc-testnet.web3api.com/v1/" + BSC_APP_KEY;

    constructor(web3: any) {
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
        }
    }
}