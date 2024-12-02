require('dotenv').config()
const { validationResult, matchedData } = require('express-validator')
const { patientModel } = require('../models/patientModel')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

// Bemor yaratish
exports.createPatient = async (req, res) => {
    try {
        const generateRandomCode = () => Math.floor(100000 + Math.random() * 900000);

        const generateThreeDigitCode = () => Math.floor(100 + Math.random() * 900);

        const ordernumber = generateThreeDigitCode()
        const code = generateRandomCode()

        console.log(code);

        // Transporter sozlash (Gmail uchun)
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.User_Email,
                pass: process.env.User_Pass
            },
        });


        const hashedcode = await bcrypt.hash(code.toString(), 10)

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
            orderNumber: ordernumber,
            analysiscode: hashedcode
        })

        // HTML email shabloni
        const mailOptions = {
            from: '"Hayat Med" <avazbekqalandarov03@gmail.com>',
            to: 'qalandarovavazbek1@gmail.com',
            subject: "Tasdiqlash kodi",
            html: `
        <html>
<head>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #6c5ce7, #0984e3);
            color: #fff;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
        }

        .container {
            max-width: 600px;
            width: 100%;
            background: #fff;
            border-radius: 20px;
            padding: 50px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            text-align: center;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .container:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 40px rgba(0, 0, 0, 0.2);
        }

        h1 {
            font-size: 3em;
            font-weight: 700;
            color: #0984e3;
            margin-bottom: 30px;
            letter-spacing: 1px;
        }

        p {
            font-size: 1.6em; /* Kattalashgan matn */
            line-height: 1.8;
            color: #2d3436;
            margin: 15px 0;
        }

        p strong {
            color: #0984e3;
            font-weight: bold;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .container {
                padding: 25px; /* Telefon uchun bo‘shliqlarni kichraytirish */
            }

            h1 {
                font-size: 2.4em; /* Telefon uchun sarlavhani kichraytirish */
            }

            p {
                font-size: 1.4em; /* Telefon uchun matnni kichraytirish */
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 20px; /* Yana kichik telefonlar uchun bo‘shliq */
            }

            h1 {
                font-size: 2.2em; /* H1 kichraytirish */
            }

            p {
                font-size: 1.3em; /* P matnini yana kichraytirish */
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Tasdiqlash kodi</h1>
        <p><strong>Buyurtma raqami:</strong> ${ordernumber}</p>
        <p><strong>Tasdiqlash kodi:</strong> ${code}</p>
    </div>
</body>
</html>

    `,
        };

        // Email yuborish
        transporter.sendMail (mailOptions, (error, info) => {
            if (error) {
                console.log('Xatolik yuz berdi:', error);
                return res.status(500).json({ message: 'Xatolik yuz berdi!' });
            }
            return res.status(200).send({
                message: "Bemor muvaffaqiyatli yaratildi va emailga yuborldi!",
                patient
            })
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

exports.searchPatient = async (req, res) => {
    try {
        const data = await patientModel.find(
            {
                "$or": [
                    { fullName: { $regex: req.params.key } },
                    { email: { $regex: req.params.key } }
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