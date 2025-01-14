const { patientModel } = require("../models/patientModel");
const PDFDocument = require('pdfkit')
const path = require('path')
const fs = require('fs')


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

exports.downloadResult = async (req, res) => {
    try {
        const { orderNumber, verificationCode } = req.query

        if (!orderNumber || !verificationCode) {
            return res.status(400).send({ error: "Iltimos, buyurtma raqami va tekshirish kodini kiriting!" })
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
        });

        if (!result) {
            return res.status(404).send({ error: "Kiritilgan buyurtma raqami yoki tekshirish kodi noto'g'ri!" });
        }

        const doc = new PDFDocument();
        const fileName = 'tahlil_natijasi.pdf'

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename: ${fileName}`)

        doc.pipe(res)

        doc.fillColor("#004080").fontSize(20).text('Tahlil Natijasi', { align: "center" })

        doc.fillColor("#000000").fontSize(16).text(`\nF.I.SH: ${result.name}`, { align: 'left' });
        doc.text(`Tug'ilgan sana: ${result.date_of_birth}`);
        doc.text(`Jinsi: ${result.gender}`);
        doc.moveDown()

        doc.fillColor("#004080").fontSize(18).text('Tahlillar:', { align: 'center' })

        const fontPath = path.join(__dirname, '../public/fonts/Roboto-VariableFont_wdth,wght.ttf');

        const pageHeight = 750; // PDF sahifasining bo‘yi (standart uchun)
        let yPosition = doc.y; // Hozirgi vertikal pozitsiya

        result.analysisResults.forEach(analysis => {
            const textHeight = 120; // Har bir tahlil uchun taxminiy balandlik

            // Agar matn sahifaga sig‘masa, yangi sahifa qo‘shish
            if (yPosition + textHeight > pageHeight) {
                doc.addPage();
                yPosition = doc.y; // Yangi sahifa boshlanishi
            }

            doc.fillColor("#000000").font(fontPath).fontSize(16).text(`\nBo'lim: ${analysis.section}`);
            doc.text(`Tahlil: ${analysis.analysisType}`);
            doc.text(`Natija: ${analysis.analysisResult}`);
            doc.text(`Tashxis: ${analysis.diagnosis}`);
            doc.text(`Maslahat: ${analysis.recommendation}`);
            doc.text(`Shifokor: ${analysis.doctor.uz_name}`);
            doc.text(`Lavozimi: ${analysis.doctor.uz_position}`);
            doc.text(`Shifokorning telefon raqami: ${analysis.doctor.phoneNumber}`);
            doc.moveDown()
        })

        doc.end()

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