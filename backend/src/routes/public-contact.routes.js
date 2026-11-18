
const express = require("express");
const supabase = require("../config/supabase");

const router = express.Router();

// Basic in-memory rate limit: 8 submissions per IP every 15 minutes.
const submissionAttempts = new Map();
const RATE_LIMIT = 8;
const WINDOW_MS = 15 * 60 * 1000;

function checkRateLimit(req, res, next) {
  const now = Date.now();
  const ip = req.ip || req.socket.remoteAddress || "unknown";

  let record = submissionAttempts.get(ip);

  if (!record || now - record.startedAt >= WINDOW_MS) {
    record = {
      count: 0,
      startedAt: now,
    };
  }

  if (record.count >= RATE_LIMIT) {
    return res.status(429).json({
      success: false,
      message: "Too many messages have been submitted. Please try again later.",
    });
  }

  record.count += 1;
  submissionAttempts.set(ip, record);

  // Remove expired entries to prevent the map growing indefinitely.
  for (const [key, value] of submissionAttempts.entries()) {
    if (now - value.startedAt >= WINDOW_MS) {
      submissionAttempts.delete(key);
    }
  }

  next();
}

// POST /api/v1/contact/submit
// Public: submit a message without staff authentication.
router.post("/submit", checkRateLimit, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body || {};

    // Validate required fields.
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required contact information.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    const cleanPhone =
      typeof phone === "string" && phone.trim()
        ? phone.trim()
        : null;

    // Validate field lengths.
    if (cleanName.length < 2 || cleanName.length > 120) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 120 characters.",
      });
    }

    if (
      cleanEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (cleanPhone && cleanPhone.length > 30) {
      return res.status(400).json({
        success: false,
        message: "Phone number must not exceed 30 characters.",
      });
    }

    if (cleanSubject.length < 3 || cleanSubject.length > 150) {
      return res.status(400).json({
        success: false,
        message: "Subject must be between 3 and 150 characters.",
      });
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 5000) {
      return res.status(400).json({
        success: false,
        message: "Message must be between 10 and 5000 characters.",
      });
    }

    // Only the server controls the initial status.
    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        subject: cleanSubject,
        message: cleanMessage,
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Contact message submission failed:", error.message);

      return res.status(500).json({
        success: false,
        message: "Unable to submit your message. Please try again later.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully.",
      data: {
        id: data.id,
      },
    });
  } catch (error) {
    console.error("Public contact route failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
});

module.exports = router;
