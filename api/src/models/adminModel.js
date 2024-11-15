const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    role: {type: String, default: 'admin'},
}, {timestamps: true})

exports.adminModel = mongoose.model('Admin', adminSchema)