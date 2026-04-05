const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
    certificateID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dateOfIssue: { type: String, required: true }
});

module.exports = mongoose.model('Certificate', CertificateSchema);