const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
    fullName: String,
    position: String,
    description: String
}, {timestamps: true})

exports.staffModel = mongoose.model('Staff', staffSchema)