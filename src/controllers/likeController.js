const { Op } = require("sequelize");
// import hàm quản lý các đối tượng model
const iniModels = require("../models/init-models");
// import chuỗi kết nối CSDL
const sequelize = require("../models/index");
const { successCode, errorCode, failCode } = require("../config/response");

// đối tượng chứa các model trong database
const model = iniModels(sequelize);

const getLikeFromUser = async (req, res) => {
  try {
    let { user_id } = req.params;

    let data = await model.user.findOne({
      include: ["res_id_restaurants"],
      where: {
        user_id: {
          [Op.like]: user_id,
        },
      },
    });

    successCode(res, data, "get like sucess");
  } catch (err) {
    failCode(res, "Loi BE");
  }
};
const getLikeFromRes = async (req, res) => {
  try {
    let { res_id } = req.params;

    let data = await model.restaurant.findOne({
      include: ["user_id_users"],
      where: {
        res_id: {
          [Op.like]: res_id,
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

const addLike = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;

    // INSERT INTO VALUES
    let newLike = {
      user_id,
      res_id,
    };

    let data = await model.like_res.create(newLike);

    // console.log(data);

    res.status(200).send("like success");
  } catch (err) {
    failCode(res, "Loi BE");
  }
};

const unLike = async (req, res) => {
  try {
    // DELETE FROM WHERE
    const { user_id, res_id } = req.body;

    let removeLike = {
      user_id,
      res_id,
    };

    await model.like_res.destroy({ where: { user_id, res_id } });
    res.status(200).send("unlike success");
  } catch (err) {
    failCode(res, "Loi BE");
  }
};

module.exports = { getLikeFromUser, getLikeFromRes, addLike, unLike };
