"use strict";
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const { Employee } = require("../../database/schemas/schema");
// const getMessage = require("../../message/app-messages");
// const router = express.Router();
// require("dotenv/config");
// const key = process.env.API_SECRET_KEY;
// router.put("/:userId", async (req, res) => {
//   jwt.verify(req.token, key, (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       let check = verifyEmployeePayload(req.body);
//       if (check.status) {
//         Employee.findOneAndUpdate({ _id: req.params.userId }, req.body, {
//           new: true,
//         })
//           .then((data) => {
//             res
//               .status(200)
//               .json(
//                 getMessage(data, "Employee data successfully updated", true)
//               );
//           })
//           .catch((err) => {
//             res
//               .status(200)
//               .json(getMessage(err, "Something went wrong", false));
//           });
//       } else {
//         res
//           .status(400)
//           .json(getMessage(check, "Invalid Username and password", false));
//       }
//     }
//   });
// });
// module.exports = router;
