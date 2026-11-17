const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const supabase = require("../config/supabase");

const router = express.Router();

const BUCKET = "admission-document";
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const PHOTO_MAX_BYTES = 2 * 1024 * 1024;
const MAX_REQUEST_FILES = 8;
const ALLOWED_CLASSES = ["n1", "n2", "n3", "p1", "p2", "p3", "p4", "p5", "p6"];
const PRIMARY_CLASSES = ["p2", "p3", "p4", "p5", "p6"];

const FILE_FIELDS = [
  { name: "birthCertificate", maxCount: 1 },
  { name: "previousSchoolReport", maxCount: 1 },
  { name: "immunizationRecord", maxCount: 1 },
  { name: "passportPhotos", maxCount: 2 },
  { name: "baptismCertificate", maxCount: 1 },
  { name: "parentId", maxCount: 1 },
  { name: "transferCertificate", maxCount: 1 },
];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_BYTES,
    files: MAX_REQUEST_FILES,
    fields: 1,
    fieldSize: 30 * 1024,
  },
});

const attempts = new Map();
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 8;

function rateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || "unknown";
  const current = attempts.get(key);

  for (const [ip, entry] of attempts) {
    if (now - entry.startedAt >= RATE_WINDOW_MS) attempts.delete(ip);
  }

  if (!current || now - current.startedAt >= RATE_WINDOW_MS) {
    attempts.set(key, { startedAt: now, count: 1 });
    return next();
  }

  if (current.count >= RATE_LIMIT) {
    return res.status(429).json({
      success: false,
      message: "Too many applications were submitted from this connection. Please try again later.",
    });
  }

  current.count += 1;
  return next();
}

function parseApplication(req, res, next) {
  try {
    if (typeof req.body.application !== "string") {
      return res.status(400).json({ success: false, message: "Application information is missing." });
    }
    req.application = JSON.parse(req.body.application);
    next();
  } catch {
    return res.status(400).json({ success: false, message: "Application information is not valid JSON." });
  }
}

function clean(value, max = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function guardianFrom(parent, prefix) {
  return {
    firstName: clean(parent[`${prefix}FirstName`], 100),
    lastName: clean(parent[`${prefix}LastName`], 100),
    phone: clean(parent[`${prefix}Phone`], 30),
    email: clean(parent[`${prefix}Email`], 254).toLowerCase(),
    occupation: clean(parent[`${prefix}Occupation`], 150),
    employer: clean(parent[`${prefix}Employer`], 150),
    address: clean(parent[`${prefix}Address`], 500),
  };
}

function validatePayload(payload, files) {
  if (!payload || typeof payload !== "object") return "Application information is required.";

  const student = payload.student || {};
  const parent = payload.parent || {};

  const firstName = clean(student.firstName, 100);
  const lastName = clean(student.lastName, 100);
  const dob = clean(student.dateOfBirth, 10);
  const gender = clean(student.gender, 10);
  const nationality = clean(student.nationality, 20);
  const applyingForClass = clean(student.applyingForClass, 10);
  const residentialAddress = clean(student.residentialAddress, 500);

  if (!firstName || !lastName || !dob || !gender || !nationality || !applyingForClass || !residentialAddress) {
    return "Complete all required student information.";
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob) || Number.isNaN(Date.parse(`${dob}T00:00:00Z`)) || dob > new Date().toISOString().slice(0, 10)) {
    return "Enter a valid date of birth.";
  }
  if (!["male", "female"].includes(gender)) return "Select a valid gender.";
  if (!["rwandan", "other"].includes(nationality)) return "Select a valid nationality.";
  if (!ALLOWED_CLASSES.includes(applyingForClass)) return "Select a valid class.";

  const father = guardianFrom(parent, "father");
  const mother = guardianFrom(parent, "mother");
  const hasFather = father.firstName && father.lastName && father.phone && validEmail(father.email);
  const hasMother = mother.firstName && mother.lastName && mother.phone && validEmail(mother.email);

  if (!hasFather && !hasMother) {
    return "Provide complete contact details for at least one parent or guardian.";
  }
  if (father.email && !validEmail(father.email)) return "Enter a valid father's/guardian's email address.";
  if (mother.email && !validEmail(mother.email)) return "Enter a valid mother's/guardian's email address.";

  const emergency = {
    name: clean(parent.emergencyName, 150),
    relationship: clean(parent.emergencyRelationship, 50),
    phone: clean(parent.emergencyPhone, 30),
    address: clean(parent.emergencyAddress, 500),
  };
  if (!emergency.name || !emergency.relationship || !emergency.phone) {
    return "Complete the required emergency contact information.";
  }

  const byField = files || {};
  const required = ["birthCertificate", "previousSchoolReport", "immunizationRecord", "passportPhotos", "parentId"];
  if (PRIMARY_CLASSES.includes(applyingForClass)) required.push("transferCertificate");
  for (const field of required) {
    if (!byField[field] || byField[field].length === 0) return `The ${field} document is required.`;
  }
  if ((byField.passportPhotos || []).length !== 2) return "Please upload exactly two passport photos.";
  return null;
}

function detectFileType(buffer) {
  if (buffer.length >= 5 && buffer.subarray(0, 5).toString("ascii") === "%PDF-") return "application/pdf";
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "image/jpeg";
  if (
    buffer.length >= 8 &&
    buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) return "image/png";
  return null;
}

function safeOriginalName(name) {
  const base = String(name || "document").replace(/[^\w.\- ()]/g, "_").slice(0, 200);
  return base || "document";
}

async function cleanup(applicationId, storagePaths) {
  if (storagePaths.length) {
    const { error } = await supabase.storage.from(BUCKET).remove(storagePaths);
    if (error) console.error("Admission file cleanup failed:", error.message);
  }
  if (applicationId) {
    const { error } = await supabase.from("admission_applications").delete().eq("id", applicationId);
    if (error) console.error("Admission record cleanup failed:", error.message);
  }
}

router.post(
  "/submit",
  rateLimit,
  (req, res, next) => {
    upload.fields(FILE_FIELDS)(req, res, (error) => {
      if (!error) return next();
      if (error instanceof multer.MulterError) {
        const message = error.code === "LIMIT_FILE_SIZE"
          ? "A file is larger than the 5MB upload limit."
          : "The uploaded files exceed the allowed number or request limits.";
        return res.status(400).json({ success: false, message });
      }
      return res.status(400).json({ success: false, message: "Unable to process uploaded files." });
    });
  },
  parseApplication,
  async (req, res) => {
    let applicationId = null;
    const uploadedPaths = [];

    try {
      const files = req.files || {};
      const validationError = validatePayload(req.application, files);
      if (validationError) {
        return res.status(400).json({ success: false, message: validationError });
      }

      const student = req.application.student;
      const parent = req.application.parent;
      const father = guardianFrom(parent, "father");
      const mother = guardianFrom(parent, "mother");
      const primaryGuardian = father.firstName ? father : mother;
      const emergency = {
        name: clean(parent.emergencyName, 150),
        relationship: clean(parent.emergencyRelationship, 50),
        phone: clean(parent.emergencyPhone, 30),
        address: clean(parent.emergencyAddress, 500),
      };

      const insertPayload = {
        reference_code: `CSNN-${new Date().getFullYear()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`,
        student_first_name: clean(student.firstName, 100),
        student_middle_name: clean(student.middleName, 100) || null,
        student_last_name: clean(student.lastName, 100),
        date_of_birth: clean(student.dateOfBirth, 10),
        gender: clean(student.gender, 10),
        nationality: clean(student.nationality, 20),
        current_school: clean(student.currentSchool, 200) || null,
        current_class: clean(student.currentClass, 10) || null,
        class_applying: clean(student.applyingForClass, 10),
        previous_school: clean(student.currentSchool, 200) || null,
        residential_address: clean(student.residentialAddress, 500),
        father_details: father.firstName ? father : null,
        mother_details: mother.firstName ? mother : null,
        emergency_contact: emergency,
        parent_name: `${primaryGuardian.firstName} ${primaryGuardian.lastName}`.trim(),
        parent_relationship: "parent/guardian",
        parent_phone: primaryGuardian.phone,
        parent_email: primaryGuardian.email,
        parent_address: primaryGuardian.address || clean(student.residentialAddress, 500) || null,
        status: "submitted",
      };

      const { data: application, error: insertError } = await supabase
        .from("admission_applications")
        .insert(insertPayload)
        .select("id, reference_code")
        .single();

      if (insertError) throw insertError;
      applicationId = application.id;

      const documentRows = [];
      for (const [documentType, group] of Object.entries(files)) {
        for (const file of group) {
          const actualType = detectFileType(file.buffer);
          if (!actualType) throw new Error(`The file "${safeOriginalName(file.originalname)}" is not a valid PDF, JPEG, or PNG.`);
          if (actualType !== file.mimetype) throw new Error(`The file "${safeOriginalName(file.originalname)}" has a file-type mismatch.`);
          if (documentType === "passportPhotos" && !actualType.startsWith("image/")) {
            throw new Error("Passport photos must be JPEG or PNG images.");
          }
          if (documentType === "passportPhotos" && file.size > PHOTO_MAX_BYTES) {
            throw new Error("Each passport photo must be 2MB or smaller.");
          }

          const extension = actualType === "application/pdf" ? "pdf" : actualType === "image/jpeg" ? "jpg" : "png";
          const storagePath = `${applicationId}/${documentType}/${crypto.randomUUID()}.${extension}`;
          const { error: uploadError } = await supabase.storage
            .from(BUCKET)
            .upload(storagePath, file.buffer, {
              contentType: actualType,
              upsert: false,
            });

          if (uploadError) throw uploadError;
          uploadedPaths.push(storagePath);

          documentRows.push({
            application_id: applicationId,
            document_type: documentType,
            storage_path: storagePath,
            original_file_name: safeOriginalName(file.originalname),
            mime_type: actualType,
            size_bytes: file.size,
          });
        }
      }

      const { error: metadataError } = await supabase
        .from("application_documents")
        .insert(documentRows);

      if (metadataError) throw metadataError;

      return res.status(201).json({
        success: true,
        message: "Your admission application has been submitted successfully.",
        data: { referenceCode: application.reference_code },
      });
    } catch (error) {
      console.error("Public admission submission failed:", error);
      await cleanup(applicationId, uploadedPaths);
      return res.status(500).json({
        success: false,
        message: "We could not submit your application. Please check your information and try again.",
      });
    }
  }
);

module.exports = router;
