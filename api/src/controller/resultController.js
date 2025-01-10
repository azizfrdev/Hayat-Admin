const { validationResult, matchedData } = require("express-validator");
const { patientModel } = require("../models/patientModel");


// Bemorga tahlil natijasini ko'rsatish
exports.getResult = async (req, res) => {
    try {
        // error bilan ishlash
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({
                error: errors.array().map((error) => error.msg),
            });
        }
        const data = matchedData(req);


        const result = await patientModel.findOne({
            orderNumber: data.orderNumber,
            verificationCode: data.verificationCode
        }).populate({
            path: 'analysisResults',
            populate: {
                path: 'doctor',
                model: 'Doctor'
            }
        })

        if (!result) {
            return res.status(404).send({
                error: "Kiritilgan buyurtma raqami yoki tekshirish kodi noto'g'ri!"
            })
        }

        return res.status(200).send({
            message: "Tahlil natijasi!",
            result: result
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