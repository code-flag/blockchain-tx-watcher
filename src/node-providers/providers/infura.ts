import { IProvider } from "../types";
import dotEnv from "dotenv";
dotEnv.config();
const INFURA_API_KEY = process.env.INFURA_API_KEY;

export class Infura implements IProvider {
    providerName = 'Infura';
    web3ws: any;
    web3http: any;
    httpUrl: string = "https://goerli.infura.io/v3/7125f893eef34752b407247f92725834";
    wsUrl: string = "wss://goerli.infura.io/ws/v3/" + INFURA_API_KEY;

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