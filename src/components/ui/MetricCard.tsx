interface MetricCardProps {
  label: string;
  value: string;
  placeholder?: boolean;
}

export default function MetricCard({ label, value, placeholder }: MetricCardProps) {
  return (
    <div className="text-center p-4 rounded-xl border border-border bg-card">
      <div
        className={`text-3xl sm:text-4xl font-bold tracking-tight ${
          placeholder ? "text-muted" : "gradient-text"
        }`}
      >
        {value}
      </div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </div>
  );
}
