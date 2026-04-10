//Sian
const express = require("express");
const router = express.Router();
const Employer = require("../models/Employer"); //need the Employer database model

router.post("/", async (req, res) => {
    const { companyName, companyID, email, password } = req.body; //what I'm taking in

    //Check that all the fields are filled in, they must be
    if (!companyName || !companyID || !email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    try {
        //See if that company/employer already has an account
        let existing = await Employer.findOne({ companyID });

        //if they do
        if (existing) {
            return res.status(400).json({ message: "Company already exists" });
        }

        //If they don't exist, create a new employer entry
        const newEmployer = new Employer({
            companyName,
            companyID,
            email,
            password
        });

        await newEmployer.save(); //save it

        //send a message back
        res.status(201).json({ message: "Employer registered successfully" });

    } catch (err) { //error catching
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;