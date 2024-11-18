const { validationResult, matchedData } = require('express-validator')
const { serviceModel } = require('../models/serviceModel')

// Yangi xizmat yaratish
exports.createService = async (req, res) => {
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

        const service = await serviceModel.create({
            name: data.name,
            title: data.title,
            description: data.description
        })

        return res.status(200).send({
            message: "Yangi xizmat muvaffaqiyatli yaratildi!",
            service
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

// Barcha xizmatlarni ko'rish
exports.getAllServices = async (req, res) => {
    try {
        const services = await serviceModel.find()

        if (!services.length) {
            return res.status(404).send({
                error: "Xizmatlar mavjud emas!"
            })
        }

        return res.status(200).send({
            message: "Xizmatlar jadvali!",
            services
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

// Bitta xizmatni ko'rish
exports.getOneService = async (req, res) => {
    try {
        const { params: { id } } = req

        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                error: "ID haqiqiy emas!"
            })
        }

        const service = await serviceModel.findById(id)

        if (!service) {
            return res.status(404).send({
                error: "Xizmat topilmadi!"
            })
        }

        return res.status(200).send({
            message: "Xizmat!",
            service
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

// Xizmat ma'lumotlarini yangilash
exports.updateService = async (req, res) => {
    try {
        const { params: { id } } = req

        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                error: "ID haqiqiy emas!"
            })
        }

        const service = await serviceModel.findById(id)

        if (!service) {
            return res.status(404).send({
                error: "Xizmat topilmadi!"
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

        const updatedService = {
            name: data.name || service.name,
            title: data.title || service.title,
            description: data.description || service.description
        }

        await serviceModel.findByIdAndUpdate(id, updatedService)

        return res.status(200).send({
            message: "Xizmat ma'lumotlari muvaffaqiyatli yangilandi!",
            updatedService
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

// Xizmatni o'shirish
exports.deleteService = async (req, res) => {
    try {
        const { params: { id } } = req

        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                error: "ID haqiqiy emas!"
            })
        }

        const service = await serviceModel.findById(id)

        if (!service) {
            return res.status(404).send({
                error: "Xizmat topilmadi!"
            })
        }

        await serviceModel.findByIdAndDelete(id)

        return res.status(200).send({
            message: "Xizmat muvaffaqiyatli o'chirildi!"
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