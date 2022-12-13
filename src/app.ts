/**
 * @author - Francis OLawumi Awe <awefrancolaz@gmail.com>
 * @description - This api handles blockchain transaction watching
 */

import { NodeFactory } from "./node-providers/provider";
import express from "express";
import web3 from "web3";
import dotEnv from "dotenv";
import { TxWatcher } from "./controller/transaction-watcher";
import { router as addAddress} from "./routes/add-address";
dotEnv.config();

 const PORT = process.env.PORT;
 const app = express();

 const txAddress: Array<string> = ['0x768019974C79D480d213334eB9cd14e2Bf42D29d', '0x38a8640A3Cc146d227910e8c3D3e5552f560a7E3'];

 const nodeProvider = new NodeFactory(web3, 'Infura');
 const providerConnection: any = nodeProvider.createClient()?.clientConnection();
 const {web3http, web3ws} = providerConnection;
 const txWatcher = new TxWatcher(web3http, web3ws, txAddress);
//  txWatcher.watch('polling', 7000);
 txWatcher.watch('subscription', 15000);
 
 // Body Parser middleware
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 
 /** _______________________________API ROUTES_________________________________ */
 app.use("/api/tx/address", addAddress);

 
 app.listen(PORT || 5400, () => {
   console.log("server started on port", PORT);
 });
 