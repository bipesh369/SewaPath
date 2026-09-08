// A literal path/trail rendering for the journey feature:
// the product's core metaphor (SewaPath) made concrete
// for a genuinely sequential set of steps.

export default function StepPath({ steps, renderStep }) {
  return (
    <ol className="relative pl-12">
      {/* Connecting path */}
      <span
        aria-hidden="true"
        className="absolute left-[19px] top-5 bottom-5 w-px bg-gradient-to-b from-marigold/60 via-line to-line"
      />

      {steps.map((step, i) => (
        <li
          key={step._id || i}
          className="relative pb-9 last:pb-0"
        >
          {/* Step marker */}
          <span
            className="
              absolute -left-12 top-0
              flex h-10 w-10 items-center justify-center
              rounded-xl
              border border-marigold/40
              bg-paper
              text-sm font-semibold text-ink
              shadow-[0_4px_14px_rgba(15,23,42,0.06)]
              ring-4 ring-[#fafaf9]
            "
          >
            {i + 1}
          </span>

          {/* Step content */}
          <div className="min-w-0">
            {renderStep(step, i)}
          </div>
        </li>
      ))}
    </ol>
  );
}