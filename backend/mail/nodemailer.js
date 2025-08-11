import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  service: "gmail",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "dev.tsgamage@gmail.com",
    pass: "vivs atrr lfgg ckhp",
  },
  tls: {
    rejectUnauthorized: false, // <--- Ignore self-signed certificates
  },
});

export const SENDER = '"Project Manager" <dev.tsgamage@gmail.com>';
