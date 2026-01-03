import React from 'react';
import { SectionId } from '../types';
import { Terminal, Cpu, PenTool, Video, Coffee } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-20 px-4 bg-[#1a1a1a] border-b-2 border-dashed border-neon-purple">
      <div className="max-w-4xl mx-auto">
        <div className="h-2 w-full bg-gradient-to-r from-neon-magenta via-neon-cyan to-neon-purple mb-8 animate-pulse"></div>
        
        <h2 className="font-retro text-2xl md:text-3xl text-neon-cyan mb-8 text-shadow-sm flex items-center gap-4">
          <span className="text-neon-magenta text-4xl">#</span> ABOUT_ME
        </h2>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Avatar Area */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
             <div className="relative w-48 h-48 bg-gray-800 border-4 border-neon-cyan p-1 shadow-[0_0_15px_#00ffcc]">
                <img 
                  src="https://picsum.photos/400/400" 
                  alt="Jupiter Avatar" 
                  className="w-full h-full object-cover filter grayscale contrast-125 hover:filter-none transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>
                {/* Scanline overlay for image */}
                <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAADCAYAAABS3WWCAAAAE0lEQVQIW2NkQAKrVq36zwjjgAAAGW4Cd0h2DXYAAAAASUVORK5CYII=')] opacity-30 pointer-events-none"></div>
             </div>
             <div className="mt-4 font-retro text-xs text-neon-magenta bg-black px-2 py-1 border border-neon-magenta">
                LVL 99 CREATOR
             </div>
          </div>

          {/* Bio Text */}
          <div className="w-full md:w-2/3 font-terminal text-gray-300 leading-relaxed space-y-4">
            <p className="text-lg">
              <span className="text-neon-cyan">&gt;</span> Hello world. I am Jupiter.
            </p>
            <p>
              I am a video editor and digital storyteller obsessed with the aesthetics of the late 20th century. 
              My YouTube channel was lost to the digital void, but my passion for creation remains corrupted but functional.
            </p>
            <p>
              I specialize in high-energy editing, retro motion graphics, and narrative pacing that keeps viewers hooked.
              This website is my bunker, my backup drive, and my broadcast station.
            </p>

            {/* Skills Badges */}
            <div className="mt-8">
              <h3 className="font-retro text-sm text-white mb-4 border-b border-gray-700 pb-2">SKILL_TREE_UNLOCKED:</h3>
              <div className="flex flex-wrap gap-3">
                 {[
                   { icon: <Video size={16} />, label: "Premiere Pro" },
                   { icon: <Cpu size={16} />, label: "After Effects" },
                   { icon: <PenTool size={16} />, label: "Photoshop" },
                   { icon: <Terminal size={16} />, label: "Sound Design" },
                   { icon: <Coffee size={16} />, label: "Caffeine" }
                 ].map((skill, idx) => (
                   <div key={idx} className="flex items-center gap-2 bg-black border border-gray-600 px-3 py-1.5 hover:border-neon-cyan hover:text-neon-cyan transition-colors cursor-crosshair">
                      {skill.icon}
                      <span className="font-retro text-[10px]">{skill.label}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;