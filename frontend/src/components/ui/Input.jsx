export function Input({ label, id, className = "", ...props }) {
  return (
    <label htmlFor={id} className="block">
      {label && (
        <span className="mb-2 block text-sm font-semibold text-ink-soft">
          {label}
        </span>
      )}

      <input
        id={id}
        className={`
          w-full rounded-xl
          border border-ink/10
          bg-white
          px-4 py-2.5
          text-sm text-ink
          shadow-sm
          placeholder:text-ink-faint
          transition-all duration-200
          hover:border-ink/20
          focus:border-marigold/60
          focus:outline-none
          focus:ring-4
          focus:ring-marigold/10
          ${className}
        `}
        {...props}
      />
    </label>
  );
}

export function Textarea({
  label,
  id,
  className = "",
  ...props
}) {
  return (
    <label htmlFor={id} className="block">
      {label && (
        <span className="mb-2 block text-sm font-semibold text-ink-soft">
          {label}
        </span>
      )}

      <textarea
        id={id}
        className={`
          w-full rounded-xl
          border border-ink/10
          bg-white
          px-4 py-3
          text-sm leading-6 text-ink
          shadow-sm
          placeholder:text-ink-faint
          transition-all duration-200
          hover:border-ink/20
          focus:border-marigold/60
          focus:outline-none
          focus:ring-4
          focus:ring-marigold/10
          ${className}
        `}
        {...props}
      />
    </label>
  );
}

export function Select({
  label,
  id,
  className = "",
  children,
  ...props
}) {
  return (
    <label htmlFor={id} className="block">
      {label && (
        <span className="mb-2 block text-sm font-semibold text-ink-soft">
          {label}
        </span>
      )}

      <select
        id={id}
        className={`
          w-full rounded-xl
          border border-ink/10
          bg-white
          px-4 py-2.5
          text-sm text-ink
          shadow-sm
          transition-all duration-200
          hover:border-ink/20
          focus:border-marigold/60
          focus:outline-none
          focus:ring-4
          focus:ring-marigold/10
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}