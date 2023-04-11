const { Op } = require("sequelize");
// import hàm quản lý các đối tượng model
const iniModels = require("../models/init-models");
// import chuỗi kết nối CSDL
const sequelize = require("../models/index");
const { successCode, errorCode, failCode } = require("../config/response");

// đối tượng chứa các model trong database
const model = iniModels(sequelize);

const getRateFromUser = async (req, res) => {
  try {
    let { user_id } = req.params;

    let data = await model.user.findOne({
      include: ["res_id_restaurant_rate_res"],
      where: {
        user_id: {
          [Op.like]: user_id,
        },
      },
    });

    // let data = await model.like_res.findAll({include:["user","re"]});

    // // object {}
    // let data2 = await Food.findOne({ where: { food_id: 1 } });
    successCode(res, data, "get like sucess");
  } catch (err) {
    failCode(res, "Loi BE");
  }
};
const getRateFromRes = async (req, res) => {
  try {
    let { res_id } = req.params;

    let data = await model.restaurant.findOne({
      include: ["user_id_user_rate_res"],
      where: {
        res_id: {
          [Op.like]: res_id,
        },
      },
    });

    successCode(res, data, "get like sucess");
  } catch (err) {
    failCode(res, "Loi BE");
  }
};

const addRate = async (req, res) => {
  try {
    const { user_id, res_id, amount } = req.body;
    if (amount >= 0 && amount <= 5) {
      // INSERT INTO VALUES
      let newRate = {
        user_id,
        res_id,
        amount,
      };

      let data = await model.rate_res.create(newRate);

      // console.log(data);

      res.status(200).send("rate success");
    } else failCode(res, "Loi amount");
  } catch (err) {
    failCode(res, "Loi BE");
  }
};

module.exports = { getRateFromUser, getRateFromRes, addRate };
