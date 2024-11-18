const { newsModel } = require('../models/newsModel')
const { validationResult, matchedData } = require('express-validator')

// Yangilik yaratish
exports.createNews = async (req, res) => {
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

        const news = await newsModel.create({
            title: data.title,
            description: data.description
        })

        return res.status(200).send({
            message: "Yangilik muvaffaqiyatli yaratildi!",
            news
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

// Hamma yangiliklarni olish
exports.getAllNews = async (req, res) => {
    try {
        const news = await newsModel.find()

        if (!news.length) {
            return res.status(404).send({
                error: "Yangiliklar mavjud emas!"
            })
        }

        return res.status(200).send({
            message: "Yangiliklar jadvali!",
            news
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

// Bitta yangilini ko'rish
exports.getOneNews = async (req, res) => {
    try {
        const { params: { id } } = req

        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                error: "ID haqiqiy emas!"
            })
        }

        const news = await newsModel.findById(id)

        if (!news) {
            return res.status(404).send({
                error: "Yangilik topilmadi!"
            })
        }

        return res.status(200).send({
            message: "Yangilik!",
            news
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

// Yangilik ma'lumotlarini yangilash
exports.updateNews = async (req, res) => {
    try {
        const { params: { id } } = req

        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                error: "ID haqiqiy emas!"
            })
        }

        const news = await newsModel.findById(id)

        if (!news) {
            return res.status(404).send({
                error: "Yangilik topilmadi!"
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

        const updatedNews = {
            title: data.title || news.title,
            description: data.description || news.description
        }

        await newsModel.findByIdAndUpdate(id, updatedNews)

        return res.status(200).send({
            message: "Yangilik ma'lumotlari muvaffaqiyatli yangilandi!",
            updatedNews
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

// Yangilini o'chirish
exports.deleteNews = async (req, res) => {
    try {
        const { params: { id } } = req

        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                error: "ID haqiqiy emas!"
            })
        }

        const news = await newsModel.findById(id)

        if (!news) {
            return res.status(404).send({
                error: "Yangilik topilmadi!"
            })
        }

        await newsModel.findByIdAndDelete(id)

        return res.status(200).send({
            message: "Yangilik muvaffaqiyatli o'chirildi!"
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