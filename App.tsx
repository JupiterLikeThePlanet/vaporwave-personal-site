import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import WelcomeScreen from './components/WelcomeScreen';
import TVPlayer from './components/TVPlayer';
import About from './components/About';
import Resume from './components/Resume';
import Contact from './components/Contact';
import { SectionId } from './types';
import { useKonamiCode } from './hooks/useKonamiCode';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(SectionId.WELCOME);
  const konamiTriggered = useKonamiCode();

  useEffect(() => {
    // Scroll Spy for Navbar
    const handleScroll = () => {
      const sections = Object.values(SectionId);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If top of section is within middle of screen
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`crt-startup min-h-screen bg-retro-bg text-gray-100 font-sans selection:bg-neon-magenta selection:text-white ${konamiTriggered ? 'invert' : ''}`}>
      
      {/* Visual Overlays */}
      <div className="scanlines"></div>
      <div className="crt-overlay"></div>
      
      {/* Konami Easter Egg Notification */}
      {konamiTriggered && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] font-retro text-4xl text-neon-cyan bg-black p-8 border-4 border-neon-magenta animate-spin-slow">
           CHEAT_CODE_ACTIVATED
        </div>
      )}

      <NavBar activeSection={activeSection} />

      <main>
        <WelcomeScreen />

        <div id={SectionId.WORK} className="py-12 bg-[#1a1a1a]">
          <div className="h-2 w-full bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-magenta mb-8"></div>
          <div className="container mx-auto px-4">
             <h2 className="font-retro text-2xl text-center text-neon-cyan mb-8 text-shadow-sm">
                PROJECT_ARCHIVE
             </h2>
             <TVPlayer />
          </div>
        </div>
        
        <About />
        <Resume />
        <Contact />
      </main>

      <footer className="bg-black py-8 border-t-4 border-gray-800 text-center relative z-10">
        <p className="font-retro text-[10px] text-gray-500">
          &copy; 2025 JUPITER BAUDOT. ALL RIGHTS RESERVED. <br/>
          BUILT WITH REACT + TAILWIND + NOSTALGIA.
        </p>
      </footer>
    </div>
  );
};

export default App;