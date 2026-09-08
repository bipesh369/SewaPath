export default function Spinner({ label }) {
  return (
    <div className="flex items-center gap-3 text-ink-faint">
      <span
        aria-hidden="true"
        className="
          h-4 w-4
          animate-spin
          rounded-full
          border-2
          border-ink/15
          border-t-marigold
        "
      />

      {label && (
        <span className="text-sm font-medium text-ink-soft">
          {label}
        </span>
      )}
    </div>
  );
}