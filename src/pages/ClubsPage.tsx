import { useState, useMemo } from 'react';
import { Users, Calendar, Mail, Code2, Music, Trophy, Cpu, Camera, Lightbulb } from 'lucide-react';
import { useClubs } from '@/lib/hooks';
import { PageHeader, LoadingState, ErrorState, Badge } from '@/components/ui';

const CATEGORIES = [
  { value: 'all', label: 'All Clubs' },
  { value: 'technical', label: 'Technical' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'sports', label: 'Sports' },
];

const CATEGORY_ICONS: Record<string, typeof Code2> = {
  technical: Code2,
  cultural: Music,
  sports: Trophy,
};

const CATEGORY_COLORS: Record<string, string> = {
  technical: 'from-blue-500 to-indigo-600',
  cultural: 'from-orange-500 to-amber-500',
  sports: 'from-green-500 to-emerald-600',
};

export default function ClubsPage() {
  const { data, loading, error } = useClubs();
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    return data.filter((c) => category === 'all' || c.category === category);
  }, [data, category]);

  return (
    <div>
      <PageHeader
        title="Clubs & Societies"
        subtitle="Find your tribe. Join a club, explore your passions, and make lifelong friends."
        icon={<Users className="w-7 h-7" />}
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
                  <Users className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium">No clubs found</p>
                <p className="text-slate-400 text-sm mt-1">Try a different category.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((club) => {
                  const Icon = CATEGORY_ICONS[club.category] ?? Lightbulb;
                  const gradient = CATEGORY_COLORS[club.category] ?? 'from-slate-400 to-slate-600';
                  return (
                    <div
                      key={club.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className={`h-24 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full blur-2xl" />
                        </div>
                        <Icon className="w-12 h-12 text-white relative" />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-slate-900 text-lg">{club.name}</h3>
                          <Badge color={club.category === 'technical' ? 'blue' : club.category === 'cultural' ? 'orange' : 'green'}>
                            {club.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">{club.description}</p>
                        <div className="space-y-1.5 text-sm">
                          {club.meeting_day && (
                            <div className="flex items-center gap-2 text-slate-700">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              Meets: {club.meeting_day}
                            </div>
                          )}
                          {club.contact && (
                            <div className="flex items-center gap-2 text-slate-700">
                              <Mail className="w-4 h-4 text-slate-400" />
                              <span className="truncate">{club.contact}</span>
                            </div>
                          )}
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
