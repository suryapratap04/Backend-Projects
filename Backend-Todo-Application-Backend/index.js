const express = require("express");
const app = express();

// to parse json request body
app.use(express.json());

// load config from a .env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// import route for todo api
const todoRoutes = require("./routes/todos");

// mount the todo API routes
app.use("/api/v1/", todoRoutes);

// start server
app.listen(PORT, () => {
  console.log(`server Started at ${PORT}`);
});

// connect to the database
const dbConnect = require("./config/database");
dbConnect();

// default route
app.get("/", (request, response) => {
  response.send(`this is homopage Route`);
});
