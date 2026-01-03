import React from 'react';
import { SectionId } from '../types';
import { Save, Briefcase, GraduationCap, Award } from 'lucide-react';

const Resume: React.FC = () => {
  const experiences = [
    {
      role: 'Lead Video Editor',
      company: 'TechTube Media',
      period: '2021 - PRESENT',
      desc: 'Produced over 150+ videos accumulating 5M+ views. Managed post-production pipeline.'
    },
    {
      role: 'Freelance Motion Designer',
      company: 'Self-Employed',
      period: '2019 - 2021',
      desc: 'Created intros, outros, and lower thirds for 20+ clients. Specialized in glitch aesthetic.'
    }
  ];

  return (
    <section id={SectionId.RESUME} className="py-20 px-4 bg-[#111] border-b-2 border-dashed border-neon-magenta relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Save size={200} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="font-retro text-2xl md:text-3xl text-neon-magenta mb-8 text-shadow-sm flex items-center gap-4">
          <span className="text-neon-cyan text-4xl">#</span> DATA_SHEET
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Experience Column */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4 text-neon-cyan font-retro text-sm">
                    <Briefcase size={16} /> EXPERIENCE_LOG
                </div>
                {experiences.map((exp, i) => (
                    <div key={i} className="bg-[#1a1a1a] p-4 border-l-4 border-neon-purple hover:bg-[#252525] transition-colors">
                        <h4 className="font-retro text-xs text-white mb-1">{exp.role}</h4>
                        <div className="flex justify-between font-terminal text-xs text-neon-magenta mb-2">
                            <span>{exp.company}</span>
                            <span>{exp.period}</span>
                        </div>
                        <p className="font-terminal text-gray-400 text-sm">
                            {exp.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Education & Actions */}
            <div className="space-y-8">
                 <div>
                    <div className="flex items-center gap-2 mb-4 text-neon-cyan font-retro text-sm">
                        <GraduationCap size={16} /> EDUCATION_DB
                    </div>
                    <div className="bg-[#1a1a1a] p-4 border-l-4 border-neon-cyan">
                        <h4 className="font-retro text-xs text-white mb-1">Bachelor of Arts: Spanish</h4>
                        <div className="font-terminal text-xs text-neon-magenta mb-2">
                            State University, 2019
                        </div>
                    </div>
                 </div>

                 <div className="mt-8 p-6 border-2 border-dashed border-gray-600 rounded bg-black/50 text-center">
                     <p className="font-retro text-xs text-gray-400 mb-4">DOWNLOAD FULL RESUME.PDF</p>
                     <button className="group relative inline-flex items-center justify-center px-6 py-3 font-retro text-xs text-black bg-neon-cyan hover:bg-white transition-colors">
                        <span className="absolute inset-0 w-full h-full bg-neon-magenta translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></span>
                        <Save size={16} className="mr-2" />
                        SAVE_TO_DISK
                     </button>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;