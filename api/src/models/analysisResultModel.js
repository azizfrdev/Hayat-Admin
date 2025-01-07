const mongoose = require('mongoose');

const analysisResultSchema = new mongoose.Schema({
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
    analysisType: String,
    analysisResult: String,
    diagnosis: String,
    treatment: String,
}, {timestamps: true});

exports.analysisResultModel = mongoose.model('AnalysisResult', analysisResultSchema);