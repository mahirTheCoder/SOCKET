const express = require("express");
const router = express.Router();
const { sendMessage } = require("../../controller/send_msg");

router.post('/send' , sendMessage)


module.exports = router;