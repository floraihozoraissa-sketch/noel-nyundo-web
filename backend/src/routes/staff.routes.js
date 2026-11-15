const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const requireStaff = require("../middleware/requireStaff");

const router = express.Router();

router.get(
  "/profile",
  requireAuth,
  requireStaff(),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Staff profile retrieved successfully.",
      data: {
        fullName: req.staff.full_name,
        role: req.staff.role,
      },
    });
  }
);

module.exports = router;