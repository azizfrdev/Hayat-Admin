const { patientModel } = require("../models/patientModel");
const { validationResult, matchedData } =require('express-validator')
const bcrypt = require('bcrypt')

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

        const result = await patientModel.findOne({orderNumber: data.orderNumber})

        if (!result) {
            return res.status(404).send({
                error: "Natija topilmadi!"
            })
        }

        const checkanalysiscode = await bcrypt.compare(data.analysiscode, result.analysiscode)

        if (!checkanalysiscode) {
            return res.status(401).send({
                error: "Yozilgan kod xato!"
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