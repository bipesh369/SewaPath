import { useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

import Card from "../components/ui/Card.jsx";
import { Input } from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import ErrorNotice from "../components/ui/ErrorNotice.jsx";

import { ArrowRight } from "lucide-react";

export default function Login() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setBusy(true);
    setError("");

    try {
      await login(form.email, form.password);
      navigate(location.state?.from || "/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#fafaf9]">
      {/* ================= PREMIUM BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
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

      {/* ================= LOGIN CONTENT ================= */}

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
              {t.auth.loginTitle}
            </h1>
          </div>

          {/* ================= LOGIN CARD ================= */}

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
                <Input
                  id="password"
                  type="password"
                  label={t.auth.password}
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      password: e.target.value,
                    }))
                  }
                />

                {/* Login Button */}
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="
                    group
                    mt-5
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
                  <span>{t.auth.loginButton}</span>
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
                py-4
                text-center
              "
            >
              <span className="text-xs text-ink-faint">
                Secure access to your SewaPath account
              </span>
            </div>
          </Card>

          {/* Register */}
          <p className="mt-7 text-center text-sm text-ink-soft">
            {t.auth.noAccount}{" "}
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
              {t.auth.createOne}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
