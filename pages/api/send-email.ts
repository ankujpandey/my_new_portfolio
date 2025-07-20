import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // Your email
        pass: process.env.SMTP_PASS, // App-specific password
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.RECEIVER_EMAIL, // Your destination email
      subject: `Portfolio Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ message: "Failed to send email" });
  }
}
