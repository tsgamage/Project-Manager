import jwt from "jsonwebtoken";

export default function generateTokenAndSetCookie(res, userID) {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: process.env.COOKIE_EXPIRES_IN,
  });

  return token;
}
