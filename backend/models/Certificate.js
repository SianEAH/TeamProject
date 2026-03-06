const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
    certificateID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dateOfIssue: { type: String, required: true }
    //add a module name here
});

module.exports = mongoose.model('Certificate', CertificateSchema);