import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, FolderOpen, ArrowDownCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PERSONAL_DATA } from '../data.ts';

interface VideoHeroProps {
  onScrollClick: () => void;
}

const DEFAULT_VIDEO = 'https://assets.mixkit.co/videos/preview/mixkit-keyboard-typing-in-dark-room-8584-large.mp4';

export default function VideoHero({ onScrollClick }: VideoHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [videoSrc, setVideoSrc] = useState<string>(DEFAULT_VIDEO);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showSoundHint, setShowSoundHint] = useState<boolean>(true);
  const [videoName, setVideoName] = useState<string>('Cinematic Typing Demo');

  // GSAP Entrance Animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    tl.fromTo('.hero-tagline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, delay: 0.3 })
      .fromTo('.hero-name-first', { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, '-=0.9')
      .fromTo('.hero-name-last', { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, '-=1.0')
      .fromTo('.hero-role', { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '-=0.8')
      .fromTo('.hero-video-frame', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 }, '-=0.8')
      .fromTo('.hero-controls', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.9')
      .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1 }, '-=0.5');
  }, { scope: containerRef });

  // Sync background video with foreground video playback
  useEffect(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;

    // Direct synchronization on state change
    if (isPlaying) {
      fg.play().catch(() => {});
      bg.play().catch(() => {});
    } else {
      fg.pause();
      bg.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;

    fg.muted = isMuted;
    bg.muted = true; // Background ambient should always be silent
  }, [isMuted]);

  // Synchronize playback rates or offsets if they drift
  useEffect(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;

    const interval = setInterval(() => {
      if (!fg.paused && Math.abs(fg.currentTime - bg.currentTime) > 0.15) {
        bg.currentTime = fg.currentTime;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto-hide the "Tap for sound" hint after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Clean elegant fade-out via CSS transition
      setShowSoundHint(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      setShowSoundHint(false); // Hide sound hint once unmuted
    }
  };

  // Provide custom file import so user can choose talking head video directly in UI
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoName(file.name);
      setIsPlaying(true);
      setIsMuted(false); // Play with sound on direct select
      setShowSoundHint(false);
    }
  };

  return (
    <section
      id="video-hero"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-end bg-[#050505] text-white"
    >
      {/* Background Ambient Video: Duplicate but scaled & blurred */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <video
          ref={bgVideoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-110 blur-3xl opacity-40 transition-all duration-1000"
        />
        {/* Ambient Sophisticated Dark Glows (Orange + Blue mix) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/20 via-blue-900/10 to-transparent blur-[100px] z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/70 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/85 via-transparent to-[#050505]/85 z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent z-[2]" />
      </div>

      {/* Main content grid centered */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 pb-20 sm:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end h-full pt-20">
        
        {/* Left column: Typography Header with Marcus Chen Style Text Stroke */}
        <div className="lg:col-span-7 select-none flex flex-col justify-end z-[22]">
          <span className="hero-tagline uppercase tracking-[0.4em] text-[11px] font-mono text-[#f97316] font-bold mb-4 block ml-1">
            {PERSONAL_DATA.tagline}
          </span>
          <h1 className="hero-name-first uppercase text-6xl sm:text-7xl xl:text-8xl font-sans font-black leading-[0.9] tracking-tighter text-white">
            {PERSONAL_DATA.firstName}
          </h1>
          <h1 className="hero-name-last uppercase text-6xl sm:text-7xl xl:text-8xl font-sans font-black leading-[0.9] tracking-tighter text-transparent text-stroke-white">
            {PERSONAL_DATA.lastName}
          </h1>
          <p className="hero-role mt-8 text-white/50 max-w-md text-sm leading-relaxed font-light tracking-wide font-sans">
            {PERSONAL_DATA.bio}
          </p>
        </div>

        {/* Right column: Main Foreground Video Card Frame */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-end z-[21]">
          <div className="w-full max-w-sm sm:max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 relative hero-video-frame shadow-2xl hover:border-[#f97316]/30 transition-all duration-500">
            {/* Aspect frame */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
              <video
                ref={fgVideoRef}
                src={videoSrc}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover relative z-10 transition-transform duration-700 hover:scale-105"
              />
              
              {/* Highlight Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-20" />
            </div>

            {/* Bottom active clip specs */}
            <div className="flex items-center justify-between mt-3 px-1 text-xs font-mono text-gray-400">
              <span className="truncate max-w-[180px]">{videoName}</span>
              <span className="text-[#f97316] animate-pulse">● LIVE TRANSIT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Controls, Floating Badges, and Scroll indicators */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 h-auto pb-6 select-none flex items-center justify-between">
        
        {/* Playback Controls & Video Select */}
        <div className="hero-controls flex items-center gap-3">
          {/* Play/Pause */}
          <button
            onClick={handleTogglePlay}
            id="play-pause-btn"
            title={isPlaying ? "Pause Video" : "Play Video"}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-[#f97316]/20 border border-white/10 hover:border-[#f97316]/40 text-white backdrop-blur-xl transition-all duration-300"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>

          {/* Mute/Unmute */}
          <div className="relative flex items-center">
            <button
              onClick={handleToggleMute}
              id="mute-unmute-btn"
              title={isMuted ? "Unmute" : "Mute"}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-[#f97316]/20 border border-white/10 hover:border-[#f97316]/40 text-white backdrop-blur-xl transition-all duration-300 relative"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            {/* "Tap for sound" dynamic animated badge */}
            {isMuted && showSoundHint && (
              <div className="absolute left-12 whitespace-nowrap bg-[#f97316] text-black text-[10px] font-bold font-sans uppercase py-1 px-3.5 rounded-full custom-badge animate-bounce pointer-events-none">
                Tap For Sound
              </div>
            )}
          </div>

          {/* Upload Video Trigger */}
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import custom talking-head mp4"
            className="h-10 px-4 rounded-full flex items-center gap-2 bg-white/10 hover:bg-zinc-800/80 border border-white/10 text-xs font-mono text-gray-300 hover:text-white backdrop-blur-xl duration-300"
          >
            <FolderOpen size={14} />
            <span className="hidden sm:inline">Swap Video</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Scroll down indicator */}
        <div className="hero-scroll absolute left-1/2 -translate-x-1/2 bottom-1 sm:bottom-2 flex flex-col items-center">
          <button
            onClick={onScrollClick}
            id="scroll-down-indicator"
            className="group flex flex-col items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/40 group-hover:text-[#f97316] transition-colors duration-200">
              Explore
            </span>
            <div className="w-[1px] h-14 bg-gradient-to-b from-[#f97316] via-[#f97316]/40 to-transparent relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/80 animate-bounce" />
            </div>
          </button>
        </div>

        {/* Floating audio status marker */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-400 select-none">
          <span>DEVICES SYNC</span>
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
        </div>
      </div>
    </section>
  );
}
