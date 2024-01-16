const express = require('express');
const { CheckoutSession} = require('../controller/Subscription');

const router = express.Router();
//login route
router.post("/checkout",CheckoutSession);



// Match the raw body to content type application/json
// If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body




module.exports = router;