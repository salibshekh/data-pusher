const express = require('express');
const router = express.Router();
const destCtrl = require('../controllers/destinationController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, destCtrl.createDestination);
router.get('/account/:accountId', authMiddleware, destCtrl.listForAccount);
router.put('/:id', authMiddleware, destCtrl.updateDestination);
router.delete('/:id', authMiddleware, destCtrl.deleteDestination);

module.exports = router;
