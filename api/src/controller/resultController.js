const { patientModel } = require("../models/patientModel");


// Bemorga tahlil natijasini ko'rsatish
exports.getResult = async (req, res) => {
    try {
        const orderNumber = req.query.orderNumber;
        const verificationCode = req.query.verificationCode

        if (!orderNumber || !verificationCode) {
            return res.status(400).send({
                error: "Iltimos, buyurtma raqami va tekshirish kodini kiriting!"
            })
        }

        const result = await patientModel.findOne({
            orderNumber: orderNumber,
            verificationCode: verificationCode
        }).populate({
            path: "analysisResults",
            populate: {
                path: "doctor",
                model: "Doctor",
            }
        })

        if (!result) {
            return res.status(404).send({
                error: "Kiritilgan buyurtma raqami yoki tekshirish kodi noto'g'ri!",
            });
        }

        return res.status(200).send({
            message: "Tahlil natijasi!",
            result: result,
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
}
