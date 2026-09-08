
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";

import { useLanguage } from "../i18n/LanguageContext.jsx";
import { pick } from "../i18n/translations.js";
import { listServices } from "../api/services.api.js";
import { listCategories } from "../api/categories.api.js";
import ServiceCard from "../components/ServiceCard.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import ErrorNotice from "../components/ui/ErrorNotice.jsx";

export default function Services() {
  const { t, lang } = useLanguage();

  const [params, setParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const visibleServices = services.slice(0, 14);

  const q = params.get("q") || "";
  const goal = params.get("goal") || "";
  const category = params.get("category") || "";

  const [searchText, setSearchText] = useState(q || goal);

  useEffect(() => {
    listCategories().then((res) =>
      setCategories(res.categories),
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");

    listServices({ q, goal, category })
      .then((res) => setServices(res.services))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q, goal, category]);

  const handleSearch = (e) => {
    e.preventDefault();

    const next = new URLSearchParams();

    if (searchText.trim()) {
      next.set("q", searchText.trim());
    }

    if (category) {
      next.set("category", category);
    }

    setParams(next);
  };

  const handleCategory = (id) => {
    const next = new URLSearchParams(params);

    if (id) {
      next.set("category", id);
    } else {
      next.delete("category");
    }

    next.delete("q");
    next.delete("goal");

    setParams(next);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafaf9]">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[-260px] h-[600px] w-[850px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.07),transparent_68%)] blur-3xl" />

        <div className="absolute inset-0 opacity-[0.015] [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-5 py-10 sm:py-14">
        {/* Header */}
        <header className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-marigold">
            SewaPath
          </p>

          <h1 className="text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl">
            {t.services.title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
            Find the government service you need and explore the steps,
            documents and responsible office.
          </p>
        </header>

        {/* Search & Filters */}
        <section className="mb-9 rounded-[22px] border border-ink/10 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:p-6">
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                size={18}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
              />

              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={t.services.searchPlaceholder}
                className="h-12 w-full rounded-xl border border-ink/10 bg-ink/[0.018] pl-11 pr-4 text-sm text-ink placeholder:text-ink-faint transition-all duration-200 focus:border-ink/25 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ink/5"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ink px-5 text-sm font-semibold text-paper shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Search size={15} strokeWidth={2} />
              Search
            </button>
          </form>

          {/* Category filter */}
          <div className="mt-5 border-t border-ink/10 pt-5">
            <div className="mb-3 flex items-center gap-2">
              <SlidersHorizontal
                size={15}
                strokeWidth={1.8}
                className="text-ink-soft"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
                Categories
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategory("")}
                className={`rounded-xl border px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                  !category
                    ? "border-ink bg-ink text-paper shadow-sm"
                    : "border-ink/10 bg-ink/[0.018] text-ink-soft hover:border-ink/20 hover:bg-white hover:text-ink"
                }`}
              >
                {t.services.allCategories}
              </button>

              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleCategory(cat._id)}
                  className={`rounded-xl border px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                    category === cat._id
                      ? "border-ink bg-ink text-paper shadow-sm"
                      : "border-ink/10 bg-ink/[0.018] text-ink-soft hover:border-ink/20 hover:bg-white hover:text-ink"
                  }`}
                >
                  {pick(cat.name, lang)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        {loading ? (
          <div className="flex min-h-[280px] items-center justify-center">
            <Spinner label={t.common.loading} />
          </div>
        ) : error ? (
          <ErrorNotice message={error} />
        ) : services.length === 0 ? (
          <div className="rounded-[22px] border border-dashed border-ink/15 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ink/5 text-ink-soft">
              <Search size={21} strokeWidth={1.7} />
            </div>

            <p className="text-sm font-medium text-ink">
              {t.services.noResults}
            </p>
          </div>
        ) : (
          <>
            {/* Results heading */}
            <div className="mb-5 flex items-end justify-between border-b border-ink/10 pb-4">
              <div>
                <h2 className="text-lg font-semibold text-ink">
                  Available services
                </h2>

                <p className="mt-1 text-xs text-ink-faint">
                  {t.services.resultsCount(
                    visibleServices.length,
                  )}
                </p>
              </div>
            </div>

            {/* Service cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleServices.map((svc) => (
                <ServiceCard
                  key={svc._id}
                  service={svc}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
