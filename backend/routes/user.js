const express = require('express');
const router = express.Router();

// Temporary route to stop the server from crashing
router.get('/test', (req, res) => {
    res.send('Route is working');
});

module.exports = router;