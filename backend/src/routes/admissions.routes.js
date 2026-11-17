
const express = require("express");
const supabase = require("../config/supabase");
const requireAuth = require("../middleware/requireAuth");
const requireStaff = require("../middleware/requireStaff");

const router = express.Router();

const ALLOWED_ROLES = ["admin", "admissions_officer"];

const APPLICATION_STATUSES = [
  "submitted",
  "under_review",
  "needs_information",
  "accepted",
  "rejected",
  "withdrawn",
];

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const APPLICATION_FIELDS = `
  id,
  reference_code,
  student_first_name,
  student_middle_name,
  student_last_name,
  date_of_birth,
  gender,
  nationality,
  current_school,
  current_class,
  class_applying,
  residential_address,
  previous_school,
  parent_name,
  parent_relationship,
  parent_phone,
  parent_email,
  parent_address,
  father_details,
  mother_details,
  emergency_contact,
  status,
  reviewed_by,
  internal_notes,
  submitted_at,
  reviewed_at
`;

function isValidUUID(value) {
  return typeof value === "string" && UUID_REGEX.test(value);
}

function handleDatabaseError(res, error, message) {
  console.error(message, error);

  return res.status(500).json({
    success: false,
    message,
  });
}

// All admissions management routes require an authenticated,
// active administrator or admissions officer.
router.use(requireAuth, requireStaff(ALLOWED_ROLES));


// GET /api/v1/admissions/manage
// Retrieve applications, optionally filtered by status.
router.get("/manage", async (req, res) => {
  try {
    const status = req.query.status;

    if (
      status &&
      (typeof status !== "string" ||
        !APPLICATION_STATUSES.includes(status))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status.",
      });
    }

    const page = Number.parseInt(req.query.page, 10) || 1;
    const limit = Number.parseInt(req.query.limit, 10) || 10;

    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 50
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination values.",
      });
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("admission_applications")
      .select(APPLICATION_FIELDS, { count: "exact" })
      .order("submitted_at", { ascending: false })
      .range(from, to);

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error, count } = await query;

    if (error) {
      return handleDatabaseError(
        res,
        error,
        "Unable to retrieve admission applications."
      );
    }

    return res.status(200).json({
      success: true,
      message: "Admission applications retrieved successfully.",
      data: {
        applications: data,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
        },
      },
    });
  } catch (error) {
    return handleDatabaseError(
      res,
      error,
      "An unexpected error occurred."
    );
  }
});


// GET /api/v1/admissions/manage/:id
// Retrieve one application and its document metadata.
router.get("/manage/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID.",
      });
    }

    const { data: application, error } = await supabase
      .from("admission_applications")
      .select(APPLICATION_FIELDS)
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return handleDatabaseError(
        res,
        error,
        "Unable to retrieve the application."
      );
    }

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    const { data: documents, error: documentsError } = await supabase
      .from("application_documents")
      .select(
        "id, document_type, original_file_name, mime_type, size_bytes, created_at"
      )
      .eq("application_id", id)
      .order("created_at", { ascending: true });

    if (documentsError) {
      return handleDatabaseError(
        res,
        documentsError,
        "Unable to retrieve application documents."
      );
    }

    return res.status(200).json({
      success: true,
      message: "Application retrieved successfully.",
      data: {
        application,
        documents,
      },
    });
  } catch (error) {
    return handleDatabaseError(
      res,
      error,
      "An unexpected error occurred."
    );
  }
});


// PATCH /api/v1/admissions/manage/:id
// Update an application's status and/or internal notes.
router.patch("/manage/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, internal_notes } = req.body;

    if (!isValidUUID(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID.",
      });
    }

    const hasStatus = Object.prototype.hasOwnProperty.call(
      req.body,
      "status"
    );

    const hasNotes = Object.prototype.hasOwnProperty.call(
      req.body,
      "internal_notes"
    );

    if (!hasStatus && !hasNotes) {
      return res.status(400).json({
        success: false,
        message: "Provide a status or internal notes to update.",
      });
    }

    if (
      hasStatus &&
      (typeof status !== "string" ||
        !APPLICATION_STATUSES.includes(status))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status.",
      });
    }

    if (
      hasNotes &&
      internal_notes !== null &&
      (typeof internal_notes !== "string" ||
        internal_notes.length > 5000)
    ) {
      return res.status(400).json({
        success: false,
        message: "Internal notes must be text of up to 5000 characters.",
      });
    }

    const updates = {};

    if (hasStatus) {
      updates.status = status;
      updates.reviewed_by = req.user.id;
      updates.reviewed_at = new Date().toISOString();
    }

    if (hasNotes) {
      updates.internal_notes =
        typeof internal_notes === "string"
          ? internal_notes.trim()
          : null;
    }

    const { data, error } = await supabase
      .from("admission_applications")
      .update(updates)
      .eq("id", id)
      .select(APPLICATION_FIELDS)
      .maybeSingle();

    if (error) {
      return handleDatabaseError(
        res,
        error,
        "Unable to update the application."
      );
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application updated successfully.",
      data,
    });
  } catch (error) {
    return handleDatabaseError(
      res,
      error,
      "An unexpected error occurred."
    );
  }
});


// GET /api/v1/admissions/manage/:id/documents/:documentId/url
// Generate a short-lived URL for an application document.
router.get(
  "/manage/:id/documents/:documentId/url",
  async (req, res) => {
    try {
      const { id, documentId } = req.params;

      if (!isValidUUID(id) || !isValidUUID(documentId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid application or document ID.",
        });
      }

      // Retrieve the document only if it belongs to this application.
      const { data: document, error } = await supabase
        .from("application_documents")
        .select("id, storage_path, original_file_name")
        .eq("id", documentId)
        .eq("application_id", id)
        .maybeSingle();

      if (error) {
        return handleDatabaseError(
          res,
          error,
          "Unable to retrieve the requested document."
        );
      }

      if (!document) {
        return res.status(404).json({
          success: false,
          message: "Document not found.",
        });
      }

      if (!document.storage_path) {
        return res.status(404).json({
          success: false,
          message: "Document storage location is unavailable.",
        });
      }

      // Signed URL expires after 5 minutes.
      const { data: signedData, error: signedError } =
        await supabase.storage
          .from("admission-document")
          .createSignedUrl(document.storage_path, 300);

      if (signedError || !signedData?.signedUrl) {
        console.error("Document signed URL generation failed:", signedError);

        return res.status(500).json({
          success: false,
          message: "Unable to generate a secure document link.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Secure document link generated successfully.",
        data: {
          signedUrl: signedData.signedUrl,
          expiresIn: 300,
        },
      });
    } catch (error) {
      return handleDatabaseError(
        res,
        error,
        "An unexpected error occurred."
      );
    }
  }
);


module.exports = router;
