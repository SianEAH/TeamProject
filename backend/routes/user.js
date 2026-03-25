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

module.exports = router;