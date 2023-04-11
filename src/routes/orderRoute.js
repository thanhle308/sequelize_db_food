const express = require("express");
const { order } = require("../controllers/orderController");
const orderRouter = express.Router();

// tạo API

// API create user order
orderRouter.post("/order", order);

module.exports = orderRouter;
