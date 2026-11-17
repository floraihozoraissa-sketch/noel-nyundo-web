const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");
const dbHealthRoutes = require("./routes/db-health.routes");
const noticesRoutes = require("./routes/notices.routes");
const staffRoutes = require("./routes/staff.routes");
const publicAdmissionsRoutes = require("./routes/public-admissions.routes");
const admissionsRoutes = require("./routes/admissions.routes");

const app = express();

const allowedOrigin =
  process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: "100kb" }));

app.use("/api/v1/health/db", dbHealthRoutes);
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/notices", noticesRoutes);
app.use("/api/v1/staff", staffRoutes);

// Public POST /submit is registered before the staff-only admissions router.
app.use("/api/v1/admissions", publicAdmissionsRoutes);
app.use("/api/v1/admissions", admissionsRoutes);

module.exports = app;
