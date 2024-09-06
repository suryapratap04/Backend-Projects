// todo type ka object bnao aur datebase me dalo
// import  the model
const Todo = require("../models/Todo");

// define route handler
exports.getTodo = async (request, response) => {
  try {
    // fetch all todo items from database
    const todos = await Todo.find({});

    // response updation
    response.status(300).json({
      success: true,
      data: todos,
      message: "Entire todo data is fetched",
    });
  } catch (err) {
    console.log(err),
      console.error(err),
      response.status(500).json({
        sucess: false,
        data: "Internal Server error",
        message: err.message,
      });
  }
};

exports.getTodoById = async (request, response) => {
  try {
    //    extract todo item basis on id
    const id = request.params.id;
    const todo = await Todo.findById({ _id: id });

    // error in the todo by given id
    if (!todo) {
      return response.status(404).json({
        success: false,
        message: "No data for given id ",
      });
    }
    // data is found for given id
    response.status(200).json({
      success: true,
      data: todo,
      message: "Tod is found for particular id",
    });
  } catch (err) {
    console.log(err),
      console.error(err),
      response.status(500).json({
        sucess: false,
        data: "Internal Server error",
        message: err.message,
      });
  }
};
