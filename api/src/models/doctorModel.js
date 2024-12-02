const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    password: String,
    experience: String,
    position: String,
    category: String,
    description: String,
    image: String,
    service: String,
    role: {type: String, default: 'doctor'}
}, {timestamps: true})

exports.doctorModel = mongoose.model('Doctor', doctorSchema)