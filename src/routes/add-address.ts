
import express from "express";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
import { TransactionDb } from "../model/database/schemas/schema";
import { getMessage } from "../message/message-handler";
dotEnv.config();
export const router = express.Router();

var address: any = [];
var txWatcher: any;
var watcherTimer: number = 0;
var addressDetail: any;

/**
 * THis method set value for add address route.
 * It helps us to reset watcher after a new address is added
 * @param {Array} txAddress - Current transaction addresses
 * @param txWatcherInstance - transaction watcher instance
 * @param {number} watchTimer - time in seconds used to check transaction block
 */
export const setWatcherForAddAddressRoute = (txAddress: any, addressData: any, txWatcherInstance: any, watchTimer: number) => {
    address = txAddress;
    addressDetail = addressData;
    txWatcher = txWatcherInstance;
    watcherTimer = watchTimer;
}

const resetWatcher = () => {
  txWatcher.addressDetail = addressDetail;
  txWatcher.account = address;
  txWatcher.watch(watcherTimer);
}

router.post("/", (req, res) => {
        if (address && !address?.includes(req.body.address)) {
          if (
            req.body.address && typeof req.body.address === 'string' &&
            req.body.allocation_id &&
            req.body.webhook_url && typeof req.body.webhook_url === 'string' 
          ) {
  
           const addressData = {
            address: req.body.address,
            allocation_id: typeof req.body.allocation_id == 'string' ? parseInt(req.body.allocation_id) : req.body.allocation_id,
            webhook_url: req.body.webhook_url,
            meta: req.body?.meta
           }
            // insert to database
            let response = new TransactionDb(addressData)
              .save()
              .then((data: any) => {
                // update address var
                address.push(req.body.address);
                // update address details
                addressDetail[req.body.address] = {
                  allocation_id: req.body.allocation_id,
                  webhook_url: req.body.webhook_url, 
                  meta: req.body.meta 
                };
                // rest watcher
                resetWatcher();

                console.log("New Address added. Total address: ", address?.length, ' __Addresses List >>', address);
                // send response back
                res
                  .status(200)
                  .json(
                    getMessage(
                      data,
                      "Address data added successfully",
                      true
                    )
                  );
              })
              .catch((err: any) => {
                res
                  .status(400)
                  .json(
                    getMessage(
                      err,
                      "Could not add address. Parameter error! Ensure all parameters are correct.",
                      false,
                      400
                    )
                  );
              });
          } 
        } else {
          res.status(401).json(
                    getMessage(
                      [],
                      "Address already exist. Kindly try another address",
                      false,
                      401
                    )
                  );
        }
});


