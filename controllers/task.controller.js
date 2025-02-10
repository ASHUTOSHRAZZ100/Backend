import jsonwebtoken from "jsonwebtoken";
import { Task } from "../models/task.model.js";
import { jsonRes } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.middleware.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description, user: req.user });
    await task.save();

    jsonRes(res, 201, true, "Task is added Successfully");
    // next()
  } catch (error) {
    console.log("😣 check task controller ", error);
    return next(new ErrorHandler(500));
  }
};

export const getMyTask = async (req, res) => {
  try {
    const { token } = req.cookies;

    const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const task = await Task.find({ user: decode._id });

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log("😣 check task controller ", error);
    return next(new ErrorHandler(500));
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return next(new ErrorHandler(404, "Ivalid Task Id"));
    }
    task.isCompleted = !task.isCompleted;
    await task.save();
    jsonRes(res, 200, true, "Updated");
  } catch (error) {
    console.log("😣 check Task updated controller", error);
    return next(new ErrorHandler(500, "Not Updated"));
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return next(new ErrorHandler(404, "Ivalid Task Id"));
    }
    await task.deleteOne();
    jsonRes(res, 200, true, "Deleted Task");
  } catch (error) {
    console.log("😣 check task delete contriller", error);
    return next(new ErrorHandler(500, "Not Deleted"));
  }
};
