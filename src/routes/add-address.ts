
import express from "express";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
import { TransactionDb } from "../model/database/schemas/schema";
import { getMessage } from "../message/message-handler";
dotEnv.config();
export const router = express.Router();

router.post("/", (req, res) => {
      
        if (req.body.address && typeof req.body.address === 'string') {
         const address: Array<string> = [];
         address.push(req.body.address);
          // insert to database
          let emp = new TransactionDb(address)
            .save()
            .then((data: any) => {
              res
                .status(200)
                .json(
                  getMessage(
                    data,
                    "Transaction address added successfully",
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
                    "Something went wrong. Could not add address",
                    false,
                    400
                  )
                );
            });
        } 
});


