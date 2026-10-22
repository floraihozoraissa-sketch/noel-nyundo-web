
const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

// GET /api/v1/notices
// Public: return published notices only.
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("notices")
      .select(
        "id, title, slug, summary, body, published_at, created_at"
      )
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Notices query failed:", error.code);

      return res.status(503).json({
        success: false,
        message: "Unable to retrieve notices.",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch {
    return res.status(503).json({
      success: false,
      message: "Unable to retrieve notices.",
    });
  }
});

// GET /api/v1/notices/:slug
// Public: return one published notice.
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  if (
    slug.length > 220 ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid notice slug.",
    });
  }

  try {
    const { data, error } = await supabase
      .from("notices")
      .select(
        "id, title, slug, summary, body, published_at, created_at"
      )
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      console.error("Notice query failed:", error.code);

      return res.status(503).json({
        success: false,
        message: "Unable to retrieve the notice.",
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Notice not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch {
    return res.status(503).json({
      success: false,
      message: "Unable to retrieve the notice.",
    });
  }
});

module.exports = router;
