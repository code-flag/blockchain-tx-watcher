"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnection = void 0;
const mongoose = require("mongoose");
require('dotenv/config');
const url = process.env.DB_CONNECTION_URL;
const DBConnection = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => {
        if (err) {
            console.log("error could not connect to database \n", err);
        }
        else {
            console.log("Database successfully connected");
        }
    });
};
exports.DBConnection = DBConnection;
