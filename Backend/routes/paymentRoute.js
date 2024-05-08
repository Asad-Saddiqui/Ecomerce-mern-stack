const express = require('express');
const router = express();
const paymentController = require('../controller/paymentController');
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const validateRequestBody = require('../middlewares/paymentBodyMiddleware');
router.get('/', authMiddleware, paymentController.renderBuyPage);
router.post('/pay', authMiddleware, validateRequestBody, paymentController.payProduct);
// router.get('/success', authMiddleware, paymentController.successPage);
// router.get('/cancel', authMiddleware, paymentController.cancelPage);

module.exports = router;