import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const token = res.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" });
    }

    // Adding the user id to the request
    req.userID = decode.userID;
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
