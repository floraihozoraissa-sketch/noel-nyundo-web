
const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const requireStaff = require("../middleware/requireStaff");

const router = express.Router();

router.get(
  "/",
  requireAuth,
  requireStaff(),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Staff authorization successful.",
      data: {
        fullName: req.staff.full_name,
        role: req.staff.role,
      },
    });
  }
);

router.get(
  "/admin",
  requireAuth,
  requireStaff(["admin"]),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Administrator authorization successful.",
      data: {
        fullName: req.staff.full_name,
        role: req.staff.role,
      },
    });
  }
);

module.exports = router;
