const { adminModel } = require("../models/adminModel");
const { validationResult, matchedData } = require('express-validator')

// admin yaratish
exports.createAdmin = async (req, res) => {
  try {
    // error bilan ishlash
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        error: errors.array().map((error) => error.msg),
      });
    }
    const data = matchedData(req);

    const admin = await adminModel.create({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password,
    });

    return res.status(200).send({
      admin,
      message: "admin create successfull!",
    });
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(400).send({
        error: error.message,
      });
    }
    return res.status(500).send("Internal server error!");
  }
};

// barcha adminlarni ko'rish
exports.getAllAdmin = async (req, res) => {
  try {
    const admins = await adminModel.find();

    if (!admins) {
      return res.status(400).send("admins not found");
    }

    return res.status(200).send({ admins });
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(400).send({
        error: error.message,
      });
    }
    return res.status(500).send("Internal server error!");
  }
};
