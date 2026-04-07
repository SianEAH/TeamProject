/*Creating an new employee when assigning a module in the Employer dashboard*/
/*Sian*/

const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

/*Create*/
router.post("/create", async (req, res) => {
  const { referenceID, password, name, email, jobTitle } = req.body;

  try {
    //check if already exists
    let existing = await Employee.findOne({ referenceID });
    //if it does
    if (existing) {
      existing.password = password;
      await existing.save(); //save it

      return res.json({
        message: "Password reset",
        referenceID,
        password
      });
    }
    //create the new employee login
    const newEmployee = new Employee({
      referenceID,
      password,
      name,
      email,
      jobTitle,
      completedModules: [] /*empty array for completedModules*/
    });

    await newEmployee.save(); /*save it*/

    res.json({
      message: "Employee created",
      referenceID,
      password
    });

  } catch (err) { /*error handing*/
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;