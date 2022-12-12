"use strict";
// const express = require("express");
// const { Employee } = require("../../database/schemas/schema");
// const getMessage = require("../../message/app-messages");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const key = process.env.API_SECRET_KEY;
// require("dotenv/config");
// router.get("/", async (req, res) => {
//   jwt.verify(req.token, key, (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       Employee.find()
//         .then((users) => {
//           res
//             .status(200)
//             .json(getMessage(users, "Users successfully retrieved", true));
//         })
//         .catch((err) => {
//           res
//             .status(200)
//             .json(
//               getMessage(
//                 err,
//                 "Something went wrong. Could not fetch all employee",
//                 false
//               )
//             );
//         });
//     }
//   });
// });
// router.get("/:userId", async (req, res) => {
//   jwt.verify(req.token, key, (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       Employee.find({ _id: req.params.userId })
//         .then((result) => {
//           res
//             .status(200)
//             .json(getMessage(result, "User successfully retrieved", true));
//         })
//         .catch((err) => {
//           res
//             .status(200)
//             .json(
//               getMessage(
//                 err,
//                 "Something went wrong. Could not fetch all employees",
//                 false
//               )
//             );
//         });
//     }
//   });
// });
// module.exports = router;
