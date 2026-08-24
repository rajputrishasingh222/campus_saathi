import {
  MapPin,
  Bell,
  CalendarDays,
  Users,
  Phone,
  Info,
  ArrowRight,
  ShieldAlert,
  Clock,
} from 'lucide-react';
import type { PageId } from '@/App';
import { useNotices, useEvents } from '@/lib/hooks';
import { Badge } from '@/components/ui';

const QUICK_LINKS: {
  id: PageId;
  label: string;
  desc: string;
  icon: typeof MapPin;
  color: string;
}[] = [
  { id: 'map', label: 'Campus Map', desc: 'Find classrooms & labs', icon: MapPin, color: 'from-teal-500 to-cyan-600' },
  { id: 'notices', label: 'Notices', desc: 'Latest announcements', icon: Bell, color: 'from-amber-500 to-orange-500' },
  { id: 'events', label: 'Events', desc: 'Hackathons & fests', icon: CalendarDays, color: 'from-blue-500 to-indigo-600' },
  { id: 'clubs', label: 'Clubs', desc: 'Join a community', icon: Users, color: 'from-purple-500 to-pink-600' },
  { id: 'contacts', label: 'Contacts', desc: 'Emergency & office', icon: Phone, color: 'from-red-500 to-rose-600' },
  { id: 'info', label: 'College Info', desc: 'About the campus', icon: Info, color: 'from-emerald-500 to-green-600' },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function HomePage({
  navigate,
}: {
  navigate: (id: PageId) => void;
}) {
  const { data: notices } = useNotices();
  const { data: events } = useEvents();

  const latestNotices = notices.slice(0, 4);
  const upcomingEvents = events
    .filter((e) => new Date(e.event_date) >= new Date('2026-08-19'))
    .slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Welcome, batch of 2026
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Find your way around campus, <span className="text-teal-400">all in one place.</span>
            </h1>
            <p className="mt-5 text-lg text-slate-300 max-w-2xl leading-relaxed">
              Campus Saathi helps new students discover classrooms, labs, notices,
              events, clubs, and important contacts — everything you need to feel
              at home from day one.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('map')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold transition-colors shadow-lg shadow-teal-500/20"
              >
                Explore the campus
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('notices')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-colors border border-white/20"
              >
                <Bell className="w-4 h-4" />
                Latest notices
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className="group bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all text-left"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm sm:text-base">{link.label}</h3>
                <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">{link.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <button
          onClick={() => navigate('contacts')}
          className="w-full flex items-center gap-4 bg-red-50 border border-red-200 rounded-2xl p-4 hover:bg-red-100 transition-colors text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-red-900">Emergency? Need help?</h3>
            <p className="text-sm text-red-700">Security, medical, and anti-ragging contacts available 24x7</p>
          </div>
          <ArrowRight className="w-5 h-5 text-red-600 hidden sm:block" />
        </button>
      </section>

      {/* Latest Notices + Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Notices */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Latest Notices</h2>
              <button
                onClick={() => navigate('notices')}
                className="text-sm font-medium text-teal-600 hover:text-teal-700 inline-flex items-center gap-1"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-3">
              {latestNotices.length === 0 && (
                <p className="text-slate-500 text-sm py-8 text-center bg-white rounded-xl border border-slate-200">No notices yet.</p>
              )}
              {latestNotices.map((n) => (
                <button
                  key={n.id}
                  onClick={() => navigate('notices')}
                  className="w-full text-left bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-slate-900 text-sm leading-snug">{n.title}</h3>
                    {n.priority === 'high' && <Badge color="red">High</Badge>}
                  </div>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{n.body}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    {formatDate(n.posted_at)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Upcoming Events</h2>
              <button
                onClick={() => navigate('events')}
                className="text-sm font-medium text-teal-600 hover:text-teal-700 inline-flex items-center gap-1"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-3">
              {upcomingEvents.length === 0 && (
                <p className="text-slate-500 text-sm py-8 text-center bg-white rounded-xl border border-slate-200">No upcoming events.</p>
              )}
              {upcomingEvents.map((e) => (
                <button
                  key={e.id}
                  onClick={() => navigate('events')}
                  className="w-full text-left bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white">
                      <span className="text-lg font-bold leading-none">
                        {new Date(e.event_date).getDate()}
                      </span>
                      <span className="text-xs uppercase mt-0.5">
                        {new Date(e.event_date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge color={e.category === 'hackathon' ? 'purple' : e.category === 'sports' ? 'green' : e.category === 'technical' ? 'blue' : 'orange'}>
                          {e.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-slate-900 text-sm leading-snug">{e.title}</h3>
                      <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {e.venue}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Classrooms & Labs', value: '20+', icon: MapPin },
            { label: 'Active Clubs', value: '8', icon: Users },
            { label: 'Events / Year', value: '30+', icon: CalendarDays },
            { label: 'Emergency Contacts', value: '4', icon: ShieldAlert },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-200 text-center">
                <div className="w-10 h-10 mx-auto rounded-xl bg-teal-50 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-teal-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
