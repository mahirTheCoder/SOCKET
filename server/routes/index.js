const express = require("express");
const router = express.Router();

const baseUrl = process.env.BASE_URL;

const messageRoute = require("./massage_route");

router.use(baseUrl, messageRoute);

module.exports = router;