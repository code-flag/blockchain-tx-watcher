import express from "express";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
import { TransactionDb } from "../model/database/schemas/schema";
import { getMessage } from "../message/message-handler";
dotEnv.config();
export const router = express.Router();


router.get("/", async (req, res) => {

    TransactionDb.find()
        .then((addressData: any) => {
          res.status(200)
            .json(getMessage(addressData, "Users successfully retrieved", true));
        })
        .catch((err: any) => {
          res.status(400)
            .json(
              getMessage(
                err,
                "Something went wrong. Could not fetch all employee",
                false,
                400
              )
            );
        });
});

router.get("/:address", async (req, res) => {

        TransactionDb.find({ address: req.params.address })
        .then((result: any) => {
            console.log('single address data', result);
            
          res
            .status(200)
            .json(getMessage(result, "User successfully retrieved", true));
        })
        .catch((err: any) => {
          res
            .status(200)
            .json(
              getMessage(
                err,
                "Something went wrong. Could not fetch all employees",
                false
              )
            );
        });
});
