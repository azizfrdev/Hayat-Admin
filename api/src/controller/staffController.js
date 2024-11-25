const { staffModel } = require('../models/staffModel')
const { validationResult, matchedData } = require('express-validator')

// Xodim yaratish
exports.createStaff = async (req, res) => {
    try {
        // error bilan ishlash
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({
                error: errors.array().map((error) => error.msg),
            });
        }
        const data = matchedData(req);

        // data bo'sh emasligini tekshirish
        if (!Object.keys(data)) {
            return res.status(404).send({
                error: "Ma'lumotlar topilmadi!"
            })
        }

        const staff = await staffModel.create({
            fullName: data.fullName,
            position: data.position,
            description: data.description
        })

        return res.status(200).send({
            message: "Xodim muvaffaqiyatli yaratildi!",
            staff
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

// Barcha xodimlarni ko'rish
exports.getAllStaff = async (req, res) => {
    try {
        const staff = await staffModel.find()

        if (!staff.length) {
            return res.status(404).send({
                error: "Xodimlar mavjud emas!"
            })
        }

        return res.status(200).send({
            message: "Xodimlar jadvali!",
            staff
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

// Bitta xodimni olish
exports.getOneStaff = async (req, res) => {
    try {
        const { params: { id } } = req

        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                error: "ID haqiqiy emas!"
            })
        }

        const staff = await staffModel.findById(id)

        if (!staff) {
            return res.status(404).send({
                error: "Xodim topilmadi!"
            })
        }

        return res.status(200).send({
            message: "Xodim!",
            staff
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

// Xodim ma'lumotlarini yangilash
exports.updateStaff = async (req, res) => {
    try {
        const { params: { id } } = req

        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                error: "ID haqiqiy emas!"
            })
        }

        const staff = await staffModel.findById(id)

        if (!staff) {
            return res.status(404).send({
                error: "Xodim topilmadi!"
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

        // data bo'sh emasligini tekshirish
        if (!Object.keys(data)) {
            return res.status(404).send({
                error: "Ma'lumotlar topilmadi!"
            })
        }

        const updatedStaff = {
            fullName: data.fullName || staff.fullName,
            position: data.position || staff.position,
            description: data.description || staff.description
        }

        await staffModel.findByIdAndUpdate(id, updatedStaff)

        return res.status(200).send({
            message: "Xodim ma'lumotlari muvaffaqiyatli yangilandi!",
            staff
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

// Xodimni o'chirish
exports.deleteStaff = async (req, res) => {
    try {
        const { params: { id } } = req

        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                error: "ID haqiqiy emas!"
            })
        }

        const staff = await staffModel.findById(id)

        if (!staff) {
            return res.status(404).send({
                error: "Xodim topilmadi!"
            })
        }

        await staffModel.findByIdAndDelete(id)

        return res.status(200).send({
            message: "Xodim muvaffaqiyatli o'chirildi!"
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

exports.searchStaff = async (req, res) => {
    try {
        const data = await staffModel.find(
            {
                "$or": [
                    {fullName: {$regex: req.params.key}},
                    {position: {$regex: req.params.key}}
                ]
            }
        )
        return res.send(data)

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