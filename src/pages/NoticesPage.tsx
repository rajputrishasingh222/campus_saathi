import { useState, useMemo } from 'react';
import { Bell, Clock, AlertCircle, Info } from 'lucide-react';
import { useNotices } from '@/lib/hooks';
import { PageHeader, LoadingState, ErrorState, Badge } from '@/components/ui';

const CATEGORIES = ['all', 'academic', 'general', 'hostel', 'sports'];

const CATEGORY_COLORS: Record<string, 'slate' | 'teal' | 'amber' | 'blue' | 'green'> = {
  academic: 'blue',
  general: 'teal',
  hostel: 'amber',
  sports: 'green',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function NoticesPage() {
  const { data, loading, error } = useNotices();
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    return data.filter((n) => category === 'all' || n.category === category);
  }, [data, category]);

  const pinned = filtered.filter((n) => n.priority === 'high');
  const rest = filtered.filter((n) => n.priority !== 'high');

  return (
    <div>
      <PageHeader
        title="Notices"
        subtitle="Stay updated with the latest announcements from the administration."
        icon={<Bell className="w-7 h-7" />}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                category === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'All Notices' : cat}
            </button>
          ))}
        </div>

        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}

        {!loading && !error && (
          <div className="space-y-6">
            {pinned.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <h2 className="text-sm font-bold text-red-700 uppercase tracking-wide">High Priority</h2>
                </div>
                <div className="space-y-3">
                  {pinned.map((n) => (
                    <div
                      key={n.id}
                      className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4"
                    >
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="font-semibold text-slate-900">{n.title}</h3>
                        <Badge color="red">High</Badge>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{n.body}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" /> {formatDate(n.posted_at)}
                        </span>
                        <Badge color={CATEGORY_COLORS[n.category] ?? 'slate'}>{n.category}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {rest.length > 0 && (
              <div>
                {pinned.length > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-5 h-5 text-slate-400" />
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">General</h2>
                  </div>
                )}
                <div className="space-y-3">
                  {rest.map((n) => (
                    <div
                      key={n.id}
                      className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="font-semibold text-slate-900">{n.title}</h3>
                        <Badge color={CATEGORY_COLORS[n.category] ?? 'slate'}>{n.category}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{n.body}</p>
                      <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-400">
                        <Clock className="w-3 h-3" /> {formatDate(n.posted_at)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <Bell className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium">No notices found</p>
                <p className="text-slate-400 text-sm mt-1">Check back later for updates.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
