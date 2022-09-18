/**
 * @author - Francis OLawumi Awe <awefrancolaz@gmail.com>
 * @description - This api handles account number for user
 */

 require("dotenv/config");
 const PORT = process.env.PORT;
//  const MAINNET = process.env.TEST_ENDPOINT
 const express = require("express");
 const app = express();
//  const Web3 = require('web3');
//  const web3 = new Web3(Web3.givenProvider || MAINNET);
 const cors = require("cors");

 
 /** _________________________User router file directory__________________________ */
 const depositTXN = require('./src/routes/deposit');
 const withdrawTXN = require('./src/routes/withdrawBNB');
 const withdrawToken = require('./src/routes/withdrawToken');

 
 /**_________________________________ Middleware ________________________________ */
 
 
 app.use(
   cors({
     origin: "*",
     methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
     credentials: false,
   })
 );
 // Add headers before the routes are defined
 app.use(function (req, res, next) {
   // Website you wish to allow to connect
   res.header("Access-Control-Allow-Origin", "*");
 
   // Request methods you wish to allow
   res.header(
     "Access-Control-Allow-Methods",
     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
   );
 
   // Request headers you wish to allow
   res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
 
   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   // res.header('Access-Control-Allow-Credentials', true);
 
   // Pass to next layer of middleware
   next();
 });
 
 // Body Parser middleware
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 
 /** _______________________________API ROUTES_________________________________ */
 app.use("/api/blockchain-deposit", depositTXN);
 app.use("/api/blockchain-withdrawer",  withdrawTXN);
 app.use("/api/blockchain-withdrawToken",  withdrawToken); 

 
 app.listen(PORT || 8400, () => {
   console.log("server started on port", PORT);
 });
 