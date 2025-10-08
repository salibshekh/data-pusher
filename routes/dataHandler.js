const express = require('express');
const router = express.Router();
const dataCtrl = require('../controllers/dataHandlerController');
const rateLimiter = require('../middleware/rateLimiter');

router.post('/server/incoming_data', rateLimiter, dataCtrl.incoming);

module.exports = router;
