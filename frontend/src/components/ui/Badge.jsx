const TONES = {
  neutral: 'bg-ink/8 text-ink-soft',
  moss: 'bg-moss-light text-moss-dark',
  rust: 'bg-rust-light text-rust',
  marigold: 'bg-marigold-light text-marigold-dark',
};

export default function Badge({
  tone = 'neutral',
  className = '',
  children,
}) {
  const toneClass = TONES[tone] || TONES.neutral;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}