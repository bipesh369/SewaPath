import { Link } from "react-router-dom";

const VARIANTS = {
  primary:
    "bg-ink text-paper shadow-sm hover:bg-ink-soft hover:shadow-md",
  accent:
    "bg-marigold text-ink shadow-sm hover:bg-marigold-dark hover:shadow-md",
  outline:
    "border border-ink/15 bg-white text-ink hover:border-ink/25 hover:bg-ink/[0.03]",
  ghost:
    "text-ink hover:bg-ink/[0.05]",
  danger:
    "border border-rust/25 bg-white text-rust hover:border-rust/40 hover:bg-rust/10",
};

const SIZES = {
  sm: "px-3.5 py-1.5 text-sm",
  md: "px-4.5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export default function Button({
  as,
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const cls = `
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    font-semibold
    transition-all duration-200
    active:translate-y-0
    disabled:pointer-events-none
    disabled:opacity-50
    ${VARIANTS[variant]}
    ${SIZES[size]}
    ${className}
  `;

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}