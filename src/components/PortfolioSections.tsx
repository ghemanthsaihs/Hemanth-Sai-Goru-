import { Briefcase, Award, ShieldAlert, Cpu, GraduationCap, Mail, Linkedin, Phone, MapPin } from 'lucide-react';
import { EXPERIENCE_TAIL, CERTIFICATIONS, SKILL_GROUPS, PERSONAL_DATA } from '../data.ts';

export default function PortfolioSections() {
  return (
    <div className="bg-[#050505] text-zinc-100 min-h-screen py-24 px-6 sm:px-12 md:px-20 relative z-20">
      {/* Decorative Blur Backing */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-orange-950/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-950/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* SECTION 1: Bio / Professional Abstract */}
        <section id="bio-abstract" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-orange-500 font-bold">
              01 // CORE ABSTRACT
            </span>
            <h2 className="text-3xl sm:text-4xl uppercase font-sans font-bold text-white tracking-tight">
              SRE & SOLUTION LEADERSHIP
            </h2>
            <div className="w-12 h-[2px] bg-gradient-to-r from-orange-500 to-transparent" />
          </div>

          <div className="lg:col-span-8 bg-zinc-900/30 border border-white/5 backdrop-blur-md rounded-2xl p-8 md:p-10 space-y-6">
            <p className="text-lg text-zinc-300 leading-relaxed font-sans font-light">
              "{PERSONAL_DATA.bio}"
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-lg border border-white/5">
                <ShieldAlert className="text-orange-500" size={16} />
                <span>Specialist in Major Incident response & crisis command</span>
              </div>
              <div className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-lg border border-white/5">
                <Cpu className="text-blue-400" size={16} />
                <span>Expert on Microsoft Azure & SRE environments</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Professional Experience Timeline */}
        <section id="work-history" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-orange-500 font-bold">
              02 // EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl uppercase font-sans font-bold text-white tracking-tight">
              PROFESSIONAL CHRONICLE
            </h2>
            <p className="text-xs text-zinc-500 font-mono leading-relaxed">
              Leading high-impact operations and cloud system optimizations across multinational portfolios.
            </p>
            <div className="w-12 h-[2px] bg-gradient-to-r from-orange-500 to-transparent" />
          </div>

          <div className="lg:col-span-8 space-y-8">
            {EXPERIENCE_TAIL.map((exp, idx) => (
              <div
                key={exp.id}
                className="group relative bg-zinc-900/20 hover:bg-[#111115]/40 border border-white/5 hover:border-orange-500/15 rounded-2xl p-6 md:p-8 transition-all duration-500 space-y-4 shadow-xl"
              >
                <div className="absolute top-6 right-6 font-mono text-xs text-orange-500 font-bold opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                  / 0{idx + 1}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="text-orange-500" />
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                      {exp.company}
                    </span>
                  </div>
                  <h3 className="text-xl font-sans font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 pt-1">
                    <span>{exp.period}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{exp.location}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 pt-3">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-light flex items-start gap-2.5">
                      <span className="block w-1.5 h-1.5 rounded-full bg-orange-500/50 mt-1.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Categorized Skills Base */}
        <section id="tech-skills" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-orange-500 font-bold">
              03 // CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl uppercase font-sans font-bold text-white tracking-tight">
              STELLAR SKILLS BIOME
            </h2>
            <div className="w-12 h-[2px] bg-gradient-to-r from-orange-500 to-transparent" />
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_GROUPS.map((group, gIdx) => (
              <div
                key={gIdx}
                className="bg-zinc-900/10 border border-white/5 rounded-2xl p-6 space-y-4 hover:border-zinc-800 transition-colors duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-300 font-bold">
                    {group.category}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="bg-zinc-900/60 border border-white/5 text-xs text-zinc-300 px-3.5 py-1.5 rounded-lg hover:border-orange-500/30 hover:text-white transition-all duration-300 font-sans"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Credentials and Honors */}
        <section id="certifications" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-orange-500 font-bold">
              04 // VALIDATION
            </span>
            <h2 className="text-3xl sm:text-4xl uppercase font-sans font-bold text-white tracking-tight">
              CREDENTIALS & HONORS
            </h2>
            <div className="w-12 h-[2px] bg-gradient-to-r from-orange-500 to-transparent" />
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="group flex items-center gap-4 bg-zinc-900/10 hover:bg-zinc-900/30 border border-white/5 hover:border-orange-500/15 p-5 rounded-2xl transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex-shrink-0 flex items-center justify-center text-orange-500 group-hover:bg-[#f97316] group-hover:text-black transition-all duration-300">
                  <Award size={18} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-sans font-medium text-zinc-200 group-hover:text-white transition-colors duration-200">
                    {cert.name}
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    SYSTEM VERIFIED
                  </span>
                </div>
              </div>
            ))}

            {/* Honors Box */}
            <div className="col-span-1 sm:col-span-2 group flex items-start gap-4 bg-orange-500/5 border border-orange-500/20 p-5 rounded-2xl transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex-shrink-0 flex items-center justify-center text-black">
                <Award size={18} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">
                  HONORARY RECOGNITION
                </span>
                <h4 className="text-base font-sans font-bold text-white">
                  Best Incident Commander Award
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans font-light">
                  Awarded for demonstrating exceptional strategic decision-making, swift resolution coordination, and key leadership under heavy business platform outage pressures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Footer & Interactive connection details */}
        <section id="interactive-contact" className="border-t border-white/5 pt-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-zinc-400 text-xs font-mono">
          <div className="space-y-4">
            <h3 className="text-xl uppercase font-sans font-semibold text-white tracking-tight">
              INTERACTION GATEWAY
            </h3>
            <p className="text-zinc-400 leading-relaxed font-sans font-light max-w-sm">
              Connect to plan reliable incident orchestration systems, solution architectures, or enterprise cloud deployments.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <MapPin size={14} className="text-orange-500" />
              <span>{PERSONAL_DATA.location}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 font-mono text-xs">
              <a
                href={`mailto:${PERSONAL_DATA.email}`}
                className="flex items-center gap-3 text-zinc-300 hover:text-[#f97316] transition-colors duration-300 bg-zinc-900/40 p-4 rounded-xl border border-white/5"
              >
                <Mail size={16} className="text-orange-500" />
                <span>{PERSONAL_DATA.email}</span>
              </a>
              <a
                href={PERSONAL_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-zinc-300 hover:text-[#f97316] transition-colors duration-300 bg-zinc-900/40 p-4 rounded-xl border border-white/5"
              >
                <Linkedin size={16} className="text-orange-500" />
                <span>linkedin.com/in/hemanth-sai-goru</span>
              </a>
              <div className="flex items-center gap-3 text-zinc-300 bg-zinc-900/40 p-4 rounded-xl border border-white/5 select-none">
                <Phone size={16} className="text-orange-500" />
                <span>+91 {PERSONAL_DATA.phone}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Final tiny copyright signoff */}
        <div className="text-center text-[10px] text-zinc-600 font-mono select-none pt-10 border-t border-white/5">
          © {new Date().getFullYear()} HEMANTH SAI GORU • TRACE VERIFIED ENTRANCE PORTAL
        </div>
      </div>
    </div>
  );
}
