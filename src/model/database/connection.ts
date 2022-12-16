const mongoose = require("mongoose");
require('dotenv/config');

const url: string | undefined = process.env.DB_CONNECTION_URL;

export const DBConnection = () => {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err: any) => {
      if (err) {
        console.log("error could not connect to database \n", err);
      } else {
        console.log("Database successfully connected");
      }
    }
  );
};

