const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    referenceID: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    completedModules: { //modules needs to be of Array type
        type: [
            {
                moduleName: String,
                status: String   
            }
        ],
        default: []
    },

    //certificates need to be in Array
    certificates: {
        type: [
            {
                moduleName: String,
                score: Number,
                date: String,
                certificateId: String
            }
        ],
        default: []
    },

    name: { type: String, required: true },
    email: { type: String, required: true },
    jobTitle: { type: String, required: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);