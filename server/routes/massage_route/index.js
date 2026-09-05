const express = require("express");
const router = express.Router();

const getMsg = require("./get_massage");
const sendMsg = require("./send_massage");
const editMsg = require("./edit_massage");
const delMsg = require("./delete_massage");

router.use("/massage", getMsg);
router.use("/massage", sendMsg);
router.use("/massage", editMsg);
router.use("/massage", delMsg);

module.exports = router;