const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    role: {type: String, default: 'patient'},
    data_of_brith: Date,
    phone_number: Number,
    services: {type: mongoose.Schema.Types.ObjectId, ref: 'Services'},
    analysis_results: String,
    order_number: Number,
    code: Number
}, {timestamps: true})

exports.userModel = mongoose.model('Patient', patientSchema)