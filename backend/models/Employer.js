//Sian
const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema ( {
    companyID: {
        type: String,
        required: true,
        unique: true
    },

    companyName: {
        type: String,
        required: true
    },
    
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Employer', EmployerSchema);