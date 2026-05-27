
const express = require("express");

const { createNewShortURL } = require("../controllers/url");
const router = express.Router();

router.post("/", createNewShortURL);

module.exports = router;