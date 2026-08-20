import { useState, useMemo } from 'react';
import { MapPin, Search, Building2, FlaskConical, DoorOpen, Briefcase, Building, Layers } from 'lucide-react';
import { useCampusLocations } from '@/lib/hooks';
import { PageHeader, LoadingState, ErrorState, Badge } from '@/components/ui';
import type { CampusLocation } from '@/lib/types';

const CATEGORIES = [
  { value: 'all', label: 'All', icon: Building },
  { value: 'classroom', label: 'Classrooms', icon: DoorOpen },
  { value: 'lab', label: 'Labs', icon: FlaskConical },
  { value: 'block', label: 'Blocks', icon: Building2 },
  { value: 'office', label: 'Offices', icon: Briefcase },
  { value: 'facility', label: 'Facilities', icon: Layers },
];

const BLOCK_COLORS: Record<string, string> = {
  'Admin Block': 'border-teal-300 bg-teal-50',
  'Tech Block': 'border-blue-300 bg-blue-50',
  'Science Block': 'border-purple-300 bg-purple-50',
  'Academic Block A': 'border-amber-300 bg-amber-50',
  'Academic Block B': 'border-orange-300 bg-orange-50',
  'Library Block': 'border-cyan-300 bg-cyan-50',
  'Health Block': 'border-red-300 bg-red-50',
  'Sports Block': 'border-green-300 bg-green-50',
  'Amenities Block': 'border-slate-300 bg-slate-50',
  'Convention Block': 'border-indigo-300 bg-indigo-50',
  'Hostel Block': 'border-pink-300 bg-pink-50',
};

export default function CampusMapPage() {
  const { data, loading, error } = useCampusLocations();
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return data.filter((loc) => {
      const matchCat = category === 'all' || loc.category === category;
      const q = query.trim().toLowerCase();
      const matchQuery =
        q === '' ||
        loc.name.toLowerCase().includes(q) ||
        loc.block.toLowerCase().includes(q) ||
        (loc.room ?? '').toLowerCase().includes(q) ||
        (loc.landmark ?? '').toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [data, category, query]);

  const blocks = useMemo(() => {
    const map = new Map<string, CampusLocation[]>();
    filtered.forEach((loc) => {
      const arr = map.get(loc.block) ?? [];
      arr.push(loc);
      map.set(loc.block, arr);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div>
      <PageHeader
        title="Campus Map"
        subtitle="Find your classrooms, labs, offices, and facilities across every block."
        icon={<MapPin className="w-7 h-7" />}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, block, room, or landmark..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === cat.value
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}

        {!loading && !error && (
          <>
            <p className="text-sm text-slate-500 mb-6">
              Showing {filtered.length} location{filtered.length !== 1 ? 's' : ''}
            </p>

            {blocks.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium">No locations found</p>
                <p className="text-slate-400 text-sm mt-1">Try a different search or category.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {blocks.map(([blockName, locations]) => (
                  <div key={blockName}>
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-5 h-5 text-slate-700" />
                      <h2 className="text-lg font-bold text-slate-900">{blockName}</h2>
                      <Badge>{locations.length}</Badge>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {locations.map((loc) => (
                        <div
                          key={loc.id}
                          className={`rounded-xl p-4 border-2 ${BLOCK_COLORS[blockName] ?? 'border-slate-200 bg-white'} hover:shadow-md transition-shadow`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900 text-sm">{loc.name}</h3>
                            <Badge color="slate">{loc.category}</Badge>
                          </div>
                          {loc.description && (
                            <p className="text-sm text-slate-600 mt-1 leading-relaxed">{loc.description}</p>
                          )}
                          <div className="mt-3 space-y-1 text-xs text-slate-500">
                            {loc.room && (
                              <p className="flex items-center gap-1.5">
                                <DoorOpen className="w-3.5 h-3.5" /> Room {loc.room}
                              </p>
                            )}
                            {loc.floor && (
                              <p className="flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5" /> {loc.floor}
                              </p>
                            )}
                            {loc.landmark && (
                              <p className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" /> {loc.landmark}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
