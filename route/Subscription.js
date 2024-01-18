const express = require('express');
const { CheckoutSession} = require('../controller/Subscription');

const router = express.Router();
//login route
router.post("/checkout",CheckoutSession);
module.exports = router;