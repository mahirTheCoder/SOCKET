const express = require("express");
const router = express.Router();
const { deleteMessage } = require("../../controller/del_msg");

router.delete("/del-massage/:messageId", deleteMessage);

module.exports = router;