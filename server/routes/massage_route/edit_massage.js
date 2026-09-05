const express = require("express");
const router = express.Router();
const { editMessage } = require("../../controller/edit_msg");

router.put("/edit-massage/:messageId", editMessage);

module.exports = router;