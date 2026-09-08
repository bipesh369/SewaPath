import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

import Button from "./ui/Button.jsx";

function Logo() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="#1F3A3D" />

      <path
        d="M8 22 C 12 14, 20 14, 24 8"
        stroke="#E0A72E"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      <circle cx="24" cy="8" r="2.6" fill="#E0A72E" />
      <circle cx="8" cy="22" r="2.6" fill="#F6F4EE" />
    </svg>
  );
}

const linkCls = ({ isActive }) => `
  relative py-2 text-sm font-medium
  transition-colors duration-200
  ${isActive ? "text-ink" : "text-ink-faint hover:text-ink"}
`;

export default function Header() {
  const { t, toggleLang } = useLanguage();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-6xl items-center justify-between gap-4 px-5">
        {/* Brand */}
        <Link
  to="/"
  onClick={(e) => {
    closeMobileMenu();

    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }}
  className="group flex shrink-0 items-center gap-2.5"
>
          <div
            className="
              rounded-[9px]
              transition-transform duration-200
              group-hover:scale-[1.03]
            "
          >
            <Logo />
          </div>

          <span className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">
            {t.appName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
  <NavLink
    to="/"
    end
    onClick={() => {
      if (window.location.pathname === "/") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }}
    className={linkCls}
  >
    {t.nav.home}
  </NavLink>

          <NavLink to="/services" className={linkCls}>
            {t.nav.services}
          </NavLink>

          {user && (
            <NavLink to="/dashboard" className={linkCls}>
              {t.nav.dashboard}
            </NavLink>
          )}

          {isAdmin && (
            <NavLink to="/admin" className={linkCls}>
              {t.nav.admin}
            </NavLink>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2.5 md:flex">
          {/* Language */}
          <button
            onClick={toggleLang}
            className="
              rounded-full
              border border-ink/10
              bg-white/70
              px-3 py-1.5
              text-sm font-medium text-ink-soft
              shadow-sm
              transition-all duration-200
              hover:border-ink/20
              hover:bg-white
              hover:text-ink
            "
            aria-label="Switch language"
          >
            {t.common.language}
          </button>

          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="rounded-full px-3.5"
            >
              {t.nav.logout}
            </Button>
          ) : (
            <>
              <Button
                as="link"
                to="/login"
                variant="ghost"
                size="sm"
                className="rounded-full px-3.5"
              >
                {t.nav.login}
              </Button>

              <Button
                to="/register"
                variant="accent"
                size="sm"
                className="
                  rounded-full
                  px-4
                  font-semibold
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:shadow-md
                "
              >
                {t.nav.register}
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-ink/10
            bg-white/70
            text-ink
            transition-all
            duration-200
            hover:bg-white
            md:hidden
          "
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6L18 18" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeMobileMenu}
            className="
        fixed
        inset-0
        z-40
        bg-black/20
        backdrop-blur-[2px]
        md:hidden
      "
          />

          {/* Side Drawer */}
          <div
            className="
        fixed
        right-0
        top-[72px]
        z-50
        h-[calc(100vh-72px)]
        w-[50vw]
        min-w-[240px]
        max-w-[320px]
        overflow-y-auto
        border-l
        border-ink/10
        bg-paper
        px-4
        py-5
        shadow-[-12px_0_35px_rgba(15,23,42,0.10)]
        md:hidden
      "
          >
            <nav className="flex flex-col gap-1">
              {/* Home */}
              <NavLink
                to="/"
                end
                onClick={closeMobileMenu}
                className={({ isActive }) => `
            rounded-xl
            px-4
            py-3
            text-sm
            font-medium
            transition-colors
            ${
              isActive
                ? "bg-ink/5 text-ink"
                : "text-ink-faint hover:bg-ink/5 hover:text-ink"
            }
          `}
              >
                {t.nav.home}
              </NavLink>

              {/* Services */}
              <NavLink
                to="/services"
                onClick={closeMobileMenu}
                className={({ isActive }) => `
            rounded-xl
            px-4
            py-3
            text-sm
            font-medium
            transition-colors
            ${
              isActive
                ? "bg-ink/5 text-ink"
                : "text-ink-faint hover:bg-ink/5 hover:text-ink"
            }
          `}
              >
                {t.nav.services}
              </NavLink>

              {/* Dashboard */}
              {user && (
                <NavLink
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className={({ isActive }) => `
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              transition-colors
              ${
                isActive
                  ? "bg-ink/5 text-ink"
                  : "text-ink-faint hover:bg-ink/5 hover:text-ink"
              }
            `}
                >
                  {t.nav.dashboard}
                </NavLink>
              )}

              {/* Admin */}
              {isAdmin && (
                <NavLink
                  to="/admin"
                  onClick={closeMobileMenu}
                  className={({ isActive }) => `
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              transition-colors
              ${
                isActive
                  ? "bg-ink/5 text-ink"
                  : "text-ink-faint hover:bg-ink/5 hover:text-ink"
              }
            `}
                >
                  {t.nav.admin}
                </NavLink>
              )}

              {/* Divider */}
              <div className="my-3 border-t border-ink/10" />

              {/* Language */}
              <button
                onClick={toggleLang}
                className="
            rounded-xl
            px-4
            py-3
            text-left
            text-sm
            font-medium
            text-ink-soft
            transition-colors
            hover:bg-ink/5
            hover:text-ink
          "
              >
                {t.common.language}
              </button>

              {/* Auth */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="
              mt-1
              rounded-xl
              px-4
              py-3
              text-left
              text-sm
              font-medium
              text-ink-soft
              transition-colors
              hover:bg-ink/5
              hover:text-ink
            "
                >
                  {t.nav.logout}
                </button>
              ) : (
                <div className="mt-3 flex flex-col gap-2">
                  <Button
                    as="link"
                    to="/login"
                    variant="ghost"
                    size="sm"
                    onClick={closeMobileMenu}
                    className="w-full justify-center rounded-full"
                  >
                    {t.nav.login}
                  </Button>

                  <Button
                    to="/register"
                    variant="accent"
                    size="sm"
                    onClick={closeMobileMenu}
                    className="w-full justify-center rounded-full font-semibold"
                  >
                    {t.nav.register}
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
