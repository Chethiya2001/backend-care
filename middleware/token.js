import jwt from "jsonwebtoken";

const jwtSecret = "ADBC45321F475"; // Ensure this matches in all locations where JWT is created/verified

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log("Authenticated user:", req.user); // Log the authenticated user
    next();
  });
};
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (roles.length > 0 && !roles.includes(req.user.role)) {
      return res
        .status(403)
        .send("Access denied. You do not have the required role.");
    }
    next();
  };
};
