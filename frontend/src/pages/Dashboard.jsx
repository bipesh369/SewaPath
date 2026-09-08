import { useEffect, useState } from "react";

import { useLanguage } from "../i18n/LanguageContext.jsx";

import { listSavedServices } from "../api/savedServices.api.js";

import ServiceCard from "../components/ServiceCard.jsx";

import Button from "../components/ui/Button.jsx";

import Spinner from "../components/ui/Spinner.jsx";

import ErrorNotice from "../components/ui/ErrorNotice.jsx";

import { Bookmark, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const { t } = useLanguage();

  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadSavedServices = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await listSavedServices();

        if (!active) return;

        setSaved((res.saved || []).filter((entry) => entry.service));
      } catch (err) {
        if (!active) return;

        setError(err.message || t.common.error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadSavedServices();

    return () => {
      active = false;
    };
  }, [t.common.error]);

  return (
    <div className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#fafaf9]">
      {/* ================= PREMIUM BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Warm ambient glow */}
        <div
          className="
            absolute
            left-1/2
            top-[-300px]
            h-[650px]
            w-[950px]
            -translate-x-1/2
            rounded-full
            bg-[radial-gradient(circle,rgba(245,158,11,0.07),transparent_68%)]
            blur-3xl
          "
        />

        {/* Subtle architectural grid */}
        <div
          className="
            absolute inset-0
            opacity-[0.018]
            [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)]
            [background-size:80px_80px]
          "
        />
      </div>

      {/* ================= MAIN CONTENT ================= */}

      <main className="relative mx-auto max-w-6xl px-5 py-12 sm:py-16">
        {/* ================= DASHBOARD HEADER ================= */}

        <section className="mb-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-marigold">
                SewaPath
              </p>

              <h1
                className="
                  text-3xl
                  font-semibold
                  tracking-[-0.03em]
                  text-ink
                  sm:text-4xl
                "
              >
                {t.dashboard.title}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-ink-soft">
                Keep the government services you need most in one place.
              </p>
            </div>

            {/* Browse services */}
            <Button
              to="/services"
              variant="secondary"
              className="
    shrink-0
    rounded-xl
    border border-[#D8C3A5]
    bg-[#EDE1D0]
    px-5
    font-semibold
    text-[#6B4F35]
    shadow-sm
    transition-all
    duration-200
    hover:bg-[#E5D5C0]
    hover:shadow-md
  "
            >
              {t.dashboard.browseServices}
            </Button>
          </div>
        </section>

        {/* ================= SAVED SERVICES HEADER ================= */}

        <section>
          <div
            className="
              mb-6
              flex
              items-center
              justify-between
              border-b
              border-ink/10
              pb-5
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-ink/10
                  bg-white
                  text-ink-soft
                  shadow-sm
                "
              >
                <Bookmark size={19} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-ink">
                  {t.dashboard.savedServices}
                </h2>

                {!loading && !error && saved.length > 0 && (
                  <p className="mt-0.5 text-xs text-ink-faint">
                    {saved.length} saved{" "}
                    {saved.length === 1 ? "service" : "services"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ================= CONTENT ================= */}

          {loading ? (
            <div
              className="
                rounded-2xl
                border
                border-ink/10
                bg-white
                px-6
                py-16
                shadow-sm
              "
            >
              <Spinner label={t.common.loading} />
            </div>
          ) : error ? (
            <div
              className="
                rounded-2xl
                border
                border-ink/10
                bg-white
                p-6
                shadow-sm
              "
            >
              <ErrorNotice message={error} />
            </div>
          ) : saved.length === 0 ? (
            /* ================= EMPTY STATE ================= */

            <div
              className="
                rounded-[24px]
                border
                border-dashed
                border-ink/15
                bg-white
                px-6
                py-16
                text-center
                shadow-sm
                sm:px-10
              "
            >
              <div
                className="
                  mx-auto
                  mb-5
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-marigold/10
                  text-marigold
                "
              >
                <Bookmark size={24} strokeWidth={1.7} />
              </div>

              <h3 className="text-lg font-semibold text-ink">
                {t.dashboard.savedServices}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-soft">
                {t.dashboard.noSaved}
              </p>

              <Button
                to="/services"
                variant="accent"
                className="
                  mt-7
                  rounded-xl
                  px-6
                "
              >
                {t.dashboard.browseServices}
              </Button>
            </div>
          ) : (
            /* ================= SAVED SERVICES ================= */

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {saved.map((entry) => (
                <ServiceCard key={entry._id} service={entry.service} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
