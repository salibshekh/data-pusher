const express = require('express');
const router = express.Router();
const accountCtrl = require('../controllers/accountController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, accountCtrl.createAccount);
router.get('/:id', authMiddleware, accountCtrl.getAccount);
router.delete('/:id', authMiddleware, accountCtrl.deleteAccount);

module.exports = router;
