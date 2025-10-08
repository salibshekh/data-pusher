const express = require('express');
const router = express.Router();
const amCtrl = require('../controllers/accountMemberController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, amCtrl.addMember);
router.get('/:accountId', authMiddleware, amCtrl.listMembers);

module.exports = router;
