import React, { useState, useRef, useEffect } from 'react';
import { Power } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const TVPlayer: React.FC = () => {
  const [playlist] = useState<any[]>([
    { id: 'RS6CgQZSJRI', title: "JUPITER'S REEL", start: 0 },
    { id: 'IBTI-CoYE-k', title: "HYPNOSPACE OUTLAW [Writer, Editor]", start: 0 },
    { id: 'Kw2Wgy3EPCE', title: "GAME GRUMPS | ETSY PRICE IS RIGHT [Writer, Editor, Producer]", start: 79 },
    { id: '3kVu6SkODf8', title: "GAME GRUMPS | WEIRD BRAND COLLABS  [Writer, Editor, Producer]", start: 920 },
    { id: 'Uj2UXQ0jOy4', title: "H3 PODCAST | WHITE PEOPLE BINGO [Writer]", start: 5362 },
    { id: 'G3R05kQDxtQ', title: "PILLOW FORT CINEMA CLUB | AAPI PSA [Writer, Editor, Producer]", start: 0 },
    { id: 'fcqpSaskz2k', title: "G4TV | NOPE BOX [Editor]", start: 0 }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isOn, setIsOn] = useState(false);
  const [knobRotation, setKnobRotation] = useState({ channel: 0, volume: 0 });
  const [staticNoise, setStaticNoise] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  const playerRef = useRef<any>(null);

  // Initialize YouTube API
  useEffect(() => {
    const initYT = () => {
      const video = playlist[0];
      playerRef.current = new window.YT.Player('yt-player-frame', {
        height: '100%',
        width: '100%',
        videoId: video.id,
        playerVars: {
          autoplay: 0,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          start: video.start,
          enablejsapi: 1,
          origin: window.location.origin
        },
        events: {
          onReady: () => {
            setPlayerReady(true);
            playerRef.current.setVolume(volume);
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initYT;
    } else if (window.YT.Player) {
      initYT();
    }
  }, []);

  // Update volume when state changes
  useEffect(() => {
    if (playerReady && playerRef.current?.setVolume) {
      playerRef.current.setVolume(volume);
    }
  }, [volume, playerReady]);

  const togglePower = () => {
    const nextOn = !isOn;
    setIsOn(nextOn);
    if (playerReady && playerRef.current) {
      if (nextOn) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  };

  const changeChannel = (direction: 'next' | 'prev') => {
    if (!isOn) return;
    
    setKnobRotation(prev => ({ 
        ...prev, 
        channel: prev.channel + (direction === 'next' ? 30 : -30) 
    }));

    setStaticNoise(true);
    
    let nextIdx;
    if (direction === 'next') {
      nextIdx = (currentIndex + 1) % playlist.length;
    } else {
      nextIdx = (currentIndex - 1 + playlist.length) % playlist.length;
    }
    
    setCurrentIndex(nextIdx);

    // Simulate channel switching latency/static
    setTimeout(() => {
      setStaticNoise(false);
      if (playerReady && playerRef.current) {
        playerRef.current.loadVideoById({
          videoId: playlist[nextIdx].id,
          startSeconds: playlist[nextIdx].start,
        });
      }
    }, 800);
  };

  const cycleVolume = () => {
    const newVol = (volume + 25) % 125;
    const clamped = newVol > 100 ? 0 : newVol;
    setVolume(clamped);
    setKnobRotation(prev => ({ ...prev, volume: prev.volume + 45 }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      {/* TV Cabinet */}
      <div className="relative bg-[#3e2723] p-4 md:p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-t-4 border-l-4 border-[#5d4037] border-b-8 border-r-8 border-[#281815]">
        
        <div className="absolute inset-0 opacity-10 pointer-events-none rounded-[40px] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
        
        {/* Antennas */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-24 hidden md:block opacity-80">
            <div className="w-1 h-32 bg-gray-400 absolute bottom-0 left-0 rotate-[-30deg] origin-bottom shadow-lg"></div>
            <div className="w-1 h-32 bg-gray-400 absolute bottom-0 right-0 rotate-[30deg] origin-bottom shadow-lg"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Screen Container */}
          <div className="relative flex-grow bg-black rounded-[60px] overflow-hidden border-[16px] border-[#1a1a1a] shadow-[inset_0_0_60px_rgba(0,0,0,1)] aspect-video">
             <div className="absolute inset-0 z-40 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-[35px]"></div>
             
             <div className="tv-screen-container h-full w-full bg-black relative">
                {/* 1. Turning on the TV prompt - Only shows when OFF */}
               {!isOn && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#0a0a0a]">
                    <div className="font-retro text-green-500 text-[10px] md:text-xs animate-pulse text-center leading-loose">
                        SIGNAL_LOST<br/><br/>
                        <span className="bg-green-500 text-black px-2">PUSH POWER</span><br/>
                        TO_INITIALIZE_SYSTEM
                    </div>
                 </div>
               )}

               {/* Static Noise Overlay */}
               {isOn && staticNoise && (
                  <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] bg-cover opacity-80 mix-blend-screen z-30"></div>
               )}
               
               {/* 2. YouTube Player Frame - Persists in DOM */}
               <div className={`absolute inset-0 z-10 overflow-hidden transition-opacity duration-500 ${isOn ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-full h-full transform scale-125">
                     <div id="yt-player-frame"></div>
                  </div>
               </div>

               {/* Scanlines & CRT Effects (Always on Top) */}
               {isOn && (
                 <>
                    <div className="absolute top-8 left-8 font-retro text-green-500 text-shadow-md z-30 opacity-70 pointer-events-none text-[10px] md:text-sm">
                      CH {String(currentIndex + 1).padStart(2, '0')} <br/>
                      VOL {volume > 0 ? '|'.repeat(Math.floor(volume / 10)) : 'MUTED'}
                    </div>
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-25 opacity-30"></div>
                 </>
               )}
             </div>
          </div>

          {/* Control Panel Area */}
          <div className="w-full md:w-48 bg-[#2a2a2a] rounded-lg border-4 border-[#111] p-4 flex flex-col items-center gap-6 shadow-inner relative">
            <div className="w-full text-center border-b-2 border-gray-600 pb-2">
                <span className="font-retro text-gray-400 text-[10px] tracking-widest uppercase">Jupiter visuals</span>
            </div>

            {/* LED Display */}
            <div className="bg-black border-2 border-gray-600 px-4 py-2 rounded font-mono text-red-600 text-2xl shadow-[0_0_10px_rgba(255,0,0,0.3)] transition-all">
               {isOn ? String(currentIndex + 1).padStart(2, '0') : '--'}
            </div>

            {/* Knobs */}
            <div className="flex flex-row md:flex-col gap-8 items-center justify-center w-full">
                <div className="flex flex-col items-center gap-1">
                    <span className="font-retro text-[8px] text-gray-400 uppercase">channel</span>
                    <div 
                        className="w-16 h-16 rounded-full bg-[#111] border-4 border-gray-600 shadow-lg relative cursor-pointer active:scale-95 transition-transform"
                        onClick={() => changeChannel('next')}
                        onContextMenu={(e) => { e.preventDefault(); changeChannel('prev'); }}
                        style={{ transform: `rotate(${knobRotation.channel}deg)` }}
                    >
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-4 bg-white/80 rounded-sm"></div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <span className="font-retro text-[8px] text-gray-400 uppercase">volume</span>
                    <div 
                        className="w-12 h-12 rounded-full bg-[#111] border-4 border-gray-600 shadow-lg relative cursor-pointer active:scale-95 transition-transform"
                        onClick={cycleVolume}
                        style={{ transform: `rotate(${knobRotation.volume}deg)` }}
                    >
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-white/80 rounded-sm"></div>
                    </div>
                </div>
            </div>

            {/* Power Button */}
            <div className="flex gap-4 mt-auto">
                <button 
                    onClick={togglePower}
                    className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all active:scale-90 ${isOn ? 'bg-red-600 border-red-400 shadow-[0_0_20px_red]' : 'bg-gray-800 border-gray-600 shadow-inner'}`}
                    title="Power"
                >
                    <Power size={20} className={isOn ? 'text-white' : 'text-gray-500'} />
                </button>
            </div>

             <div className="w-full h-16 mt-2 flex flex-col justify-between gap-1 opacity-50">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full h-1 bg-black rounded-full shadow-[0_1px_0_rgba(255,255,255,0.1)]"></div>
                ))}
             </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-black/40 p-4 border border-neon-purple/30 rounded backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h3 className="font-retro text-neon-cyan text-sm md:text-base mb-1">
                        NOW_PLAYING: {isOn ? playlist[currentIndex].title : "OFFLINE"}
                    </h3>
                    <p className="font-terminal text-gray-400 text-xs uppercase">
                        {isOn ? `CH_${currentIndex + 1} // SIGNAL_DETECTED // VOL_${volume}%` : "AWAITING_POWER_INPUT"}
                    </p>
                </div>
            </div>
        </div>

      </div>
      
      <div className="text-center mt-4 font-terminal text-gray-500 text-xs">
          HINT: Large knob rotates channel. Small knob cycles volume. 
          The video is center-cropped (overscan) for authentic CRT feel.
      </div>
    </div>
  );
};

export default TVPlayer;