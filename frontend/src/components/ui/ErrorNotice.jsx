export default function ErrorNotice({ message }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="
        rounded-xl
        border border-rust/20
        bg-rust-light
        px-4 py-3
        text-sm font-medium
        leading-5 text-rust
        shadow-sm
      "
    >
      {message}
    </div>
  );
}