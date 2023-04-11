const { Op } = require("sequelize");
// import hàm quản lý các đối tượng model
const iniModels = require("../models/init-models");
// import chuỗi kết nối CSDL
const sequelize = require("../models/index");
const { successCode, errorCode, failCode } = require("../config/response");

// đối tượng chứa các model trong database
const model = iniModels(sequelize);

const order = async (req, res) => {
  try {
    const { user_id, food_id, amount, code, arr_sub_id } = req.body;

    // INSERT INTO VALUES
    let newOrder = {
      user_id,
      food_id,
      amount,
      code,
      arr_sub_id,
    };

    let data = await model.order.create(newOrder);

    // console.log(data);

    res.status(200).send("order success");
  } catch (err) {
    failCode(res, "Loi BE");
  }
};

module.exports = { order };
