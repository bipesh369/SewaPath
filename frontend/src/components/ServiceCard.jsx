
import { ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

import { useLanguage } from "../i18n/LanguageContext.jsx";
import { pick } from "../i18n/translations.js";

import Card from "./ui/Card.jsx";
import Badge from "./ui/Badge.jsx";

export default function ServiceCard({ service }) {
  const { lang } = useLanguage();

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group block h-full focus:outline-none"
    >
      <Card
  className="
    flex h-full flex-col
    overflow-hidden
    rounded-[20px]
    border border-ink/10
    bg-white
    p-0
    shadow-[0_6px_24px_rgba(15,23,42,0.05)]

    transition-[transform,box-shadow,border-color]
    duration-300
    ease-out

    hover:-translate-y-1
    hover:border-ink/15
    hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]

    group-focus-visible:ring-2
    group-focus-visible:ring-marigold
    group-focus-visible:ring-offset-2
  "
>
        {/* Card header */}
        <div className="flex items-start justify-between gap-3 p-5 pb-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-marigold/10
                text-ink
                transition-colors
                group-hover:bg-marigold/20
              "
            >
              <Building2
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>

            {service.category && (
              <Badge tone="marigold">
                {pick(service.category.name, lang)}
              </Badge>
            )}
          </div>

          <ArrowRight
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
            className="
              shrink-0
              text-ink-faint
              transition-all duration-200
              group-hover:translate-x-1
              group-hover:text-ink
            "
          />
        </div>

        {/* Card content */}
        <div className="flex flex-1 flex-col px-5 pb-5">
          <h3
            className="
              text-lg font-semibold leading-snug
              tracking-tight text-ink
              transition-colors
              group-hover:text-ink
            "
          >
            {pick(service.title, lang)}
          </h3>

          {service.summary && (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-soft">
              {pick(service.summary, lang)}
            </p>
          )}

          {/* Card footer */}
          <div className="mt-auto pt-5">
            <div className="mb-4 h-px bg-ink/10" />

            <div className="flex items-center justify-between gap-3">
              {service.office?.level ? (
                <span className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                  {service.office.level}
                </span>
              ) : (
                <span className="text-xs text-ink-faint">
                  SewaPath service
                </span>
              )}

              <span
                className="
                  inline-flex items-center gap-1
                  text-sm font-semibold text-ink-soft
                  transition-colors
                  group-hover:text-ink
                "
              >
                View service
                <ArrowRight
                  size={15}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

