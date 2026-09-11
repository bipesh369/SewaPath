
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 587,
  secure: Number(process.env.MAIL_PORT) === 465,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendPasswordResetEmail({
  email,
  name,
  resetUrl,
}) {
  try {
    const info = await transporter.sendMail({
      from: `"SewaPath" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset your SewaPath password',

      text: `Hi ${name},

We received a request to reset your SewaPath password.

Reset your password here:

${resetUrl}

This link will expire in 15 minutes.

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
            <a
              href="${resetUrl}"
              style="
                display: inline-block;
                padding: 12px 20px;
                background: #e0a72e;
                color: #0f172a;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
              "
            >
              Reset password
            </a>
          </p>

          <p>
            This link will expire in
            <strong>15 minutes</strong>.
          </p>

          <p>
            If you did not request a password reset,
            you can safely ignore this email.
          </p>

          <p>SewaPath</p>
        </div>
      `,
    });

    console.log('[email] Password reset email sent');
    console.log('[email] Message ID:', info.messageId);
    console.log('[email] Response:', info.response);

    return info;
  } catch (error) {
    console.error('[email] Failed to send password reset email');
    console.error(error);

    throw error;
  }
}

