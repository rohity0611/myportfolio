import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-28 pb-20 flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-2">Page Not Found</h2>
        <p className="text-muted mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
