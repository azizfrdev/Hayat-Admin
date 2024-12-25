const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    uz_name: String,
    ru_name: String,
    en_name: String,
    age: Number,
    email: String,
    analysis: String,
    orderNumber: String,
    analysiscode: String
})

exports.patientModel = mongoose.model('Patient', patientSchema)