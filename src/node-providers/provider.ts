import { Alchemy } from "./providers/alchemy";
import { Infura } from "./providers/infura";

export class NodeFactory {
    web3: any; clientName: any;

    /**
     * @constructor 
     * @param web3 - web3 instance
     * @param clientName - node provider name
     */
    constructor(web3: any, clientName: any){
        this.web3 = web3;
        this.clientName = clientName;
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
                    return new Infura(this.web3);
                }
                else if (this.clientName.toLowerCase() === "alchemy") {
                    return new Alchemy(this.web3);
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