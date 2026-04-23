const express = require("express");
const router = express.Router();
const {
  createShortUrl,
  redirectToUrl,
} = require("../controllers/urlController");

router.post("/shorten", createShortUrl);

// 🔥 bu önemli
router.get("/:code", redirectToUrl);

module.exports = router;