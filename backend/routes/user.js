const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// get real data for certificate
router.get('/certificate/:moduleName', async (req, res) => {
    try {
        const { moduleName } = req.params;
        const refID = req.query.referenceID; 

        const user = await Employee.findOne({ referenceID: refID });

        if (!user) return res.status(404).json({ msg: "User not found" });

        // Building the "certData" object the JS expects
        const certData = {
            employeeName: user.name,
            moduleName: moduleName,
            issueDate: new Date().toLocaleDateString(),
            // Generating a unique ID: ReferenceID + ModuleName + Year
            certificateId: `CERT-${user.referenceID}-${moduleName.toUpperCase().substring(0,3)}-2026`
        };

        res.json(certData);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

//update module status route dynamically
//Sian
router.get('/', async (req, res) => {
    try {
        const referenceID = req.query.referenceID;

        const user = await Employee.findOne({ referenceID });

        //error handling
        if (!user) return res.status(404).json({ msg: "User not found" });

        let modules = user.completedModules; //let the modules = to the user's completed modules

        //issue discovered by created account's module data type
        //has to be an array
        if(!Array.isArray(modules)) {
            modules = modules ? [modules] : []; //check if it's an object or if it's empty
        }

        //the default modules in the Array
        const defaultModules = ["Customer Service", "Fire Safety", "First Aid"];

        defaultModules.forEach(name => {
            if(!modules.find(m => m.moduleName === name)) {
                modules.push({ moduleName: name, status: "incomplete"}); //push the status for the module names, to overwrite what's already been created
            }
        });

        res.json({ completed: modules }); //sending my data back

    } catch (err) { //error handling
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.post('/start', async (req, res) => {
    try {
        const { moduleName, referenceID } = req.body;

        const user = await Employee.findOne({ referenceID });

        //error handling
        if (!user) return res.status(404).json({ msg: "User not found" });

        let modules = []; //modules starts as an empty Array

        //Checking what type it is in order to send the data (Array/Object)
        if(Array.isArray(user.completedModules)) {
            modules = user.completedModules;
        } else if(user.completedModules) {
            modules = [user.completedModules];
        }

        //Does the module already exist
        const existing = modules.find(m => m.moduleName === moduleName);

        if (existing) {
            existing.status = "in-progress"; //if it does, push this status
        } else {
            modules.push({ moduleName, status: "in-progress"}); //if it doesn't, push the module & the status
        }

        user.completedModules = modules;
        user.markModified('completedModules'); //letting the database know there is a change
                                               //Mongoose: markModified ensures changes to nested objects/arrays are saved
                                               //https://mongoosejs.com/docs/5.x/docs/api/document.html#document_Document-markModified

        await user.save();

        res.json({ message: "Updated"});

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;