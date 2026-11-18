
const express = require("express");
const supabase = require("../config/supabase");
const requireAuth = require("../middleware/requireAuth");
const requireStaff = require("../middleware/requireStaff");

const router = express.Router();

const MESSAGE_STATUSES = ["new", "in_progress", "handled"];

const MESSAGE_FIELDS =
  "id, name, email, phone, subject, message, status, handled_by, handled_at, created_at";

// All management routes require an authenticated, active administrator.
router.use(requireAuth, requireStaff(["admin"]));

// GET /api/v1/contact/manage
// Retrieve contact messages with pagination and optional status filtering.
router.get("/manage", async (req, res) => {
  try {
    const page = Math.max(
      1,
      Number.parseInt(req.query.page, 10) || 1
    );

    const limit = Math.min(
      50,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 10)
    );

    const status = req.query.status;

    if (status && !MESSAGE_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message status filter.",
      });
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let messagesQuery = supabase
      .from("contact_messages")
      .select(MESSAGE_FIELDS, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (status) {
      messagesQuery = messagesQuery.eq("status", status);
    }

    const { data, error, count } = await messagesQuery;

    if (error) {
      console.error("Contact messages retrieval failed:", error.message);

      return res.status(500).json({
        success: false,
        message: "Unable to retrieve contact messages.",
      });
    }

    // Retrieve message counts for the dashboard.
    const [newResult, inProgressResult, handledResult] =
      await Promise.all([
        supabase
          .from("contact_messages")
          .select("id", { count: "exact", head: true })
          .eq("status", "new"),

        supabase
          .from("contact_messages")
          .select("id", { count: "exact", head: true })
          .eq("status", "in_progress"),

        supabase
          .from("contact_messages")
          .select("id", { count: "exact", head: true })
          .eq("status", "handled"),
      ]);

    if (
      newResult.error ||
      inProgressResult.error ||
      handledResult.error
    ) {
      console.error("Contact message statistics failed:", {
        new: newResult.error?.message,
        inProgress: inProgressResult.error?.message,
        handled: handledResult.error?.message,
      });

      return res.status(500).json({
        success: false,
        message: "Unable to retrieve contact message statistics.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact messages retrieved successfully.",
      data: {
        messages: data || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
        },
        statistics: {
          new: newResult.count || 0,
          in_progress: inProgressResult.count || 0,
          handled: handledResult.count || 0,
        },
      },
    });
  } catch (error) {
    console.error("Contact messages route failed:", error.message);

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while retrieving contact messages.",
    });
  }
});

// PATCH /api/v1/contact/manage/:id
// Update the status of a contact message.
router.patch("/manage/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact message ID.",
      });
    }

    if (!MESSAGE_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Choose new, in_progress, or handled.",
      });
    }

    const updateData = {
      status,
    };

    if (status === "handled") {
      updateData.handled_by = req.user.id;
      updateData.handled_at = new Date().toISOString();
    } else {
      updateData.handled_by = null;
      updateData.handled_at = null;
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .update(updateData)
      .eq("id", id)
      .select(MESSAGE_FIELDS)
      .maybeSingle();

    if (error) {
      console.error("Contact message update failed:", {
  message: error.message,
  code: error.code,
  details: error.details,
  hint: error.hint,
});

      return res.status(500).json({
        success: false,
        message: "Unable to update the contact message.",
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message status updated successfully.",
      data,
    });
  } catch (error) {
    console.error("Contact message update route failed:", error.message);

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while updating the contact message.",
    });
  }
});

module.exports = router;
