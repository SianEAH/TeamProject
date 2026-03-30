const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");
const Employer = require("../models/Employer");

router.post("/", async (req, res) => {
  const { referenceID, password, role } = req.body; //will allow us to handle both

  try {
    // Checking if employee exists in the DB
    let user = await Employee.findOne({ referenceID });
    if (!user) {
      return res.status(400).json({ message: "Invalid Reference ID" });
    } else if (role === "employer") { //Sian
      user = await Employer.findOne({ companyID: referenceID });
      if (!user) {
        return res.status(400).json({ message: "Invalid Company ID" });
  } else {
    return res.status(400).json({ message: "Invalid role" });
  }
}
  //End of Sian's code

    // Checking password by matching the strings
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // Creating the JWT Payload
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        jobTitle: user.jobTitle,
        completed: user.completedModules,
        role: role, //Sian
      },
    };

    // Signing the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'BreakRoom_082406',
      { expiresIn: "2h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Sending the token back to the user
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
