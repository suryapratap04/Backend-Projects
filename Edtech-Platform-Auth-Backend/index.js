const express = require("express");
const app = express();

// to parse json request body
app.use(express.json());

// load config from a .env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Cookio-parser what is this and why we use it
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// import route for todo api
const user = require("./routes/user");

// mount the todo API routes
app.use("/api/v1/", user);

// start server
app.listen(PORT, () => {
  console.log(`server Started at ${PORT}`);
});

// connect to the database
const dbConnect = require("./config/database");
dbConnect();
// require("./config/database").connect();

// default route
app.get("/", (request, response) => {
  response.send(`this is homopage Route`);
});
