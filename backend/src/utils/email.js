import nodemailer from "nodemailer";
import dns from "node:dns";

// Prefer IPv4 on environments such as Render
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4,
});

export async function sendPasswordResetEmail({ email, name, otp }) {
  try {
    const info = await transporter.sendMail({
      from: `"SewaPath" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your SewaPath password reset OTP",

      text: `Hi ${name},

We received a request to reset your SewaPath password.

Your verification code is:

${otp}

This OTP will expire in 10 minutes.

If you did not request a password reset, you can safely ignore this email.

SewaPath`,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #0f172a;
            max-width: 600px;
            margin: 0 auto;
          "
        >
          <h2>Reset your SewaPath password</h2>

          <p>Hi ${name},</p>

          <p>
            We received a request to reset your SewaPath password.
          </p>

          <p>
            Your verification code is:
          </p>

          <div
            style="
              margin: 24px 0;
              padding: 18px;
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              text-align: center;
              font-size: 32px;
              font-weight: 700;
              letter-spacing: 8px;
              color: #0f172a;
            "
          >
            ${otp}
          </div>

          <p>
            This OTP will expire in
            <strong>10 minutes</strong>.
          </p>

          <p>
            If you did not request a password reset,
            you can safely ignore this email.
          </p>

          <p>SewaPath</p>
        </div>
      `,
    });

    console.log("[email] Password reset OTP sent");
    console.log("[email] Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("[email] Failed to send password reset OTP");
    console.error(error);

    throw error;
  }
}
