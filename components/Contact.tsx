import React from 'react';
import { SectionId } from '../types';
import { Mail, Github, Twitter, Youtube } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id={SectionId.CONTACT} className="py-20 px-4 bg-[#1a1a1a] border-b-2 border-dashed border-neon-cyan pb-32">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-retro text-2xl md:text-3xl text-neon-purple mb-8 text-center">
          CONTACT_ME
        </h2>

        {/* Terminal Window */}
        <div className="bg-[#111] border-2 border-gray-600 rounded shadow-2xl overflow-hidden font-terminal">
            {/* Terminal Header */}
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-600">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-400 text-xs">msg_sender.exe</div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 text-green-500">
                <div className="mb-4">
                    <span className="text-neon-magenta">root@jupiter:~$</span> ./initiate_contact.sh
                </div>
                
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-xs mb-1 opacity-70">ENTER_NAME:</label>
                        <input 
                            type="text" 
                            className="w-full bg-black border border-green-800 p-2 text-white focus:outline-none focus:border-green-500 focus:shadow-[0_0_10px_rgba(0,255,0,0.3)]"
                            placeholder="_"
                        />
                    </div>
                    <div>
                        <label className="block text-xs mb-1 opacity-70">ENTER_EMAIL:</label>
                        <input 
                            type="email" 
                            className="w-full bg-black border border-green-800 p-2 text-white focus:outline-none focus:border-green-500 focus:shadow-[0_0_10px_rgba(0,255,0,0.3)]"
                            placeholder="_"
                        />
                    </div>
                    <div>
                        <label className="block text-xs mb-1 opacity-70">MESSAGE_BODY:</label>
                        <textarea 
                            rows={4}
                            className="w-full bg-black border border-green-800 p-2 text-white focus:outline-none focus:border-green-500 focus:shadow-[0_0_10px_rgba(0,255,0,0.3)]"
                            placeholder="_"
                        ></textarea>
                    </div>
                    <button className="bg-green-700 text-black font-bold py-2 px-4 hover:bg-green-600 w-full mt-4 font-retro text-xs">
                        SEND_TRANSMISSION
                    </button>
                </form>
            </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-12">
            {[
                { icon: <Github />, label: 'GITHUB' },
                { icon: <Twitter />, label: 'TWITTER' },
                { icon: <Youtube />, label: 'BACKUP_YT' },
                { icon: <Mail />, label: 'EMAIL' }
            ].map((social, idx) => (
                <a 
                    key={idx} 
                    href="#" 
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="p-3 border-2 border-gray-600 bg-black group-hover:border-neon-cyan group-hover:text-neon-cyan transition-all transform group-hover:-translate-y-1">
                        {social.icon}
                    </div>
                    <span className="font-retro text-[10px] text-gray-500 group-hover:text-neon-cyan">{social.label}</span>
                </a>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;