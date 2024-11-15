const { validationResult, matchedData } = require('express-validator')
const { doctorModel } = require('../models/doctorModel')
const bcrypt = require('bcrypt')

// Doctor yaratish
exports.createDoctor = async (req, res) => {
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
    const condidat = await doctorModel.findOne({ username: data.username })
    if (condidat) {
      return res.status(400).send({
        error: "Bunday foydalanuvchi nomi allaqachon bor!"
      })
    }

    // Parolni hashlash
    const passwordHash = await bcrypt.hash(data.password, 10)
    delete data.password

    const doctor = await doctorModel.create({
      fullName: data.fullName,
      username: data.username,
      password: passwordHash,
      data_of_brith: data.data_of_brith,
      experience: data.experience,
      position: data.position,
      category: data.category,
      description: data.description
    })

    return res.status(200).send({
      doctor,
      message: "Doktor muvaffaqiyatli yaratildi!"
    })
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(400).send({
        error: error.message,
      });
    }
    return res.status(500).send("Serverda xatolik!");
  }
}

// Hamma doctorlarni ko'rish
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find()

    if (!doctors) {
      return res.status(404).send({
        error: "Shifokorlar topilmadi!"
      })
    }

    return res.status(200).send({
      message: "Shifokorlar ro'yxati!",
      doctors
    })
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(400).send({
        error: error.message,
      });
    }
    return res.status(500).send("Serverda xatolik!");
  }
}

// Bitta doctorni olish
exports.getOneDoctors = async (req, res) => {
  try {
    const { params: { id } } = req

    // Checking id to valid.
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        error: "ID haqiqiy emas!"
      })
    }

    const doctor = await doctorModel.findById(id)

    if (!doctor) {
      return res.status(404).send({
        error: "Shifikor topilmadi!"
      })
    } else {
      return res.status(200).send({
        message: "Shifokor",
        doctor
      })
    }
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(400).send({
        error: error.message,
      });
    }
    return res.status(500).send("Serverda xatolik!");
  }
}

exports.updateDoctor = async (req, res) => {
  try {
    const { params: { id } } = req

    // Checking id to valid.
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        error: "ID haqiqiy emas!"
      })
    }

    const doctor = await doctorModel.findById(id)

    if (!doctor) {
      return res.status(404).send({
        error: "Shifikor topilmadi!"
      })
    }

    // error bilan ishlash
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        error: errors.array().map((error) => error.msg),
      });
    }
    const data = matchedData(req);

    const updateDoctor = {
      fullName: data.fullName || doctor.fullName,
      username: data.username || doctor.username,
      data_of_brith: data.data_of_brith || doctor.data_of_brith,
      experience: data.experience || doctor.experience,
      position: data.position || doctor.position,
      category: data.category || doctor.category,
      description: data.description || doctor.description
    }

    await doctorModel.findByIdAndUpdate(id, updateDoctor)

    return res.status(200).send({
      message: "Shifokor ma'lumotlari muvaffaqiyatli yangilandi!",
      updateDoctor
    })
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(400).send({
        error: error.message,
      });
    }
    return res.status(500).send("Serverda xatolik!");
  }
}

exports.updatePassword = async (req, res) => {
  try {
    const { params: { id } } = req

    // Checking id to valid.
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        error: "ID haqiqiy emas!"
      })
    }

    const doctor = await doctorModel.findById(id)

    if (!doctor) {
      return res.status(404).send({
        error: "Shifikor topilmadi!"
      })
    }

    // error bilan ishlash
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        error: errors.array().map((error) => error.msg),
      });
    }
    const data = matchedData(req);

    // Parolni hashlash
    const passwordHash = await bcrypt.hash(data.password, 10)
    delete data.password

    console.log(passwordHash);


    const updating = await doctorModel.findByIdAndUpdate(id, {
      password: passwordHash
    }, { new: true })

    return res.status(200).send({
      message: "Shifokor paroli yangilandi!",
      doctor: updating
    })
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(400).send({
        error: error.message,
      });
    }
    return res.status(500).send("Serverda xatolik!");
  }
}

exports.deleteDoctor = async (req, res) => {
  try {
    const { params: { id } } = req

    // Checking id to valid.
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        error: "ID haqiqiy emas!"
      })
    }

    const doctor = await doctorModel.findById(id)

    if (!doctor) {
      return res.status(404).send({
        error: "Shifikor topilmadi!"
      })
    }

    await doctorModel.findByIdAndDelete(id)

    return res.status(200).send({
      message: "Shifokor muvaffaqiyatli o'chirildi!"
    })
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(400).send({
        error: error.message,
      });
    }
    return res.status(500).send("Serverda xatolik!");
  }
}