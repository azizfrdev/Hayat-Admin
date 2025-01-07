const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: String,
    date_of_birth: Number,
    gender: String,
    email: String,
    orderNumber: Number,
    verificationCode: String,
    analysisResults: [{type: mongoose.Schema.Types.ObjectId, ref: 'AnalysisResult'}]
})

exports.patientModel = mongoose.model('Patient', patientSchema)