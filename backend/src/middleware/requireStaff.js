const supabase = require("../config/supabase");

function requireStaff(allowedRoles = []) {
  return async function staffAuthorization(req, res, next) {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    try {
      const { data: staff, error } = await supabase
        .from("staff_profiles")
        .select("id, full_name, role, active")
        .eq("id", req.user.id)
        .maybeSingle();

      if (error) {
        console.error("Staff authorization lookup failed:", error.message);

        return res.status(503).json({
          success: false,
          message: "Unable to verify staff permissions right now.",
        });
      }

      if (!staff || !staff.active) {
        return res.status(403).json({
          success: false,
          message: "Active staff access required.",
        });
      }

      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(staff.role)
      ) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to perform this action.",
        });
      }

      req.staff = staff;

      return next();
    } catch (error) {
      console.error("Staff authorization failed:", error.message);

      return res.status(503).json({
        success: false,
        message: "Unable to verify staff permissions right now.",
      });
    }
  };
}

module.exports = requireStaff;