const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    title: String,
    description: String,
}, {timestamps: true})

exports.newsModel = mongoose.model('News', newsSchema)