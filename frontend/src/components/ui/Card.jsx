export default function Card({
  className = "",
  children,
  ...props
}) {
  return (
    <div
      className={`
        rounded-[20px]
        border border-ink/10
        bg-white
        shadow-[0_6px_24px_rgba(15,23,42,0.05)]
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}