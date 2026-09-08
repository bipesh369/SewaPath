
import { NavLink, Outlet } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import { LayoutDashboard } from "lucide-react";

const linkCls = ({ isActive }) =>
  `relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
    isActive
      ? "bg-white text-ink shadow-sm ring-1 ring-ink/10"
      : "text-ink-soft hover:bg-white/70 hover:text-ink"
  }`;

export default function AdminLayout() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#fafaf9]">
      {/* Subtle background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[-300px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.07),transparent_68%)] blur-3xl" />

        <div className="absolute inset-0 opacity-[0.018] [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] [background-size:80px_80px]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-5 py-12 sm:py-16">
        {/* Header */}
        <header className="mb-9">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-white text-ink-soft shadow-sm">
              <LayoutDashboard size={19} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-marigold">
                SewaPath Admin
              </p>

              <h1 className="mt-1 text-3xl font-semibold tracking-[-0.03em] text-ink">
                {t.admin.title}
              </h1>
            </div>
          </div>
        </header>

        {/* Admin navigation */}
        <nav className="mb-10 rounded-2xl border border-ink/10 bg-white/80 p-1.5 shadow-sm backdrop-blur">
          <div className="flex flex-wrap gap-1">
            <NavLink to="/admin/services" className={linkCls}>
              {t.admin.services}
            </NavLink>

            <NavLink to="/admin/categories" className={linkCls}>
              {t.admin.categories}
            </NavLink>

            <NavLink to="/admin/offices" className={linkCls}>
              {t.admin.offices}
            </NavLink>
          </div>
        </nav>

        {/* Page content */}
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
}

