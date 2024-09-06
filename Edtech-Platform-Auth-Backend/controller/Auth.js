const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/user");
require("dotenv").config();

// SignUp router handler
exports.signUp = async (request, response) => {
  try {
    // get data from request
    const { name, email, password, role } = request.body;
    // check if user already exits
    const existUser = await User.findOne({ email });
    if (existUser) {
      return response.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }
    //   Secure Password
    let hashPwd;
    try {
      // hasing in 10 round of password
      hashPwd = await bcrypt.hash(password, 10);
      console.log(`Hashed Password is ${hashPwd}`);
    } catch (error) {
      console.log(`Error Occured in Hashing `);
      return response.status(500).json({
        success: false,
        message: "Error in hasing ",
      });
    }

    // create entry for user
    const user = await User.create({
      name,
      name: "auth3",
      email,
      password: hashPwd,
      role,
    });

    response.status(200).json({
      success: true,
      message: "User Created Succesfully",
    });
  } catch (error) {
    console.error(error);
    console.log(`Error Occured ${error.message}`);
    return response.status(500).json({
      success: false,
      message: "Error in registration",
    });
  }
};

// login controller
exports.login = async (request, response) => {
  try {
    // fetch the data from body
    const { email, password } = request.body;

    // if invalid fields
    if (!email && !password) {
      return response.status(400).json({
        success: false,
        message: "Please Fillthe fields Correctly ",
      });
    }
    // no such user exists
    let user = await User.findOne({ email });

    // not exists
    if (!user) {
      return response.status(401).json({
        success: false,
        message: "user Not exists",
      });
    }
    // if exits
    // payload -> data
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    //  check password and generate tokens cookies
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      response.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Loged In successfully ",
      });
    } else {
      return response.status(500).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    console.log(`Error Occured ${error.message}`);
    return response.status(500).json({
      success: false,
      message: "Error in login",
    });
  }
};
