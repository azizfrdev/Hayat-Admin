const { validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminModel } = require("../../models/adminModel");
const { doctorModel } = require('../../models/doctorModel')
require("dotenv").config();

// Token generatsiya qilish
const generateToken = (id, role) => {
  const payload = {
    id,
    role,
  };
  return jwt.sign(payload, process.env.JWT_KEY);
};

exports.login = async (req, res) => {
  try {
    // error bilan ishlash
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        error: errors.array().map((error) => error.msg),
      });
    }
    const data = matchedData(req);

    // Admin user
    let user = await adminModel.findOne({ username: data.username }).lean();

    console.log(user);
    
    if (user) {
      // Parol to'g'riligini tekshirish
      const checkPassword = bcrypt.compare(data.password, user.password);
      if (!checkPassword) {
        return res.status(403).send({
          error: "Parol xato!",
        });
      }

      // Token generatsiya qilish
      const userId = user._id;
      const role = user.role;
      const token = generateToken(userId, role);

      // Cookiega saqlash
      res.cookie("authcookie", token, { httpOnly: true });
      res.cookie("token", userId, { httpOnly: true });

      return res.status(200).send({
        message: 'Login muvvaffaqiyatli amalga oshirildi!',
        token: token
      })
    }

    // Doctor user
    user = await doctorModel.findOne({username: data.username})

    console.log(user);
    
    if (user) {
        // Parol to'g'riligini tekshirish
      const checkPassword = bcrypt.compare(data.password, user.password);
      if (!checkPassword) {
        return res.status(403).send({
          error: "Parol xato!",
        });
      }

      // Token generatsiya qilish
      const userId = user._id;
      const role = user.role;
      const token = generateToken(userId, role);

      // Cookiega saqlash
      res.cookie("authcookie", token, { httpOnly: true });
      res.cookie("token", userId, { httpOnly: true });

      return res.status(200).send({
        message: 'Login muvvaffaqiyatli amalga oshirildi!',
        token: token
      })
    }

    return res.status(404).send({ message: 'User topilmadi' })

  } catch (error) {
    console.log(error);
    if (error.message) {
        return res.status(400).send({
            error: error.message
        })
    }
    return res.status(500).send({
        error: "Serverda xatolik!"
    })
  }
};
