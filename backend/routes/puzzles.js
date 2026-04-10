const express = require('express');
const router = express.Router();

// Temporary route to stop the server from crashing
router.get('/test', (req, res) => {
    res.send('Route is working');
});

//Hamza
//Station 404 Breach - final code verification
const { verifyFinalCode } = require('../controllers/networkBreach');
router.post('/networkBreach/verify', verifyFinalCode);

module.exports = router;