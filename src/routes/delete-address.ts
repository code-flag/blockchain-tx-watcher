// const express = require('express');
// const jwt = require('jsonwebtoken');
// const { Employee } = require('../../database/schemas/schema');
// const getMessage = require('../../message/app-messages');
// const router = express.Router();
// require('dotenv/config');
// const key = process.env.API_SECRET_KEY;


// router.delete('/:userId', async (req, res) => {
//     jwt.verify(req.token, key, (err, authData) => {
//         if(err){
//             res.sendStatus(403);
//         }
//         else {
//                 Employee.findOneAndRemove({'_id': req.params.userId}).then((data) => {
//                     res.status(200).json(
//                         getMessage(data, "Employee successfully deleted", true)
//                       );
//                   })
//                   .catch((err) => {
//                 res.status(200).json(getMessage(err, 'Something went wrong', false));
//             });
//         }
//     })
// });

// module.exports = router;