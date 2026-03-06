const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
//employer needs to be added

router.post('/', async (req, res) => {
    const { referenceID, password } = req.body;

    try {
        // Checking if employee exists in the DB
        let user = await Employee.findOne({ referenceID });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Reference ID' });
        }

        // Checking password by matching the strings
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid Password' });
        }

        // Creating the JWT Payload
        const payload = {
            user: { id: user.id }
        };

        // Signing the token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '2h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Sending the token back to the user
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;