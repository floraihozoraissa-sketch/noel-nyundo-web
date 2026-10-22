
const express = require("express");
const cors = require("cors");
const healthRoutes = require("./routes/health.routes");
const dbHealthRoutes = require("./routes/db-health.routes");
const noticesRoutes = require("./routes/notices.routes");

const app = express();

const allowedOrigin =
  process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
  })
);

app.use("/api/v1/health/db", dbHealthRoutes);
app.use("/api/v1/notices", noticesRoutes);

app.use(express.json({ limit: "100kb" }));

app.use("/api/v1/health", healthRoutes);

module.exports = app;
