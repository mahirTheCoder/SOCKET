const express = require("express");
const router = express.Router();
const { getMessages } = require("../../controller/get_Massge");

router.get('/get-maggase', getMessages)

module.exports = router;