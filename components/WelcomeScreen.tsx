import React from 'react';
import { SectionId } from '../types';

const WelcomeScreen: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      id={SectionId.WELCOME}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2c003e] relative overflow-hidden "
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      
      <div className="z-10 text-center px-4 max-w-4xl w-full">
        <h1 
          className="glitch-text font-retro text-4xl md:text-6xl lg:text-7xl text-neon-cyan mb-6 leading-tight"
          data-text="HACK THE PLANET!"
        >
          HACK THE PLANET!
        </h1>
        
        <p className="font-terminal text-neon-magenta text-lg md:text-2xl mb-12 tracking-widest uppercase border-b-2 border-neon-purple inline-block pb-2">
          The Personal Frequency of Jupiter
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-8">
          {[
            { id: SectionId.ABOUT, label: 'INIT_BIO_SEQ', color: 'border-neon-cyan text-neon-cyan' },
            { id: SectionId.RESUME, label: 'LOAD_DATA_SHEET', color: 'border-neon-magenta text-neon-magenta' },
            { id: SectionId.WORK, label: 'RUN_VISUALS.EXE', color: 'border-neon-purple text-neon-purple' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => scrollToSection(btn.id)}
              className={`
                group relative px-8 py-4 font-retro text-sm md:text-base border-4 bg-black/50 hover:bg-white/10
                transition-all duration-200 transform hover:scale-105 active:scale-95
                shadow-[4px_4px_0px_rgba(0,0,0,0.5)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:translate-x-[2px] hover:translate-y-[2px]
                ${btn.color}
              `}
            >
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              {/* Corner decors */}
              <span className="absolute top-0 left-0 w-2 h-2 bg-current"></span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-current"></span>
              <span className="absolute bottom-0 left-0 w-2 h-2 bg-current"></span>
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-current"></span>
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce text-white/50 font-retro text-xs">
        SCROLL_DOWN_FOR_SIGNAL
      </div>
    </header>
  );
};

export default WelcomeScreen;