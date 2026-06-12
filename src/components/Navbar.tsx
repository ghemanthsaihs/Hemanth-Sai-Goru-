import { Mail, Linkedin, Compass } from 'lucide-react';
import { PERSONAL_DATA } from '../data.ts';

export default function Navbar() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="main-navigation"
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 sm:px-12 md:px-20 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/5 px-6 py-3.5 rounded-full shadow-2xl">
        
        {/* Branding Title */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-2.5 h-2.5 rounded-full bg-[#f97316] animate-pulse" />
          <span className="text-white text-xs font-bold font-mono tracking-[0.25em] uppercase hover:text-[#f97316] transition-colors duration-300">
            {PERSONAL_DATA.firstName} {PERSONAL_DATA.lastName}
          </span>
        </div>

        {/* Anchor Jumps (Desktop Only) */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-wider text-gray-400">
          <button
            onClick={() => handleScrollTo('bio-abstract')}
            className="hover:text-white transition-colors duration-300 uppercase cursor-pointer"
          >
            Core
          </button>
          <button
            onClick={() => handleScrollTo('work-history')}
            className="hover:text-white transition-colors duration-300 uppercase cursor-pointer"
          >
            Chronicle
          </button>
          <button
            onClick={() => handleScrollTo('tech-skills')}
            className="hover:text-white transition-colors duration-300 uppercase cursor-pointer"
          >
            Biome
          </button>
          <button
            onClick={() => handleScrollTo('certifications')}
            className="hover:text-white transition-colors duration-300 uppercase cursor-pointer"
          >
            Verification
          </button>
        </div>

        {/* Active Contact Connections */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_DATA.linkedin}
            target="_blank"
            rel="noreferrer"
            title="LinkedIn Profile"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#f97316]/50 flex items-center justify-center text-gray-400 hover:text-[#f97316] transition-all duration-300"
          >
            <Linkedin size={13} />
          </a>
          <a
            href={`mailto:${PERSONAL_DATA.email}`}
            title="Send Email Connection"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#f97316]/50 flex items-center justify-center text-gray-400 hover:text-[#f97316] transition-all duration-300"
          >
            <Mail size={13} />
          </a>
          <button
            onClick={() => handleScrollTo('interactive-contact')}
            className="hidden sm:flex items-center gap-1.5 px-4 h-8 rounded-full bg-[#f97316]/10 hover:bg-[#f97316] border border-[#f97316]/20 hover:border-transparent text-[10px] font-bold font-mono text-orange-400 hover:text-black uppercase tracking-wider transition-all duration-300 cursor-pointer"
          >
            <Compass size={11} />
            <span>Connect</span>
          </button>
        </div>

      </div>
    </nav>
  );
}
