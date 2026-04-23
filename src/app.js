const express = require("express");
require("./db");

const urlRoutes = require("./routes/urlRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("URL Shortener API is running");
});

app.use("/", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});