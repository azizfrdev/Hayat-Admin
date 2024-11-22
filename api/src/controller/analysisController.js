const { patientModel } = require("../models/patientModel");
const { validationResult, matchedData } =require('express-validator')

// Bemorga tahlil natijasini ko'rsatish
exports.getAnalysis = async (req, res) => {
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
        if (Object.keys(data).length === 0) {
            return res.status(404).send({
                error: "Ma'lumotlar topilmadi!"
            })
        }        

        const result = await patientModel.findOne({code: data.code})

        if (!result) {
            return res.status(404).send({
                error: "Natija topilmadi!"
            })
        }

        return res.status(200).send({
            message: "Tahlil natijasi!",
            result: result.analysis
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