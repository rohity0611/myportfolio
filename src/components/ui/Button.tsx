import Link from "next/link";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  download,
  target,
  rel,
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover",
    secondary: "border border-border text-foreground hover:bg-white/5",
    ghost: "text-muted hover:text-foreground hover:bg-white/5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (href.startsWith("http") || download) {
      return (
        <a
          href={href}
          download={download}
          target={target}
          rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
