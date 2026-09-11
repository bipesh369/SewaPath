
import { useState } from "react";

import { Link } from "react-router-dom";

import { useLanguage } from "../i18n/LanguageContext.jsx";

import Card from "../components/ui/Card.jsx";

import { Input } from "../components/ui/Input.jsx";

import Button from "../components/ui/Button.jsx";

import ErrorNotice from "../components/ui/ErrorNotice.jsx";

import * as authApi from "../api/auth.api.js";

export default function ForgotPassword() {
  const { t } = useLanguage();

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setBusy(true);
    setError("");
    setMessage("");

    try {
      const response = await authApi.forgotPassword(email);

      setMessage(
        response?.message ||
          "If an account exists with this email, you will receive a password reset link."
      );

      setEmail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#fafaf9]">
      {/* ================= PREMIUM BACKGROUND ================= */}

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Warm central glow */}

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

        {/* Subtle top highlight */}

        <div
          className="
            absolute inset-x-0 top-0
            h-[280px]
            bg-[linear-gradient(180deg,rgba(255,255,255,0.8),transparent)]
          "
        />

        {/* Architectural grid */}

        <div
          className="
            absolute inset-0
            opacity-[0.022]
            [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)]
            [background-size:80px_80px]
          "
        />
      </div>

      {/* ================= FORGOT PASSWORD CONTENT ================= */}

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
          {/* Header */}

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
              Forgot your password?
            </h1>

            <p className="mx-auto mt-3 max-w-[380px] text-sm leading-6 text-ink-soft">
              Enter the email address associated with your SewaPath account.
              We’ll send you a link to reset your password.
            </p>
          </div>

          {/* ================= CARD ================= */}

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
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Error */}

                <ErrorNotice message={error} />

                {/* Success */}

                {message && (
                  <div
                    className="
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

                {/* Email */}

                <Input
                  id="email"
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Submit */}

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="
                    min-h-[54px]
                    w-full
                    rounded-xl
                    font-semibold
                    shadow-sm
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:shadow-lg
                  "
                  disabled={busy}
                >
                  {busy ? "Sending..." : "Send reset link"}
                </Button>
              </form>
            </div>

            {/* Bottom */}

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
                  transition-colors
                  hover:text-marigold
                "
              >
                Back to Login
              </Link>
            </div>
          </Card>

          {/* Register */}

          <p className="mt-7 text-center text-sm text-ink-soft">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="
                ml-1
                font-semibold
                text-ink
                transition-colors
                hover:text-marigold
              "
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

