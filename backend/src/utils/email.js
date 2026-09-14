import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async ({
  email,
  name,
  otp,
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "SewaPath <onboarding@resend.dev>",
      to: [email],
      subject: "Reset your SewaPath password",
      html: `
        <div>
          <h2>Password Reset</h2>

          <p>Hello ${name},</p>

          <p>Your SewaPath verification code is:</p>

          <h1>${otp}</h1>

          <p>This code will expire in 10 minutes.</p>

          <p>If you did not request a password reset, you can ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error("[email] Resend error:", error);
      throw error;
    }

    console.log("[email] Password reset OTP sent:", data?.id);

    return data;
  } catch (error) {
    console.error("[email] Failed to send password reset OTP:", error);
    throw error;
  }
};