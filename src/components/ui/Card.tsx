import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-card p-6 ${
        hover ? "hover:bg-card-hover transition-colors duration-200" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
