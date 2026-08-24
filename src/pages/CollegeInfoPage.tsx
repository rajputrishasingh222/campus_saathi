import { Info, GraduationCap, Clock, MapPin, BookOpen, Award, Building2, Phone } from 'lucide-react';
import { PageHeader } from '@/components/ui';

const INFO_SECTIONS = [
  {
    icon: GraduationCap,
    title: 'About the College',
    color: 'from-teal-500 to-cyan-600',
    content: 'Founded in 1985, our institution is a premier center for technical and higher education, accredited with an A+ grade by NAAC. We offer undergraduate and postgraduate programs across engineering, sciences, and humanities, with a vibrant community of over 5,000 students and 300+ faculty members.',
  },
  {
    icon: Building2,
    title: 'Campus Facilities',
    color: 'from-blue-500 to-indigo-600',
    content: 'The 50-acre campus includes modern lecture halls, well-equipped laboratories, a central library with 50,000+ books and digital resources, a 24x7 medical center, sports complex with athletics track, auditorium, cafeteria, and separate hostels for boys and girls with Wi-Fi connectivity.',
  },
  {
    icon: BookOpen,
    title: 'Academic Programs',
    color: 'from-purple-500 to-pink-600',
    content: 'We offer B.Tech in Computer Science, IT, Electronics & Communication, Mechanical, and Civil Engineering, along with M.Tech, MCA, and PhD programs. The curriculum emphasizes hands-on learning, industry collaboration, and research.',
  },
  {
    icon: Award,
    title: 'Achievements',
    color: 'from-orange-500 to-amber-500',
    content: 'Our students have won 50+ national-level hackathons, published 200+ research papers, and secured placements in top companies including Google, Microsoft, Amazon, and leading Indian firms. The college ranks among the top 100 engineering institutions in the country.',
  },
];

const QUICK_FACTS = [
  { label: 'Established', value: '1985', icon: Clock },
  { label: 'Campus Size', value: '50 acres', icon: MapPin },
  { label: 'Students', value: '5,000+', icon: GraduationCap },
  { label: 'Programs', value: '15+', icon: BookOpen },
];

const TIMINGS = [
  { day: 'Monday - Friday', time: '8:00 AM - 5:00 PM' },
  { day: 'Saturday', time: '8:00 AM - 1:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

export default function CollegeInfoPage() {
  return (
    <div>
      <PageHeader
        title="College Information"
        subtitle="Everything you need to know about your campus — history, facilities, programs, and more."
        icon={<Info className="w-7 h-7" />}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Facts */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {QUICK_FACTS.map((fact) => {
            const Icon = fact.icon;
            return (
              <div key={fact.label} className="bg-white rounded-2xl p-5 border border-slate-200 text-center">
                <div className="w-10 h-10 mx-auto rounded-xl bg-teal-50 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-teal-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{fact.value}</div>
                <div className="text-sm text-slate-500 mt-0.5">{fact.label}</div>
              </div>
            );
          })}
        </div>

        {/* Info Sections */}
        <div className="space-y-6">
          {INFO_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className={`sm:w-2 bg-gradient-to-b ${section.color}`} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Office Hours */}
        <div className="mt-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-xl font-bold">Office Hours</h2>
          </div>
          <div className="space-y-3">
            {TIMINGS.map((t) => (
              <div key={t.day} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                <span className="text-slate-300">{t.day}</span>
                <span className="font-semibold text-white">{t.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
            <Phone className="w-5 h-5 text-teal-400" />
            <p className="text-sm text-slate-300">
              For urgent queries, call the main office at <span className="font-semibold text-white">+91-98765-10010</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
