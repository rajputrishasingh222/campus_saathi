import { useState, useEffect } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import HomePage from '@/pages/HomePage';
import CampusMapPage from '@/pages/CampusMapPage';
import NoticesPage from '@/pages/NoticesPage';
import EventsPage from '@/pages/EventsPage';
import ClubsPage from '@/pages/ClubsPage';
import ContactsPage from '@/pages/ContactsPage';
import CollegeInfoPage from '@/pages/CollegeInfoPage';

export type PageId =
  | 'home'
  | 'map'
  | 'notices'
  | 'events'
  | 'clubs'
  | 'contacts'
  | 'info';

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'map', label: 'Campus Map' },
  { id: 'notices', label: 'Notices' },
  { id: 'events', label: 'Events' },
  { id: 'clubs', label: 'Clubs' },
  { id: 'contacts', label: 'Contacts' },
  { id: 'info', label: 'College Info' },
];

export default function App() {
  const [page, setPage] = useState<PageId>('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
  }, [page]);

  const navigate = (id: PageId) => setPage(id);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <span className="block text-lg font-bold text-slate-900 leading-tight">
                  Campus Saathi
                </span>
                <span className="block text-xs text-slate-500 leading-tight">
                  Your campus companion
                </span>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    page === item.id
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-2 space-y-0.5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    page === item.id
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        {page === 'home' && <HomePage navigate={navigate} />}
        {page === 'map' && <CampusMapPage />}
        {page === 'notices' && <NoticesPage />}
        {page === 'events' && <EventsPage />}
        {page === 'clubs' && <ClubsPage />}
        {page === 'contacts' && <ContactsPage />}
        {page === 'info' && <CollegeInfoPage />}
      </main>

      <footer className="bg-slate-900 text-slate-300 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">Campus Saathi</span>
              </div>
              <p className="text-sm text-slate-400">
                Your one-stop companion for navigating campus life — classrooms,
                notices, events, contacts, and more.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-2">Explore</h4>
                <button onClick={() => navigate('map')} className="block text-slate-400 hover:text-white mb-1">Campus Map</button>
                <button onClick={() => navigate('notices')} className="block text-slate-400 hover:text-white mb-1">Notices</button>
                <button onClick={() => navigate('events')} className="block text-slate-400 hover:text-white">Events</button>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Community</h4>
                <button onClick={() => navigate('clubs')} className="block text-slate-400 hover:text-white mb-1">Clubs</button>
                <button onClick={() => navigate('info')} className="block text-slate-400 hover:text-white mb-1">College Info</button>
                <button onClick={() => navigate('contacts')} className="block text-slate-400 hover:text-white">Contacts</button>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Emergency</h4>
                <button onClick={() => navigate('contacts')} className="block text-slate-400 hover:text-white mb-1">Security</button>
                <button onClick={() => navigate('contacts')} className="block text-slate-400 hover:text-white mb-1">Medical</button>
                <button onClick={() => navigate('contacts')} className="block text-slate-400 hover:text-white">Anti-Ragging</button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-6 text-sm text-slate-500 text-center">
            © 2026 Campus Saathi. Made for students, by students.
          </div>
        </div>
      </footer>
    </div>
  );
}
