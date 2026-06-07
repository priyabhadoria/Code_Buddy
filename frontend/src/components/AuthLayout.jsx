import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';

/** Shared full-page background — matches AppShell / review layout */
export function PageBackground({ children, className = '' }) {
  return (
    <div className={`page-shell relative overflow-hidden ${className}`}>
      <div className="page-glow-orb" aria-hidden="true" />
      {children}
    </div>
  );
}

/** Centered auth layout (Sign In / Sign Up) */
export default function AuthLayout({ children }) {
  return (
    <PageBackground className="min-h-screen flex items-center justify-center">
      <main className="w-full max-w-md px-4 md:px-0 z-10 relative">{children}</main>
    </PageBackground>
  );
}

export function AuthCard({ children }) {
  return <div className="auth-card p-8 flex flex-col gap-6">{children}</div>;
}

export function AuthHeader() {
  return (
    <div className="text-center flex flex-col gap-1">
      <Link
        to="/"
        className="flex items-center justify-center gap-2 mb-1 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-lg"
      >
        <Terminal className="text-accent w-8 h-8" aria-hidden="true" />
        <h1 className="text-3xl font-extrabold text-accent tracking-tight">Code Buddy</h1>
      </Link>
    </div>
  );
}
