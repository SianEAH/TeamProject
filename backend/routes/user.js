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

        //Save certificate to user
        //If there's no certificates, empty array
        if (!user.certificates) {
        user.certificates = [];
        }

        //Checking for duplicates
        const exists = user.certificates.find(
        c => c.moduleName === moduleName
        );

        if (!exists) {
        user.certificates.push({
            moduleName,
            score: 100, //or pass real score later
            date: new Date().toLocaleDateString(),
            certificateId: certData.certificateId
        });

        user.markModified("certificates"); //tell mongodb there's an update
        await user.save(); //save
        }

        res.json(certData);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

//fetching all the certs for the Employer dashboard
//Sian
router.get("/all-certificates", async (req, res) => {
  try {
    const employees = await Employee.find();

    const allCerts = []; //empty Array
    //looping
    employees.forEach(emp => {
      if (emp.certificates && emp.certificates.length > 0) {
        emp.certificates.forEach(cert => {
          allCerts.push({
            employeeName: emp.name,
            referenceID: emp.referenceID,
            moduleName: cert.moduleName,
            score: cert.score,
            date: cert.date,
            certificateId: cert.certificateId
          });
        });
      }
    });

    res.json(allCerts);

  } catch (err) { //error handling
    console.error(err);
    res.status(500).send("Server error");
  }
});

//update module status route dynamically (for logged in accounts)
//Sian
//in-complete modules
router.get('/', async (req, res) => {
    try {
        const referenceID = req.query.referenceID;

        const user = await Employee.findOne({ referenceID });

        //error handling (if not user is found)
        if (!user) return res.status(404).json({ msg: "User not found" });

        let modules = user.completedModules; //let the modules = to the user's completed modules

        //issue discovered by created account's module data type
        //has to be an array
        if(!Array.isArray(modules)) {
            modules = modules ? [modules] : []; //check if it's an object or if it's empty
        }

        //the default modules in the Array
        const defaultModules = ["Customer Service", "Fire Safety", "First Aid"];

        //loop through the dummy created account
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

//changing the module status to complete
router.post("/complete", async (req, res) => {
  const { moduleName, referenceID } = req.body;

  try {
    const user = await Employee.findOne({ referenceID });

    //if the user can't be found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //trim and lower case to prevent bugs
    const module = user.completedModules.find(m => m.moduleName.toLowerCase().trim() === moduleName.toLowerCase().trim());

    //if there is no module
    if(!module) {
        return res.status(404).json({ message: "Module not found"});
    }

    module.status = "complete"; //change the status to complete

    user.markModified('completedModules'); //let MongoDB know of the change

    await user.save(); //save it

    res.json({ message: "Module marked as complete" });

  } catch (err) { //error handling
    console.error(err);
    res.status(500).json({ message: "Error updating module status" });
  }
});

//in-progress modules
router.post('/start', async (req, res) => {
    try {
        const { moduleName, referenceID } = req.body;

        const user = await Employee.findOne({ referenceID });

        //error handling (no user)
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

        await user.save(); //save it

        res.json({ message: "Updated"});

    } catch (err) { //error handling
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;