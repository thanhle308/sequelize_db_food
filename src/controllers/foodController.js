const { Op } = require("sequelize");
// import hàm quản lý các đối tượng model
const iniModels = require("../models/init-models");
// import chuỗi kết nối CSDL
const sequelize = require("../models/index");
const { successCode, errorCode, failCode } = require("../config/response");

// đối tượng chứa các model trong database
const model = iniModels(sequelize);

const getFood = async (req, res) => {
  try {
    // SELECT * FROM food WHERE food_name LIKE '%a%'
    // bất đồng bộ
    // list object [{},{}]

    let data = await model.food.findAll({
      where: {
        food_name: {
          [Op.like]: "%a%",
        },
      },
    });

    // let data = await model.like_res.findAll({include:["user","re"]});

    // // object {}
    // let data2 = await Food.findOne({ where: { food_id: 1 } });
    successCode(res, data, "get food sucess");
  } catch (err) {
    failCode(res, "Loi BE");
  }
};

const createFood = async (req, res) => {
  try {
    const { food_name, image, price, desc, type_id } = req.body;

    // INSERT INTO VALUES
    let newModel = {
      food_name,
      image,
      price,
      desc,
      type_id,
    };

    let data = await model.food.create(newModel);

    // console.log(data);

    res.status(200).send("Food created");
  } catch (err) {
    failCode(res, "Loi BE");
  }
};

const updateFood = async (req, res) => {
  try {
    let { food_id } = req.params;
    const { food_name, image, price, desc, type_id } = req.body;

    //UPDATE SET WHERE
    let modelUpdate = {
      food_name,
      image,
      price,
      desc,
      type_id,
    };
    await model.food.update(modelUpdate, { where: { food_id } });
    res.status(200).send("Food updated");
  } catch (err) {
    failCode(res, "Loi BE");
  }
};

const removeFood = async (req, res) => {
  try {
    // DELETE FROM WHERE
    let { food_id } = req.params;

    await model.food.destroy({ where: { food_id } });
    res.status(200).send("Food remove");
  } catch (err) {
    failCode(res, "Loi BE");
  }
};

module.exports = { getFood, createFood, updateFood, removeFood };
