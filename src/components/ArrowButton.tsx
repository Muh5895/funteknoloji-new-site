import { Link } from "@tanstack/react-router";

interface ArrowButtonProps {
  to?: string;
  href?: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "green";
  className?: string;
  direction?: "left" | "right";
}

export default function ArrowButton({
  to,
  href,
  children,
  variant = "dark",
  className = "",
  direction = "right",
}: ArrowButtonProps) {
  const variants = {
    dark: "btn-fun btn-fun-dark",
    light: "btn-fun btn-fun-light",
    green: "btn-fun btn-fun-green",
  };

  const content = (
    <>
      {direction === "left" && (
        <svg
          className="h-5 w-5 rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      )}
      <span>{children}</span>
      {direction === "right" && (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      )}
    </>
  );

  const cls = `${variants[variant]} ${className}`;

  if (to)
    return (
      <Link to={to} className={cls}>
        {content}
      </Link>
    );
  return (
    <a href={href || "#"} className={cls}>
      {content}
    </a>
  );
}
