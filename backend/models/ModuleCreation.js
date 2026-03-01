const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    passingMark: { type: Number, required: true } 
});

module.exports = mongoose.model('ModuleCreation', ModuleSchema);