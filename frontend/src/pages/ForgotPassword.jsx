import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import Card from "../components/ui/Card.jsx";
import { Input } from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import ErrorNotice from "../components/ui/ErrorNotice.jsx";

import * as authApi from "../api/auth.api.js";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [resetToken, setResetToken] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setBusy(true);

    try {
      const response = await authApi.forgotPassword(
        email.trim()
      );

      setMessage(
        response?.message ||
          "A verification code has been sent to your email."
      );

      setStep("otp");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to send the verification code."
      );
    } finally {
      setBusy(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setBusy(true);

    try {
      const response = await authApi.verifyResetOtp(
        email.trim(),
        otp
      );

      setResetToken(response.resetToken);

      setMessage(
        response?.message ||
          "OTP verified successfully."
      );

      setStep("password");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Invalid OTP."
      );
    } finally {
      setBusy(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setBusy(true);

    try {
      const response = await authApi.resetPassword(
        resetToken,
        password
      );

      setMessage(
        response?.message ||
          "Password has been reset successfully."
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to reset password."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#fafaf9]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="
            absolute left-1/2 top-[-280px]
            h-[650px] w-[950px]
            -translate-x-1/2
            rounded-full
            bg-[radial-gradient(circle,rgba(245,158,11,0.09),transparent_68%)]
            blur-3xl
          "
        />

        <div
          className="
            absolute inset-x-0 top-0
            h-[280px]
            bg-[linear-gradient(180deg,rgba(255,255,255,0.8),transparent)]
          "
        />

        <div
          className="
            absolute inset-0
            opacity-[0.022]
            [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)]
            [background-size:80px_80px]
          "
        />
      </div>

      <div
        className="
          relative mx-auto flex
          min-h-[calc(100vh-72px)]
          max-w-6xl
          items-center
          justify-center
          px-5
          py-10
          sm:py-16
        "
      >
        <div className="w-full max-w-[440px]">

          <div className="mb-8 text-center">
            <h1
              className="
                text-3xl
                font-semibold
                tracking-[-0.03em]
                text-ink
                sm:text-4xl
              "
            >
              {step === "email" && "Forgot your password?"}
              {step === "otp" && "Verify your email"}
              {step === "password" && "Create new password"}
            </h1>

            <p className="mx-auto mt-3 max-w-[380px] text-sm leading-6 text-ink-soft">
              {step === "email" &&
                "Enter the email address associated with your SewaPath account."}

              {step === "otp" &&
                `Enter the 6-digit verification code sent to ${email}.`}

              {step === "password" &&
                "Create a new password for your SewaPath account."}
            </p>
          </div>

          <Card
            className="
              overflow-hidden
              rounded-[24px]
              border
              border-ink/10
              bg-white
              shadow-[0_24px_70px_rgba(15,23,42,0.09)]
            "
          >
            <div className="px-7 py-10 sm:px-9 sm:py-12">

              <ErrorNotice message={error} />

              {message && (
                <div
                  className="
                    mb-6
                    rounded-xl
                    border
                    border-green-200
                    bg-green-50
                    px-4
                    py-3
                    text-sm
                    leading-6
                    text-green-700
                  "
                  role="status"
                >
                  {message}
                </div>
              )}

              {step === "email" && (
                <form
                  onSubmit={handleSendOtp}
                  className="space-y-7"
                >
                  <Input
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="min-h-[54px] w-full rounded-xl font-semibold"
                    disabled={busy}
                  >
                    {busy
                      ? "Sending..."
                      : "Send OTP"}
                  </Button>
                </form>
              )}

              {step === "otp" && (
                <form
                  onSubmit={handleVerifyOtp}
                  className="space-y-7"
                >
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    label="Verification code"
                    placeholder="123456"
                    required
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6)
                      )
                    }
                  />

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="min-h-[54px] w-full rounded-xl font-semibold"
                    disabled={busy}
                  >
                    {busy
                      ? "Verifying..."
                      : "Verify OTP"}
                  </Button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setOtp("");
                      setError("");
                      setMessage("");
                    }}
                    className="
                      w-full
                      text-sm
                      font-semibold
                      text-ink
                      hover:text-marigold
                    "
                  >
                    Change email
                  </button>
                </form>
              )}

              {step === "password" && (
                <form
                  onSubmit={handleResetPassword}
                  className="space-y-7"
                >
                  <div className="relative">
                    <Input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      label="New password"
                      required
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      className="
                        absolute
                        right-3
                        top-[38px]
                        rounded-md
                        p-1
                        text-ink-faint
                        hover:text-ink
                      "
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      label="Confirm new password"
                      required
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      className="
                        absolute
                        right-3
                        top-[38px]
                        rounded-md
                        p-1
                        text-ink-faint
                        hover:text-ink
                      "
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="min-h-[54px] w-full rounded-xl font-semibold"
                    disabled={busy}
                  >
                    {busy
                      ? "Resetting..."
                      : "Reset password"}
                  </Button>
                </form>
              )}
            </div>

            <div
              className="
                border-t
                border-ink/10
                bg-ink/[0.018]
                px-7
                py-4
                text-center
              "
            >
              <Link
                to="/login"
                className="
                  text-sm
                  font-semibold
                  text-ink
                  hover:text-marigold
                "
              >
                Back to Login
              </Link>
            </div>
          </Card>

          <p className="mt-7 text-center text-sm text-ink-soft">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="ml-1 font-semibold text-ink hover:text-marigold"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}