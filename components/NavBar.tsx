import React, { useState } from 'react';
import { SectionId } from '../types';

interface NavBarProps {
  activeSection: string;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection }) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const links = [
    { id: SectionId.WELCOME, label: 'START' },
    { id: SectionId.ABOUT, label: 'ABOUT' },
    { id: SectionId.RESUME, label: 'RESUME' },
    { id: SectionId.WORK, label: 'VIDEOS' },
    { id: SectionId.CONTACT, label: 'CONTACT' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/90 border-b-4 border-neon-purple backdrop-blur-sm py-3 px-4 shadow-[0_4px_20px_rgba(102,0,204,0.4)]">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center md:justify-between items-center">
        <div className="hidden md:block font-retro text-xs text-neon-cyan animate-pulse">
          SYS.READY
        </div>
        <ul className="flex flex-wrap justify-center gap-4 md:gap-8 m-0 p-0 list-none">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleScrollTo(e, link.id)}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`
                  font-retro text-[10px] md:text-xs no-underline transition-all duration-300 block p-2 border-2
                  ${activeSection === link.id 
                    ? 'text-neon-magenta border-neon-magenta shadow-[0_0_10px_#ff00cc] bg-white/10' 
                    : 'text-neon-cyan border-transparent hover:text-white hover:border-neon-cyan hover:shadow-[0_0_8px_#00ffcc]'}
                  ${hoveredLink === link.id ? 'translate-y-[-2px]' : ''}
                `}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:block font-retro text-xs text-red-500">
           REC ●
        </div>
      </div>
    </nav>
  );
};

export default NavBar;