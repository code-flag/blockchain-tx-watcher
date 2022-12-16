/**
 * @author - Francis OLawumi Awe <awefrancolaz@gmail.com>
 * @description - This api handles blockchain transaction watching
 */

import { NodeFactory } from "./node-providers/provider";
import express from "express";
import web3 from "web3";
import dotEnv from "dotenv";
import { TxWatcher } from "./controller/transaction-watcher";
import { setWatcherForAddAddressRoute, router as addAddress} from "./routes/add-address";
import {router as getAddress} from "./routes/get-address";
import { router as updateAddress} from "./routes/update-address";
import { router as deleteAddress} from "./routes/delete-address";
import { DBConnection } from "./model/database/connection";
import { TransactionDb } from "./model/database/schemas/schema";
dotEnv.config();

 const PORT = process.env.PORT;
 const app = express();
 const txAddress: Array<string> = [];
 const addressDetail: any = {};
 /** ________________________Database connection_________________________ */
  DBConnection();

  /** get address from database */
  TransactionDb.find()
        .then((addressData: any) => {
          let address = new Set();
          addressData.forEach((element: any) => {
            if (!address.has(element.address)) {

              address.add(element.address);
              txAddress.push(element.address);

              addressDetail[element.address] = {
                allocation_id: element.allocation_id,
                webhook_url: element.webhook_url, 
                meta: element.meta 
              };
            }
          });
          
          console.log("Total address: ", txAddress?.length, ' __Addresses List >>', txAddress);
          
          const watcherTimer = 15000; // time in seconds
          const nodeProvider = new NodeFactory(web3, 'Infura', 'testnet');
          const providerConnection: any = nodeProvider.createClient()?.clientConnection();
          const {web3http, web3ws} = providerConnection;
          const txWatcher = new TxWatcher(web3http, web3ws, txAddress, addressDetail, 'subscription');
          txWatcher.watch(watcherTimer);
          /** this method is added to help reset watcher address anytime a new address is added */
         setWatcherForAddAddressRoute(txAddress, addressDetail, txWatcher, watcherTimer);
          
        })
 

 
 // Body Parser middleware
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 
 /** _______________________________API ROUTES_________________________________ */
 app.use("/api/watchman/address", addAddress);
 app.use("/api/watchman", getAddress);
 app.use("/api/watchman", getAddress);
 app.use("/api/watchman", updateAddress);
 app.use("/api/watchman", deleteAddress);

 
 app.listen(PORT || 5400, () => {
   console.log("server started on port", PORT);
 });
 