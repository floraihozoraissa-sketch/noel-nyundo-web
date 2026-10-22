
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "C.S. Noël Nyundo API is running!",
  });
});

module.exports = router;
