import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  FileText,
  Folder,
  House,
  IdCard,
  Landmark,
  LifeBuoy,
  Search,
  Shield,
  Sprout,
} from "lucide-react";

import { useLanguage } from "../i18n/LanguageContext.jsx";
import { pick } from "../i18n/translations.js";
import { listCategories } from "../api/categories.api.js";
import { listServices } from "../api/services.api.js";

import ServiceCard from "../components/ServiceCard.jsx";
import Button from "../components/ui/Button.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import ErrorNotice from "../components/ui/ErrorNotice.jsx";

const ICONS = {
  "file-text": FileText,
  "id-card": IdCard,
  briefcase: Briefcase,
  shield: Shield,
  sprout: Sprout,
  "life-buoy": LifeBuoy,
  landmark: Landmark,
  home: House,
  folder: Folder,
};

const popularSlugs = [
  "birth-registration",
  "marriage-registration",
  "driving-licence-registration",
  "citizenship-recommendation",
  "vehicle-registration-renewal",
  "business-registration",
  "national-id",
  "social-security",
];

export default function Home() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  const [goal, setGoal] = useState("");
  const [goalError, setGoalError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Load homepage data
  // =========================

  useEffect(() => {
    let active = true;

    const loadHomeData = async () => {
      try {
        setLoading(true);
        setError("");

        const [catRes, svcRes] = await Promise.all([
          listCategories(),
          listServices(),
        ]);

        if (!active) return;

        setCategories(catRes.categories || []);

        const services = svcRes.services || [];

        const selectedPopularServices = popularSlugs
          .map((slug) => services.find((service) => service.slug === slug))
          .filter(Boolean);

        setPopularServices(selectedPopularServices);
      } catch (err) {
        if (!active) return;

        setError(err.message || t.common.error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadHomeData();

    return () => {
      active = false;
    };
  }, []);

  // =========================
  // Search
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedGoal = goal.trim();

    if (!trimmedGoal) {
      setGoalError(true);
      return;
    }

    setGoalError(false);

    navigate(`/services?goal=${encodeURIComponent(trimmedGoal)}`);
  };

  return (
    <div className="min-h-screen">
      {/* ================= PREMIUM HERO ================= */}
      <section className="relative isolate overflow-hidden border-b border-line">
        {/* Premium background */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          {/* Main ambient gradient */}
          <div
            className="
      absolute inset-0
      bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(245,158,11,0.11),transparent_65%)]
    "
          />

          {/* Warm top-left light */}
          <div
            className="
      absolute -left-[15%] -top-[20%]
      h-[650px] w-[750px]
      rotate-[-12deg]
      bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.14),transparent_68%)]
      blur-3xl
    "
          />

          {/* Soft right-side light */}
          <div
            className="
      absolute -right-[18%] top-[10%]
      h-[650px] w-[700px]
      rotate-[20deg]
      bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.055),transparent_68%)]
      blur-3xl
    "
          />

          {/* Bottom warm atmosphere */}
          <div
            className="
      absolute bottom-[-30%] left-[25%]
      h-[500px] w-[800px]
      bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.07),transparent_70%)]
      blur-3xl
    "
          />

          {/* Subtle architectural grid */}
          <div
            className="
      absolute inset-0
      opacity-[0.028]
      [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)]
      [background-size:72px_72px]
    "
          />

          {/* Soft directional highlight */}
          <div
            className="
      absolute left-1/2 top-0
      h-[220px] w-[900px]
      -translate-x-1/2
      bg-[linear-gradient(180deg,rgba(255,255,255,0.65),transparent)]
      blur-2xl
    "
          />
        </div>

        {/* Hero */}
        <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col items-center justify-center px-5 py-16 text-center sm:py-20 lg:py-24">
          {/* Eyebrow */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-marigold" />
            Find the Right Government Service
          </div>

          {/* Main heading */}
          <h1
            className="
        max-w-4xl
        text-4xl font-semibold
        leading-[1.05]
        tracking-[-0.035em]
        text-ink
        sm:text-5xl
        lg:text-7xl
      "
          >
            {t.home.heroTitle}
          </h1>

          {/* Description */}
          <p
            className="
        mx-auto mt-8
        max-w-2xl
        text-base
        leading-7
        text-ink-soft
        sm:text-lg
        sm:leading-8
      "
          >
            {t.home.heroSubtitle}
          </p>

          {/* Search */}
          <form
            onSubmit={handleSubmit}
            className="
        group
        mx-auto mt-8
        flex w-full max-w-2xl
        flex-col gap-2
        rounded-[22px]
        border border-ink/10
        bg-white
        p-2
        shadow-[0_12px_40px_rgba(0,0,0,0.07)]
        transition
        focus-within:border-ink/20
        focus-within:shadow-[0_16px_50px_rgba(0,0,0,0.10)]
        sm:flex-row
        sm:rounded-full
      "
          >
            {/* Input */}
            <div className="relative flex min-h-[52px] flex-1 items-center">
              <Search
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
                className="
            absolute left-5
            text-ink-faint
            transition-colors
            group-focus-within:text-ink-soft
          "
              />

              <input
                type="text"
                value={goal}
                onChange={(e) => {
                  setGoal(e.target.value);
                  setGoalError(false);
                }}
                placeholder={
                  goalError
                    ? "Enter your service or describe what you need"
                    : t.home.heroPlaceholder
                }
                aria-label="Government service search"
                className="
    w-full bg-transparent py-3.5 pl-12 pr-4
    text-[15px] text-ink outline-none
    placeholder:text-ink-faint
  "
              />
            </div>

            {/* Search button */}
            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="
          min-h-[52px]
          rounded-[16px]
          px-7
          font-semibold
          sm:rounded-full
        "
            >
              {t.home.heroButton}
            </Button>
          </form>

          {/* Stats */}
          <div
            className="
        mt-9
        flex flex-wrap
        items-center
        justify-center
        gap-x-4
        gap-y-2
        text-xs
        font-medium
        text-ink-soft
        sm:text-sm
      "
          >
            <span>312+ government services</span>

            <span
              className="h-1 w-1 rounded-full bg-ink/20"
              aria-hidden="true"
            />

            <span>All 7 provinces</span>
          </div>

          {/* Explore */}
          <button
            type="button"
            onClick={() => navigate("/services")}
            className="
    group/explore
    mt-8
    inline-flex
    items-center
    gap-2
    rounded-full
    border border-ink/10
    bg-white/70
    px-5 py-2.5
    text-sm font-medium
    text-ink-soft
    shadow-sm
    backdrop-blur-sm
    transition-all duration-200
    hover:border-ink/20
    hover:bg-white
    hover:text-ink
    hover:shadow-md
  "
          >
            <span>Explore all services</span>

            <ArrowRight
              size={16}
              strokeWidth={1.8}
              className="
      transition-transform duration-200
      group-hover/explore:translate-x-1
    "
            />
          </button>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
        {loading ? (
          <Spinner label={t.common.loading} />
        ) : error ? (
          <ErrorNotice message={error} />
        ) : (
          <>
            {/* =================================================
                POPULAR SERVICES
            ================================================= */}

            <section>
              <div className="mb-7">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {t.home.popularServices}
                </h2>

                <p className="mt-1.5 text-sm text-ink-soft">
                  {t.home.popularServicesSubtitle}
                </p>
              </div>

              {popularServices.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-ink/15 bg-white p-10 text-center">
                  <p className="text-sm text-ink-soft">
                    {t.services.noResults}
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {popularServices.map((service) => (
                    <ServiceCard key={service._id} service={service} />
                  ))}
                </div>
              )}
            </section>

            {/* =================================================
                CATEGORIES
            ================================================= */}

            {categories.length > 0 && (
              <section className="mt-16 border-t border-line pt-12">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Browse by category
                  </h2>

                  <p className="mt-1.5 text-sm text-ink-soft">
                    Explore services based on what you need.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categories.map((category) => {
                    const Icon = ICONS[category.icon] || Folder;

                    return (
                      <button
                        key={category._id}
                        type="button"
                        onClick={() =>
                          navigate(`/services?category=${category._id}`)
                        }
                        className="
                          group flex items-center gap-4
                          rounded-2xl
                          border border-ink/10
                          bg-white
                          px-4 py-4
                          text-left
                          shadow-sm
                          transition-all duration-200
                          hover:-translate-y-0.5
                          hover:border-ink/20
                          hover:shadow-md
                        "
                      >
                        {/* Icon */}
                        <span
                          className="
                            flex h-11 w-11 shrink-0
                            items-center justify-center
                            rounded-xl
                            bg-ink/5
                            text-ink-soft
                            transition-colors
                            group-hover:bg-marigold/15
                            group-hover:text-ink
                          "
                        >
                          <Icon
                            size={20}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </span>

                        {/* Content */}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-ink">
                            {pick(category.name, lang)}
                          </span>

                          <span className="mt-0.5 block text-xs text-ink-faint">
                            Explore services
                          </span>
                        </span>

                        {/* Arrow */}
                        <ArrowRight
                          size={17}
                          className="
                            shrink-0
                            text-ink-faint
                            transition-transform
                            group-hover:translate-x-1
                            group-hover:text-ink
                          "
                        />
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="border-t border-line bg-white/50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t.home.howItWorks}
            </h2>
          </div>

          <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {[
              [t.home.step1Title, t.home.step1Body],
              [t.home.step2Title, t.home.step2Body],
              [t.home.step3Title, t.home.step3Body],
            ].map(([title, body], index) => (
              <div key={title} className="relative">
                {/* Number */}
                <div
                  className="
                    mb-5 flex h-11 w-11
                    items-center justify-center
                    rounded-full
                    border-2 border-marigold
                    bg-white
                    text-sm font-semibold
                    shadow-sm
                  "
                >
                  {index + 1}
                </div>

                {/* Title */}
                <h3 className="mb-2 font-semibold text-ink">{title}</h3>

                {/* Description */}
                <p className="text-sm leading-6 text-ink-soft">{body}</p>

                {/* Connector */}
                {index < 2 && (
                  <div
                    className="
                      absolute left-11 top-5
                      hidden h-px
                      w-[calc(100%-2rem)]
                      bg-ink/10
                      sm:block
                    "
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
