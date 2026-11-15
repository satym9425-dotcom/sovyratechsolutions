export default function Logo({ dark = false, className = "" }) {
  return (
    <span
      className={`inline-flex items-center ${
        dark ? "rounded-xl bg-white px-3 py-2" : ""
      } ${className}`}
      data-testid="brand-logo"
    >
      <img
        src="/sovyra.jpeg"
        alt="Sovyra tech solutions — Your Goal, Our Mission"
        className={dark ? "h-20 w-auto" : "h-20 w-auto"}
        draggable={false}
      />
    </span>
  );
}
