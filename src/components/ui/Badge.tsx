interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-white/5 text-foreground border border-border",
    accent: "bg-accent/10 text-accent border border-accent/20",
    muted: "bg-white/5 text-muted border border-border",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
