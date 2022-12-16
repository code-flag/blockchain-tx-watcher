
import express from "express";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
import { TransactionDb } from "../model/database/schemas/schema";
import { getMessage } from "../message/message-handler";
dotEnv.config();
export const router = express.Router();

router.delete('/:address', async (req, res) => {
                TransactionDb.findOneAndRemove({'address': req.params.address}).then((data: any) => {
                    console.log('user address data deleted successfully', data);
                    
                    res.status(200).json(
                        getMessage(data, "Address data successfully deleted", true)
                      );
                  })
                  .catch((err: any) => {
                res.status(400).json(getMessage(err, 'Something went wrong', false, 400));
            });
});

// module.exports = router;