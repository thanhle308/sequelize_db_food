const express = require("express");
const likeRouter = express.Router();

const {
  getLikeFromUser,
  getLikeFromRes,
  addLike,
  unLike,
} = require("../controllers/likeController");

// tạo API
// API get like from user
likeRouter.get("/get-like-from-user/:user_id", getLikeFromUser);

// API get like from res
likeRouter.get("/get-like-from-res/:res_id", getLikeFromRes);

// API add like
likeRouter.post("/add-like", addLike);

// // API unlike
likeRouter.delete("/unlike", unLike);

module.exports = likeRouter;
