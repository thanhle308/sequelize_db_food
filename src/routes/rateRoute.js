const express = require("express");
const {
  addRate,
  getRateFromRes,
  getRateFromUser,
} = require("../controllers/rateController");
const rateRouter = express.Router();

// tạo API
// API get rate from user
rateRouter.get("/get-rate-from-user/:user_id", getRateFromUser);

// API get rate from res
rateRouter.get("/get-rate-from-res/:res_id", getRateFromRes);

// API add rate
rateRouter.post("/rate", addRate);

module.exports = rateRouter;
