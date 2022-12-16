
import express from "express";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
import { TransactionDb } from "../model/database/schemas/schema";
import { getMessage } from "../message/message-handler";
dotEnv.config();
export const router = express.Router();

router.put("/:address", async (req, res) => {

        TransactionDb.findOneAndUpdate({ 'address': req.params.address }, req.body, {
          new: true,
        })
          .then((data: any) => {
            console.log('adddress data successfully update >> ', data);
              res.status(200)
              .json(
                getMessage(data, "Address data data successfully updated", true)
              );
          })
          .catch((err: any) => {
            res
              .status(400)
              .json(getMessage(err, "Something went wrong", false, 400));
          });
    
});

// module.exports = router;
