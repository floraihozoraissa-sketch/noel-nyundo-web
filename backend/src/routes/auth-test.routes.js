const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", requireAuth, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Authentication successful.",
    data: {
      userId: req.user.id,
      email: req.user.email,
    },
  });
});

module.exports = router;