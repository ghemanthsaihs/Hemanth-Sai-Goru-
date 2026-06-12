/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.tsx';
import CinematicLayer from './components/CinematicLayer.tsx';
import VideoHero from './components/VideoHero.tsx';
import PortfolioSections from './components/PortfolioSections.tsx';

export default function App() {
  const [loaded, setLoaded] = useState<boolean>(false);

  // Cinematic fade-in transition on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToNextSection = () => {
    const nextSection = document.getElementById('bio-abstract');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#050505] font-sans antialiased relative transition-opacity duration-1000 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Cinematic Ambient Atmosphere Grain Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.035] mix-blend-overlay atmospheric-grain w-full h-full" />

      {/* Three.js Cinematic Particle/Bokeh Background Layer */}
      <CinematicLayer />

      {/* Floating Glassmorphism Navigation Hub */}
      <Navbar />

      {/* Primary Immersive Synced Video Hero Section */}
      <VideoHero onScrollClick={handleScrollToNextSection} />

      {/* Modular Portfolio Narrative & Core Credentials */}
      <PortfolioSections />
    </div>
  );
}
