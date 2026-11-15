
const express = require("express");

const supabase = require("../config/supabase");
const requireAuth = require("../middleware/requireAuth");
const requireStaff = require("../middleware/requireStaff");

const router = express.Router();

const NOTICE_FIELDS =
  "id, title, slug, summary, body, status, published_at, created_by, updated_by, created_at, updated_at";

const STAFF_ROLES = ["admin", "editor"];

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// ------------------------------
// Helpers
// ------------------------------

function createSlug(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 220)
    .replace(/-+$/g, "");
}

function isValidText(value, min, max) {
  return (
    typeof value === "string" &&
    value.trim().length >= min &&
    value.trim().length <= max
  );
}

function handleDatabaseError(error, res, fallbackMessage) {
  console.error("Notices database error:", error.code);

  if (error.code === "23505") {
    return res.status(409).json({
      success: false,
      message: "A notice with this slug already exists.",
    });
  }

  if (error.code === "23514" || error.code === "22P02") {
    return res.status(400).json({
      success: false,
      message: "The supplied notice data is invalid.",
    });
  }

  return res.status(503).json({
    success: false,
    message: fallbackMessage,
  });
}

// ------------------------------
// PUBLIC ROUTES
// ------------------------------

// GET /api/v1/notices
// Return published notices only.
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
      return handleDatabaseError(
        error,
        res,
        "Unable to retrieve notices."
      );
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Notices retrieval failed:", error.message);

    return res.status(503).json({
      success: false,
      message: "Unable to retrieve notices.",
    });
  }
});

// GET /api/v1/notices/manage
// Admin and editor: retrieve all notices.
router.get(
  "/manage",
  requireAuth,
  requireStaff(STAFF_ROLES),
  async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("notices")
        .select(NOTICE_FIELDS)
        .order("created_at", { ascending: false });

      if (error) {
        return handleDatabaseError(
          error,
          res,
          "Unable to retrieve notices."
        );
      }

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error("Notice management retrieval failed:", error.message);

      return res.status(503).json({
        success: false,
        message: "Unable to retrieve notices.",
      });
    }
  }
);

// GET /api/v1/notices/:slug
// Return one published notice.
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  if (slug.length > 220 || !SLUG_REGEX.test(slug)) {
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
      return handleDatabaseError(
        error,
        res,
        "Unable to retrieve the notice."
      );
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
  } catch (error) {
    console.error("Notice retrieval failed:", error.message);

    return res.status(503).json({
      success: false,
      message: "Unable to retrieve the notice.",
    });
  }
});

// ------------------------------
// STAFF MANAGEMENT ROUTES
// ------------------------------

// POST /api/v1/notices
// Admin and editor: create a notice.
router.post(
  "/",
  requireAuth,
  requireStaff(STAFF_ROLES),
  async (req, res) => {
    const { title, summary, body, status = "draft" } = req.body;

    if (!isValidText(title, 3, 200)) {
      return res.status(400).json({
        success: false,
        message: "Title must contain between 3 and 200 characters.",
      });
    }

    if (
      summary !== undefined &&
      summary !== null &&
      !isValidText(summary, 0, 500)
    ) {
      return res.status(400).json({
        success: false,
        message: "Summary cannot exceed 500 characters.",
      });
    }

    if (!isValidText(body, 1, 100000)) {
      return res.status(400).json({
        success: false,
        message: "Notice body is required.",
      });
    }

    if (!["draft", "published"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "New notices must be draft or published.",
      });
    }

    const slug = createSlug(title);

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Unable to generate a valid notice slug.",
      });
    }

    const now = new Date().toISOString();

    const notice = {
      title: title.trim(),
      slug,
      summary: summary?.trim() || null,
      body: body.trim(),
      status,
      published_at: status === "published" ? now : null,
      created_by: req.user.id,
      updated_by: req.user.id,
      created_at: now,
      updated_at: now,
    };

    try {
      const { data, error } = await supabase
        .from("notices")
        .insert(notice)
        .select(NOTICE_FIELDS)
        .single();

      if (error) {
        return handleDatabaseError(
          error,
          res,
          "Unable to create notice."
        );
      }

      return res.status(201).json({
        success: true,
        message: "Notice created successfully.",
        data,
      });
    } catch (error) {
      console.error("Notice creation failed:", error.message);

      return res.status(503).json({
        success: false,
        message: "Unable to create notice.",
      });
    }
  }
);

// PATCH /api/v1/notices/:id
// Admin and editor: update notice content.
router.patch(
  "/:id",
  requireAuth,
  requireStaff(STAFF_ROLES),
  async (req, res) => {
    const { id } = req.params;
    const { title, summary, body } = req.body;

    if (!UUID_REGEX.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notice ID.",
      });
    }

    const updates = {};

    if (title !== undefined) {
      if (!isValidText(title, 3, 200)) {
        return res.status(400).json({
          success: false,
          message: "Title must contain between 3 and 200 characters.",
        });
      }

      updates.title = title.trim();

      const newSlug = createSlug(title);

      if (!newSlug) {
        return res.status(400).json({
          success: false,
          message: "Unable to generate a valid notice slug.",
        });
      }

      updates.slug = newSlug;
    }

    if (summary !== undefined) {
      if (
        summary !== null &&
        !isValidText(summary, 0, 500)
      ) {
        return res.status(400).json({
          success: false,
          message: "Summary cannot exceed 500 characters.",
        });
      }

      updates.summary = summary?.trim() || null;
    }

    if (body !== undefined) {
      if (!isValidText(body, 1, 100000)) {
        return res.status(400).json({
          success: false,
          message: "Notice body cannot be empty.",
        });
      }

      updates.body = body.trim();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields were provided for updating.",
      });
    }

    updates.updated_by = req.user.id;
    updates.updated_at = new Date().toISOString();

    try {
      const { data, error } = await supabase
        .from("notices")
        .update(updates)
        .eq("id", id)
        .select(NOTICE_FIELDS)
        .maybeSingle();

      if (error) {
        return handleDatabaseError(
          error,
          res,
          "Unable to update notice."
        );
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Notice not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Notice updated successfully.",
        data,
      });
    } catch (error) {
      console.error("Notice update failed:", error.message);

      return res.status(503).json({
        success: false,
        message: "Unable to update notice.",
      });
    }
  }
);

// PATCH /api/v1/notices/:id/status
// Admin and editor: publish, unpublish or archive a notice.
router.patch(
  "/:id/status",
  requireAuth,
  requireStaff(STAFF_ROLES),
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!UUID_REGEX.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notice ID.",
      });
    }

    if (!["draft", "published", "archived"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notice status.",
      });
    }

    try {
      const { data: existing, error: lookupError } = await supabase
        .from("notices")
        .select("id, published_at")
        .eq("id", id)
        .maybeSingle();

      if (lookupError) {
        return handleDatabaseError(
          lookupError,
          res,
          "Unable to retrieve notice."
        );
      }

      if (!existing) {
        return res.status(404).json({
          success: false,
          message: "Notice not found.",
        });
      }

      const updates = {
        status,
        updated_by: req.user.id,
        updated_at: new Date().toISOString(),
      };

      if (status === "published" && !existing.published_at) {
        updates.published_at = updates.updated_at;
      }

      const { data, error } = await supabase
        .from("notices")
        .update(updates)
        .eq("id", id)
        .select(NOTICE_FIELDS)
        .single();

      if (error) {
        return handleDatabaseError(
          error,
          res,
          "Unable to change notice status."
        );
      }

      return res.status(200).json({
        success: true,
        message: `Notice ${status} successfully.`,
        data,
      });
    } catch (error) {
      console.error("Notice status update failed:", error.message);

      return res.status(503).json({
        success: false,
        message: "Unable to change notice status.",
      });
    }
  }
);

// DELETE /api/v1/notices/:id
// Admin only: permanently delete a notice.
router.delete(
  "/:id",
  requireAuth,
  requireStaff(["admin"]),
  async (req, res) => {
    const { id } = req.params;

    if (!UUID_REGEX.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notice ID.",
      });
    }

    try {
      const { data, error } = await supabase
        .from("notices")
        .delete()
        .eq("id", id)
        .select("id")
        .maybeSingle();

      if (error) {
        return handleDatabaseError(
          error,
          res,
          "Unable to delete notice."
        );
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Notice not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Notice deleted successfully.",
      });
    } catch (error) {
      console.error("Notice deletion failed:", error.message);

      return res.status(503).json({
        success: false,
        message: "Unable to delete notice.",
      });
    }
  }
);

module.exports = router;
