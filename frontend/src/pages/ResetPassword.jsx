import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import Card from "../components/ui/Card.jsx";
import { Input } from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import ErrorNotice from "../components/ui/ErrorNotice.jsx";
import * as authApi from "../api/auth.api.js";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setBusy(true);

    try {
      const response = await authApi.resetPassword(token, password);

      setSuccess(
        response?.message ||
          "Password reset successfully. You can now log in."
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message);
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
        <div className="absolute left-1/2 top-[-280px] h-[650px] w-[950px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.09),transparent_68%)] blur-3xl" />

        <div className="absolute inset-x-0 top-0 h-[280px] bg-[linear-gradient(180deg,rgba(255,255,255,0.8),transparent)]" />

        <div className="absolute inset-0 opacity-[0.022] [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl items-center justify-center px-5 py-10 sm:py-16">
        <div className="w-full max-w-[440px]">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
              Reset your password
            </h1>

            <p className="mx-auto mt-3 max-w-[380px] text-sm leading-6 text-ink-soft">
              Create a new password for your SewaPath account.
            </p>
          </div>

          <Card className="overflow-hidden rounded-[24px] border border-ink/10 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.09)]">
            <div className="px-7 py-10 sm:px-9 sm:py-12">
              <form onSubmit={handleSubmit} className="space-y-7">
                <ErrorNotice message={error} />

                {success && (
                  <div
                    className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700"
                    role="status"
                  >
                    {success}
                  </div>
                )}

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    label="New password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] rounded-md p-1 text-ink-faint transition-colors hover:text-ink"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm new password"
                    required
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-[38px] rounded-md p-1 text-ink-faint transition-colors hover:text-ink"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
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
                  className="min-h-[54px] w-full rounded-xl font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  disabled={busy || !!success}
                >
                  {busy ? "Resetting..." : "Reset password"}
                </Button>
              </form>
            </div>

            <div className="border-t border-ink/10 bg-ink/[0.018] px-7 py-4 text-center">
              <Link
                to="/login"
                className="text-sm font-semibold text-ink transition-colors hover:text-marigold"
              >
                ← Back to Login
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}