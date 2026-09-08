
import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function NotFound() {
  const { lang } = useLanguage();

  return (
    <div className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#fafaf9]">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[-260px] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.08),transparent_68%)] blur-3xl" />

        <div className="absolute inset-0 opacity-[0.018] [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      <main className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-xl items-center justify-center px-5 py-20">
        <div className="w-full text-center">
          {/* Icon */}
          <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-ink/10 bg-white text-ink-soft shadow-sm">
            <Compass size={25} strokeWidth={1.7} />
          </div>

          {/* 404 */}
          <p className="font-display text-7xl font-semibold tracking-[-0.05em] text-ink sm:text-8xl">
            404
          </p>

          {/* Content */}
          <div className="mx-auto mt-5 max-w-md">
            <h1 className="text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
              {lang === "ne"
                ? "यो पृष्ठ फेला परेन।"
                : "This page could not be found."}
            </h1>

            <p className="mt-2 text-sm leading-6 text-ink-soft">
              {lang === "ne"
                ? "तपाईंले खोज्नुभएको पृष्ठ उपलब्ध छैन वा हटाइएको हुन सक्छ।"
                : "The page you are looking for may have been moved or is no longer available."}
            </p>
          </div>

          {/* Action */}
          <Link
            to="/"
            className="mx-auto mt-8 inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm font-semibold text-ink-soft shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20 hover:text-ink hover:shadow-md"
          >
            <ArrowLeft size={16} strokeWidth={1.9} />

            <span>
              {lang === "ne"
                ? "गृहपृष्ठमा फर्कनुहोस्"
                : "Back to home"}
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}

