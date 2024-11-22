const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    fullName: String,
    age: Number,
    email: String,
    analysis: String,
    code: String
})

exports.patientModel = mongoose.model('Patient', patientSchema)