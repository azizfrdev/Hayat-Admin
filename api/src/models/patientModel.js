const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    fullName: String,
    age: Number,
    email: String,
    analysis: String,
    orderNumber: String,
    analysiscode: String
})

exports.patientModel = mongoose.model('Patient', patientSchema)