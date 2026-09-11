
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import Card from "../components/ui/Card.jsx";
import { Input } from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import ErrorNotice from "../components/ui/ErrorNotice.jsx";

export default function Register() {
  const { t, lang } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      await register({
        ...form,
        preferredLanguage: lang,
      });

      navigate("/dashboard");
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

      {/* ================= REGISTER CONTENT ================= */}
      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl items-center justify-center px-5 py-10 sm:py-16">
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
              {t.auth.registerTitle}
            </h1>
          </div>

          {/* ================= REGISTER CARD ================= */}
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
            <div className="px-7 py-8 sm:px-9 sm:py-6">
              <form onSubmit={handleSubmit} className="space-y-7">

                {/* Error */}
                <ErrorNotice message={error} />

                {/* Full name */}
                <Input
                  id="name"
                  label={t.auth.name}
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      name: e.target.value,
                    }))
                  }
                />

                {/* Email */}
                <Input
                  id="email"
                  type="email"
                  label={t.auth.email}
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      email: e.target.value,
                    }))
                  }
                />

                {/* Password */}
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    label={t.auth.password}
                    required
                    minLength={6}
                    value={form.password}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        password: e.target.value,
                      }))
                    }
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="
                      absolute
                      right-3
                      top-[30px]
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      text-ink-faint
                      transition
                      hover:bg-ink/[0.05]
                      hover:text-ink
                      focus:outline-none
                      focus:ring-2
                      focus:ring-marigold/30
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    title={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      /* Eye Off */
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c1.5 4.5 5.5 7.5 9.75 7.5 1.65 0 3.2-.43 4.55-1.18M6.23 6.23A9.94 9.94 0 0 1 12 4.5c4.25 0 8.25 3 9.75 7.5a10.55 10.55 0 0 1-3.05 4.36M6.23 6.23 3 3m3.23 3.23 3.18 3.18m0 0a2.5 2.5 0 1 0 3.54 3.54m-3.54-3.54 3.54 3.54m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      /* Eye */
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12s3.5-7.5 9.75-7.5S21.75 12 21.75 12 18.25 19.5 12 19.5 2.25 12 2.25 12Z"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Register Button */}
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="
                    mt-3
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
                  {t.auth.registerButton}
                </Button>
              </form>
            </div>

            {/* Bottom security strip */}
            <div
              className="
                border-t
                border-ink/10
                bg-ink/[0.018]
                px-7
                py-3
                text-center
              "
            >
              <span className="text-xs text-ink-faint">
                Secure register to your SewaPath account
              </span>
            </div>
          </Card>

          {/* Login link */}
          <p className="mt-5 text-center text-sm text-ink-soft">
            {t.auth.hasAccount}{" "}
            <Link
              to="/login"
              className="
                ml-1
                font-semibold
                text-ink
                transition-colors
                hover:text-marigold
              "
            >
              {t.auth.signInInstead}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
