// authentication middleware

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (request, response, next) => {
  try {
    console.log("Cookies", request.cookies);
    console.log("Body", request.body.token);
    console.log("header ", request.header("Authorization"));
    // Extract token
    var token =
      request.cookies.token ||
      request.body.token ||
      request.header("Authorization").replace("Bearer ", "");
    console.log("Token is ", token);
    if (!token) {
      return response.status(401).json({
        success: false,
        message: "No Token, Authorization Denied",
      });
    }
    try {
      // decoded -> payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("Decoded is ", decoded);
      request.user = decoded;
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        success: false,
        message: "Invalid Token",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      success: false,
      message: "Something Went Wrong While Verifying Token",
    });
  }
};

exports.isStudent = (request, response, next) => {
  try {
    if (request.user.role !== "Student") {
      return response.status(401).json({
        success: false,
        message: "Unauthorized Access this Route For Student Only",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      success: false,
      message: "Something Went Wrong While Verifying Student",
    });
  }
};

exports.isAdmin = (request, response, next) => {
  try {
    if (request.user.role !== "Admin") {
      return response.status(401).json({
        success: false,
        message: "Unauthorized Access this Route For Admin Only",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      success: false,
      message: "Something Went Wrong While Verifying Admin",
    });
  }
};
