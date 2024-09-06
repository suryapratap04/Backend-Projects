const express = require("express");
const router = express.Router();

// import controller
const { login, signUp } = require("../controller/Auth");
const { auth, isStudent, isAdmin } = require("../middlewares/authentication");

router.post("/login", login);
router.post("/signUp", signUp);

// testing route
router.get("/test", auth, (request, response) => {
  response.status(200).json({
    success: true,
    message: "Welcome to the Protected Route for test",
  });
});
// protected route
router.get("/student", auth, isStudent, (request, response) => {
  response.status(200).json({
    success: true,
    message: "Welcome to the Protected Student Route",
  });
});

router.get("/admin", auth, isAdmin, (request, response) => {
  response.status(200).json({
    success: true,
    message: "Welcome to the Protected Admin Route",
  });
});

module.exports = router;
