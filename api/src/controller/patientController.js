const { validationResult, matchedData } = require('express-validator')
const { patientModel } = require('../models/patientModel')

// Bemor yaratish
exports.createPatient = async (req, res) => {
    try {
        const generateRandomCode = () => Math.floor(100000 + Math.random() * 900000);

        const code = generateRandomCode()

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

        const condidat = await patientModel.findOne({ email: data.email })

        if (condidat) {
            return res.status(400).send({
                error: "Bunday emailga tegishli bemor allaqachon ro'yhatdan o'tgan!"
            })
        }

        const patient = await patientModel.create({
            fullName: data.fullName,
            age: data.age,
            email: data.email,
            analysis: data.analysis,
            code: code
        })

        return res.status(200).send({
            message: "Bemor muvaffaqiyatli yaratildi!",
            patient
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

// Hamma bemorlarni ko'rish
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await patientModel.find()

        if (!patients) {
            return res.status(404).send({
                error: "Bemorlar mavjud emas!"
            })
        }

        return res.status(200).send({
            message: "Bemorlar ro'yxati!",
            patients
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

// Bitta bemorni ko'rish
exports.getOnePatient = async (req, res) => {
    try {
        const { params: { id } } = req

        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                error: "ID haqiqiy emas!"
            })
        }

        const patient = await patientModel.findById(id)

        if (!patient) {
            return res.status(404).send({
                error: "Bemor topilmadi!"
            })
        }

        return res.status(200).send({
            message: "Bemor ma'lumotlari!",
            patient
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

// Bemor ma'lumotlarini yangilash
exports.updatedPateint = async (req, res) => {
    try {
        const { params: { id } } = req

        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                error: "ID haqiqiy emas!"
            })
        }

        const patient = await patientModel.findById(id)

        if (!patient) {
            return res.status(404).send({
                error: "Bemor topilmadi!"
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

        const updatedPateint = {
            fullName: data.fullName || patient.fullName,
            age: data.age || patient.age,
            email: data.email || patient.email,
            analysis: data.analysis || patient.analysis
        }

        await patientModel.findByIdAndUpdate(id, updatedPateint)

        return res.status(200).send({
            message: "Bemor ma'lumotlari muvaffaqiyatli yangilandi!",
            updatedPateint
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

// Be'morni o'chirish
exports.deletePatient = async (req, res) => {
    try {
        const { params: { id } } = req

        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                error: "ID haqiqiy emas!"
            })
        }

        const patient = await patientModel.findById(id)

        if (!patient) {
            return res.status(404).send({
                error: "Bemor topilmadi!"
            })
        }

        await patientModel.findByIdAndDelete(id)

        return res.status(200).send({
            message: "Bemor muvaffaqiyatli o'chirildi!"
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