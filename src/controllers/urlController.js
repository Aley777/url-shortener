const db = require("../db");

function generateShortCode(length = 6) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortCode = "";

  for (let i = 0; i < length; i++) {
    shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return shortCode;
}

exports.createShortUrl = (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({
      error: "originalUrl is required",
    });
  }

  const shortCode = generateShortCode();
  const query = `INSERT INTO urls (original_url, short_code) VALUES (?, ?)`;

  db.run(query, [originalUrl, shortCode], function (err) {
    if (err) {
      return res.status(500).json({
        error: "Database error",
        details: err.message,
      });
    }

    res.status(201).json({
      message: "Short URL created successfully",
      originalUrl,
      shortCode,
      shortUrl: `http://localhost:3000/${shortCode}`,
    });
  });
};

exports.redirectToUrl = (req, res) => {
  const { code } = req.params;

  const query = `SELECT original_url FROM urls WHERE short_code = ?`;

  db.get(query, [code], (err, row) => {
    if (err) {
      return res.status(500).json({
        error: "Database error",
      });
    }

    if (!row) {
      return res.status(404).json({
        error: "Short URL not found",
      });
    }

    res.redirect(row.original_url);
  });
};