interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : ""} ${className}`}>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-muted max-w-2xl leading-relaxed">{subtitle}</p>}
    </div>
  );
}
