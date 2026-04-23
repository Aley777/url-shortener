const express = require("express");
const router = express.Router();
const {
  createShortUrl,
  redirectToUrl,
  getUrlStats,
} = require("../controllers/urlController");

router.post("/shorten", createShortUrl);
router.get("/stats/:code", getUrlStats);
router.get("/:code", redirectToUrl);

module.exports = router;