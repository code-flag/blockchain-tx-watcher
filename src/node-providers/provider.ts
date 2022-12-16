import { Alchemy } from "./providers/alchemy";
import { Infura } from "./providers/infura";

export class NodeFactory {
    web3: any; clientName: any;
    networkType: string = 'testnet';

    /**
     * @constructor 
     * @param web3 - web3 instance
     * @param clientName - node provider name
     * @param netType - type of network 
     * - mainnet
     * - testnet
     */
    constructor(web3: any, clientName: any, netType: string){
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
                    return new Infura(this.web3, this.networkType );
                }
                else if (this.clientName.toLowerCase() === "alchemy") {
                    return new Alchemy(this.web3, this.networkType );
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