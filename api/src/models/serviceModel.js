const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    name: String,
    title: String,
    description: String,
}, {timestamps: true})

exports.serviceModel = mongoose.model('Service', serviceSchema)