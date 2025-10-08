const express = require('express');
const router = express.Router();
const logCtrl = require('../controllers/logController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, logCtrl.listLogs);

module.exports = router;
