const { adminModel } = require("../models/adminModel");
const { validationResult, matchedData } = require('express-validator')
const bcrypt = require('bcrypt')

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

    // Usernameni tekshirish
    const condidat = await adminModel.findOne({ username: data.username })
    if (condidat) {
      return res.status(400).send({
        error: "Bunday foydalanuvchi nomi allaqachon bor!"
      })
    }

    // Parolni hashlash
    const passwordHash = await bcrypt.hash(data.password, 10)
    delete data.password


    const admin = await adminModel.create({
      name: data.name,
      username: data.username,
      password: passwordHash,
    });

    return res.status(200).send({
      message: "Admin muvaffaqiyatli yaratildi!",
      admin
    });
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(400).send({
        error: error.message,
      });
    }
    return res.status(500).send("Serverda xatolik!");
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    const admins = await adminModel.find();

    if (!admins) {
      return res.status(400).send("Adminlar topilmadi!");
    }

    return res.status(200).send({
      message: "Adminlar ro'yxati!",
      admins
    });
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(400).send({
        error: error.message,
      });
    }
    return res.status(500).send("Serverda xatolik!");
  }
};

// Adminni o'chirish
exports.deleteAdmin = async (req, res) => {
  try {
    const { body: { ids } } = req;

    // Tekshirish: IDlar ro'yxati mavjudligini va to'g'riligini tasdiqlash
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).send({
        error: "IDlar ro'yxati noto'g'ri yoki bo'sh!"
      });
    }

    // Har bir ID uchun validatsiya
    const invalidIds = ids.filter(id => !id.match(/^[0-9a-fA-F]{24}$/));
    if (invalidIds.length > 0) {
      return res.status(400).send({
        error: `Quyidagi IDlar noto'g'ri: ${invalidIds.join(", ")}`
      });
    }

    if (ids.length === 1) {
      // Agar bitta ID yuborilgan bo'lsa, deleteOne ishlatiladi
      const admin = await adminModel.findById(ids[0]);

      if (!admin) {
        return res.status(404).send({
          error: "Admin topilmadi!"
        });
      }

      await adminModel.findByIdAndDelete(ids[0]);

      return res.status(200).send({
        message: "Admin muvaffaqiyatli o'chirildi!"
      });
    } else {
      // Agar bir nechta ID yuborilgan bo'lsa, deleteMany ishlatiladi
      const result = await adminModel.deleteMany({ _id: { $in: ids } });

      return res.status(200).send({
        message: `${result.deletedCount} ta admin muvaffaqiyatli o'chirildi!`
      });
    }
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(400).send({
        error: error.message,
      });
    }
    return res.status(500).send({
      error: error.message || "Serverda xatolik yuz berdi!"
    });
  }
};
