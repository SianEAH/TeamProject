const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    referenceID: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //completedModules: { type: Number, default: 0 },
    completedModules: {
        type: [ //needs to be an array type
            {
                moduleName: String,
                status: String   
            }
        ],
        default: [] //ensures new users will be created with an empty array
    },
     name: { type: String, required: true },
    email: { type: String, required: true },
    jobTitle: { type: String, required: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);