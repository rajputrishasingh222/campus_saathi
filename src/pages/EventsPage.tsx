import { useState, useMemo } from 'react';
import { CalendarDays, MapPin, Users, Trophy, Code2, Music, Cpu } from 'lucide-react';
import { useEvents } from '@/lib/hooks';
import { PageHeader, LoadingState, ErrorState, Badge } from '@/components/ui';

const CATEGORIES = [
  { value: 'all', label: 'All Events' },
  { value: 'hackathon', label: 'Hackathons' },
  { value: 'technical', label: 'Technical' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'sports', label: 'Sports' },
];

const CATEGORY_META: Record<string, { color: 'purple' | 'blue' | 'orange' | 'green'; icon: typeof Code2 }> = {
  hackathon: { color: 'purple', icon: Code2 },
  technical: { color: 'blue', icon: Cpu },
  cultural: { color: 'orange', icon: Music },
  sports: { color: 'green', icon: Trophy },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function EventsPage() {
  const { data, loading, error } = useEvents();
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    return data.filter((e) => category === 'all' || e.category === category);
  }, [data, category]);

  return (
    <div>
      <PageHeader
        title="Events"
        subtitle="Hackathons, cultural fests, sports meets, and technical workshops — don't miss out."
        icon={<CalendarDays className="w-7 h-7" />}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === cat.value
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}

        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <CalendarDays className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium">No events found</p>
                <p className="text-slate-400 text-sm mt-1">Try a different category.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((e) => {
                  const meta = CATEGORY_META[e.category] ?? { color: 'slate' as const, icon: CalendarDays };
                  const Icon = meta.icon;
                  return (
                    <div
                      key={e.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                    >
                      <div className={`h-2 bg-gradient-to-r ${
                        e.category === 'hackathon' ? 'from-purple-500 to-pink-500' :
                        e.category === 'technical' ? 'from-blue-500 to-indigo-500' :
                        e.category === 'cultural' ? 'from-orange-500 to-amber-500' :
                        e.category === 'sports' ? 'from-green-500 to-emerald-500' :
                        'from-slate-400 to-slate-500'
                      }`} />
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            e.category === 'hackathon' ? 'bg-purple-100 text-purple-600' :
                            e.category === 'technical' ? 'bg-blue-100 text-blue-600' :
                            e.category === 'cultural' ? 'bg-orange-100 text-orange-600' :
                            e.category === 'sports' ? 'bg-green-100 text-green-600' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <Badge color={meta.color}>{e.category}</Badge>
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2">{e.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed flex-1">{e.description}</p>
                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-slate-700">
                            <CalendarDays className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            {formatDate(e.event_date)}
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            {e.venue}
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <Users className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            {e.organizer}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
