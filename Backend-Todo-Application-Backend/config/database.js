const mongoose = require("mongoose");

// this statement load all data from config to the process object
require("dotenv").config();
const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connection with DB is Sucessful");
    })
    .catch((err) => {
      console.log(`Issue in DB Connection ${err.message}`);
      process.exit(1);
    });
};
module.exports = dbConnect;
