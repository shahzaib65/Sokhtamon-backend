const express = require('express');
const {uploadContactUs,fetchContacts} = require('../controller/Contact');
const router = express.Router();
//login route
router.post("/upload",uploadContactUs);
router.get("/fetch",fetchContacts)
module.exports = router;