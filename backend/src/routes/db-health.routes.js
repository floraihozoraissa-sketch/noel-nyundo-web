
const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { error } = await supabase
      .from("notices")
      .select("id", { head: true, count: "exact" });

    if (error) {
      console.error("Supabase health check failed:", error.code);

      return res.status(503).json({
        success: false,
        message: "Database connection check failed.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Supabase connection is working.",
    });
  } catch {
    return res.status(503).json({
      success: false,
      message: "Database service is unavailable.",
    });
  }
});

module.exports = router;
