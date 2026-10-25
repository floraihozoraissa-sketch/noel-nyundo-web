const supabase = require("../config/supabase");

async function requireAuth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  const accessToken = authorization.slice("Bearer ".length).trim();

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired access token.",
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    console.error("Authentication verification failed:", error.message);

    return res.status(503).json({
      success: false,
      message: "Unable to verify authentication right now.",
    });
  }
}

module.exports = requireAuth;