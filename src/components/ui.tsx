import type { ReactNode } from 'react';

export function PageHeader({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon?: ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center gap-4">
          {icon && (
            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
            <p className="mt-1.5 text-slate-300 text-base sm:text-lg max-w-2xl">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center py-24 px-4">
      <div className="text-center max-w-md">
        <div className="w-12 h-12 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-3">
          <span className="text-red-500 text-xl">!</span>
        </div>
        <p className="text-slate-700 font-medium">Something went wrong</p>
        <p className="text-slate-500 text-sm mt-1">{message}</p>
      </div>
    </div>
  );
}

export function Badge({
  children,
  color = 'slate',
}: {
  children: ReactNode;
  color?: 'slate' | 'teal' | 'amber' | 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'cyan';
}) {
  const colors: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-700',
    teal: 'bg-teal-100 text-teal-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
    cyan: 'bg-cyan-100 text-cyan-700',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}
