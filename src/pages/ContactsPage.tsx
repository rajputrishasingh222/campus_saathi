import { useMemo } from 'react';
import { Phone, Mail, ShieldAlert, Stethoscope, Building2, Ambulance } from 'lucide-react';
import { useContacts } from '@/lib/hooks';
import { PageHeader, LoadingState, ErrorState, Badge } from '@/components/ui';

const CATEGORY_META: Record<string, { label: string; icon: typeof Phone; color: string; badgeColor: 'red' | 'blue' }> = {
  emergency: { label: 'Emergency Contacts', icon: ShieldAlert, color: 'from-red-500 to-rose-600', badgeColor: 'red' },
  office: { label: 'College Offices', icon: Building2, color: 'from-blue-500 to-indigo-600', badgeColor: 'blue' },
};

export default function ContactsPage() {
  const { data, loading, error } = useContacts();

  const grouped = useMemo(() => {
    const emergency = data.filter((c) => c.category === 'emergency');
    const office = data.filter((c) => c.category === 'office');
    return { emergency, office };
  }, [data]);

  return (
    <div>
      <PageHeader
        title="Important Contacts"
        subtitle="Emergency services, college offices, and key contacts — all in one place."
        icon={<Phone className="w-7 h-7" />}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}

        {!loading && !error && (
          <div className="space-y-10">
            {/* Emergency */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Emergency Contacts</h2>
                  <p className="text-sm text-slate-500">Available 24x7 for immediate assistance</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {grouped.emergency.map((c) => {
                  const Icon = c.name.toLowerCase().includes('medical') || c.name.toLowerCase().includes('ambulance')
                    ? Stethoscope
                    : c.name.toLowerCase().includes('ambulance')
                    ? Ambulance
                    : ShieldAlert;
                  return (
                    <div
                      key={c.id}
                      className="bg-white rounded-2xl border-2 border-red-200 p-5 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-900">{c.name}</h3>
                          <p className="text-sm text-slate-500">{c.role} • {c.department}</p>
                          <div className="mt-3 space-y-1.5">
                            {c.phone && (
                              <a
                                href={`tel:${c.phone}`}
                                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
                              >
                                <Phone className="w-4 h-4" />
                                {c.phone}
                              </a>
                            )}
                            {c.email && (
                              <a
                                href={`mailto:${c.email}`}
                                className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
                              >
                                <Mail className="w-4 h-4 text-slate-400" />
                                <span className="truncate">{c.email}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Office */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">College Offices</h2>
                  <p className="text-sm text-slate-500">Administrative and departmental contacts</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {grouped.office.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-slate-900">{c.name}</h3>
                      <Badge color="blue">{c.department}</Badge>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">{c.role}</p>
                    <div className="space-y-1.5">
                      {c.phone && (
                        <a
                          href={`tel:${c.phone}`}
                          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          <Phone className="w-4 h-4" />
                          {c.phone}
                        </a>
                      )}
                      {c.email && (
                        <a
                          href={`mailto:${c.email}`}
                          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
                        >
                          <Mail className="w-4 h-4 text-slate-400" />
                          <span className="truncate">{c.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
