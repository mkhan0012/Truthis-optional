"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, AlertTriangle, TrendingUp, Briefcase, Terminal, 
  Search, Sliders, Shield, Zap, Activity, Maximize2, Minimize2, 
  ChevronRight, Database, Lock, Globe, Megaphone, Flame, Eye, X, Info
} from "lucide-react";

// --- THEMES & INSIGHTS ---
const THEMES = {
  Political: {
    color: "orange",
    hex: "#f97316",
    icon: <Megaphone className="w-6 h-6" />,
    mechanism: "Identity Confirmation & Tribal Signaling",
    desc: "Reframes facts to validate specific ideologies while subtly demonizing opposing viewpoints. It swaps neutral nouns for loaded labels.",
    defense: "Strip away the adjectives. Ask: Is this attacking a policy, or a group of people?"
  },
  Fear: {
    color: "red",
    hex: "#dc2626",
    icon: <AlertTriangle className="w-6 h-6" />,
    mechanism: "Amygdala Activation (Threat Detection)",
    desc: "Bypasses logic by simulating immediate danger. Uses high-arousal words like 'crisis', 'catastrophe', and 'deadly' to force a reaction.",
    defense: "Pause for 5 seconds. Fear creates urgency; reality rarely requires an instant reaction."
  },
  Cynicism: {
    color: "purple",
    hex: "#9333ea",
    icon: <Terminal className="w-6 h-6" />,
    mechanism: "Motive Attribution & Trust Erosion",
    desc: "Assumes the worst intent. Frames incompetence as malice and neutral actions as selfish strategies.",
    defense: "Hanlon’s Razor: Never attribute to malice that which is adequately explained by stupidity."
  },
  Optimism: {
    color: "emerald",
    hex: "#10b981",
    icon: <TrendingUp className="w-6 h-6" />,
    mechanism: "Selective Filtering & Toxic Positivity",
    desc: "Minimizes risks and highlights only favorable outcomes. Common in corporate PR to create false security.",
    defense: "Look for omitted context. 'Challenges' usually mean 'Severe Problems'."
  },
  Authority: {
    color: "blue",
    hex: "#2563eb",
    icon: <Briefcase className="w-6 h-6" />,
    mechanism: "Jargon & Status Signaling",
    desc: "Uses complex language to shut down questioning. Implies the speaker holds exclusive knowledge you cannot understand.",
    defense: "Translate to simple English. If the argument vanishes without the big words, it is manipulation."
  }
};

// --- AUDIO ENGINE ---
const useSoundEngine = (enabled) => {
  const audioCtx = useRef(null);
  const initAudio = () => {
    if (!audioCtx.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx.current = new AudioContext();
    }
    if (audioCtx.current.state === 'suspended') audioCtx.current.resume();
  };
  const playTone = (freq, type, duration) => {
    if (!enabled || !audioCtx.current) return;
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.current.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);
    osc.start();
    osc.stop(audioCtx.current.currentTime + duration);
  };
  return { 
    initAudio, 
    playClick: () => playTone(1200, 'sine', 0.05),
    playHover: () => playTone(150, 'triangle', 0.05),
    playOpen: () => playTone(400, 'sine', 0.3)
  };
};

// --- BACKGROUND ---
const ProfessionalBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden bg-black">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,50,0.1)_0%,transparent_100%)]" />
  </div>
);

// --- MODAL COMPONENT (COLOR CODED) ---
const AnalysisModal = ({ card, onClose }) => {
  const theme = THEMES[card.title];
  
  // Tailwind map for dynamic colors
  const colorMap = {
    orange: "text-orange-500 border-orange-500/30 bg-orange-950/20",
    red: "text-red-500 border-red-500/30 bg-red-950/20",
    purple: "text-purple-500 border-purple-500/30 bg-purple-950/20",
    emerald: "text-emerald-500 border-emerald-500/30 bg-emerald-950/20",
    blue: "text-blue-500 border-blue-500/30 bg-blue-950/20",
  };
  const themeClass = colorMap[theme.color];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-3xl bg-black border border-white/10 shadow-2xl rounded-xl overflow-hidden flex flex-col max-h-[90vh]`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-8 border-b ${themeClass.split(' ')[1]} relative overflow-hidden`}>
          <div className={`absolute inset-0 ${themeClass.split(' ')[2]} opacity-50`} />
          <div className="flex items-center gap-5 relative z-10">
            <div className={`p-3 rounded-lg border bg-black ${themeClass.split(' ')[0]} ${themeClass.split(' ')[1]}`}>
              {theme.icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white uppercase tracking-tight">{card.title} Protocol</h2>
              <div className="flex gap-4 text-xs font-mono text-neutral-400 uppercase mt-1">
                <span>Distortion Level: {card.intensity}%</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto space-y-8">
          
          {/* The Output Text */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Output Reality</label>
            <p className="text-2xl md:text-3xl text-white font-serif leading-relaxed pl-6 border-l-4 border-neutral-800">
              "{card.text}"
            </p>
          </div>

          <div className="w-full h-px bg-white/10" />

          {/* Educational Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className={`flex items-center gap-2 ${themeClass.split(' ')[0]}`}>
                <Activity className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Mechanism</h3>
              </div>
              <p className="text-sm font-bold text-white">{theme.mechanism}</p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {theme.desc}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white">
                <Shield className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Defense Strategy</h3>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed italic bg-neutral-900/50 p-4 rounded border border-white/5">
                "{theme.defense}"
              </p>
            </div>
          </div>

          {/* Triggers */}
          {card.triggers && card.triggers.length > 0 && (
             <div className="bg-neutral-900/30 p-5 rounded-lg border border-white/5">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-4">Identified Triggers</h4>
                <div className="flex flex-wrap gap-3">
                  {card.triggers.map((t, i) => (
                    <span key={i} className={`px-3 py-1.5 bg-black border ${themeClass.split(' ')[1]} ${themeClass.split(' ')[0]} text-xs font-mono uppercase tracking-wider rounded`}>
                      {t}
                    </span>
                  ))}
                </div>
             </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function SimulatorPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); 
  const [logs, setLogs] = useState([]);
  const [resultData, setResultData] = useState(null);
  const [simulationMode, setSimulationMode] = useState("distort");
  const [intensity, setIntensity] = useState(50); 
  const [viewMode, setViewMode] = useState("standard");
  const [history, setHistory] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  
  const { initAudio, playClick, playHover, playOpen } = useSoundEngine(true);

  useEffect(() => {
    const saved = localStorage.getItem("rds_history");
    if (saved) try { setHistory(JSON.parse(saved)); } catch(e) {}
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) { document.exitFullscreen(); setIsFullScreen(false); }
    }
  };

  const handleAnalyze = async () => {
    playClick();
    if (!input.trim()) return;
    setStatus("processing");
    setLogs([]);
    setResultData(null);
    
    let step = 0;
    const messages = ["ESTABLISHING LINK...", "PARSING SEMANTICS...", "INJECTING BIAS...", "RENDERING OUTPUT..."];
    const logInterval = setInterval(() => {
      if (step < messages.length) { setLogs(prev => [...prev, messages[step]]); step++; }
    }, 500);

    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, mode: simulationMode }),
      });

      if (!response.ok) throw new Error("API Error");
      const data = await response.json();

      clearInterval(logInterval);
      setResultData(data);
      setStatus("results");

      const newItem = { id: Date.now().toString(), timestamp: new Date().toISOString(), input, mode: simulationMode, result: data };
      const newHistory = [newItem, ...history].slice(0, 5); 
      setHistory(newHistory);
      localStorage.setItem("rds_history", JSON.stringify(newHistory));
    } catch (error) {
      clearInterval(logInterval);
      setStatus("idle");
    }
  };

  const loadHistoryItem = (item) => {
    playClick();
    setInput(item.input);
    setSimulationMode(item.mode || 'distort');
    setResultData(item.result);
    setStatus("results");
  };

  const reset = () => {
    playClick();
    setStatus('idle');
    setInput('');
    setResultData(null);
  };

  const openModal = (cardData) => {
    playOpen();
    setSelectedCard(cardData);
  };

  return (
    <main onClick={initAudio} className="h-screen w-screen fixed inset-0 bg-black text-white font-sans flex flex-col overflow-hidden selection:bg-white selection:text-black">
      <ProfessionalBackground />
      
      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedCard && <AnalysisModal card={selectedCard} onClose={() => setSelectedCard(null)} />}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 w-full h-20 border-b border-white/10 bg-black z-40 flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push('/')} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Exit
          </button>
          {status === 'results' && (
            <button onClick={reset} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white border border-white/30 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all">
              <Search className="w-3 h-3" /> New Target
            </button>
          )}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-sm font-black tracking-[0.4em]">RDS<span className="text-neutral-600">_PRO</span></div>
        <button onClick={toggleFullScreen} className="text-neutral-500 hover:text-white p-2">
          {isFullScreen ? <Minimize2 className="w-5 h-5"/> : <Maximize2 className="w-5 h-5"/>}
        </button>
      </header>

      <AnimatePresence mode="wait">
        
        {/* --- PHASE 1: INPUT (PURE BLACK & WHITE) --- */}
        {status === 'idle' && (
          <motion.div 
            key="input"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center relative z-10 px-6"
          >
             <div className="w-full max-w-4xl">
                {/* Tabs */}
                <div className="flex justify-center mb-8">
                   <div className="flex p-1 bg-neutral-900 border border-neutral-800">
                     <button onClick={() => setSimulationMode('distort')} className={`px-10 py-3 text-xs font-bold uppercase tracking-widest transition-all ${simulationMode === 'distort' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}>Distortion</button>
                     <button onClick={() => setSimulationMode('neutralize')} className={`px-10 py-3 text-xs font-bold uppercase tracking-widest transition-all ${simulationMode === 'neutralize' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}>Truth</button>
                   </div>
                </div>

                {/* Black Input Box */}
                <div className="bg-black border border-white/20 shadow-2xl relative">
                   <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white" />
                   <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white" />
                   <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white" />
                   <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white" />
                   
                   <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={simulationMode === 'distort' ? "> Enter objective fact..." : "> Enter biased text..."}
                      className="w-full h-80 bg-black p-10 text-3xl font-light text-white placeholder-neutral-700 focus:outline-none resize-none font-serif leading-relaxed"
                   />
                   
                   <div className="border-t border-neutral-900 p-6 flex justify-between items-center bg-black">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{input.length} / 1000 CHARS</span>
                      <button 
                        onMouseEnter={playHover}
                        onClick={handleAnalyze}
                        disabled={!input.trim()}
                        className="px-12 py-4 text-xs font-black uppercase tracking-[0.2em] bg-white text-black hover:bg-neutral-200 transition-all disabled:opacity-50"
                      >
                        Initiate Sequence
                      </button>
                   </div>
                </div>

                {/* History */}
                {history.length > 0 && (
                  <div className="mt-8 flex justify-center gap-4">
                     {history.slice(0, 3).map(item => (
                       <button key={item.id} onClick={() => loadHistoryItem(item)} className="text-[10px] uppercase tracking-widest text-neutral-600 hover:text-white border-b border-transparent hover:border-white pb-1 transition-all truncate max-w-[200px]">
                         {item.input}
                       </button>
                     ))}
                  </div>
                )}
             </div>
          </motion.div>
        )}

        {/* --- PHASE 2: PROCESSING --- */}
        {status === 'processing' && (
          <motion.div key="processing" className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
             <div className="space-y-6 text-center">
                <div className="w-16 h-16 border-2 border-neutral-800 border-t-white rounded-full animate-spin mx-auto" />
                <div className="h-6 overflow-hidden">
                   <motion.p key={logs[logs.length-1]} initial={{ y: 20 }} animate={{ y: 0 }} className="text-xs font-mono uppercase tracking-[0.2em] text-white">
                     {logs[logs.length-1]}
                   </motion.p>
                </div>
             </div>
          </motion.div>
        )}

        {/* --- PHASE 3: RESULTS (COLORFUL) --- */}
        {status === 'results' && resultData && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col relative z-10 overflow-hidden pt-20">
            
            {/* Controls */}
            <div className="h-16 bg-black border-b border-white/10 flex items-center justify-between px-8 z-20">
               <div className="flex items-center gap-6 text-neutral-400">
                  <Sliders className="w-4 h-4"/>
                  <input type="range" min="0" max="100" value={intensity} onChange={(e) => setIntensity(parseInt(e.target.value))} className="w-32 h-1 bg-neutral-800 accent-white cursor-pointer rounded-full appearance-none"/>
                  <span className="text-xs font-mono text-white">{intensity}% Distortion</span>
               </div>
               <div className="flex gap-2">
                  {['standard', 'diff', 'redacted'].map(m => (
                    <button key={m} onClick={() => setViewMode(m)} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${viewMode === m ? 'bg-white text-black border-white' : 'bg-transparent text-neutral-500 border-neutral-800 hover:text-white'}`}>{m}</button>
                  ))}
               </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
               <div className="max-w-[2000px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                  
                  {/* SOURCE NODE (Black/White) */}
                  <div className="lg:col-span-1">
                     <div className="p-8 border border-neutral-800 bg-neutral-900/20 h-full">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 mb-6 flex items-center gap-3">
                           <Database className="w-4 h-4 text-white" /> Source
                        </h3>
                        <p className="text-xl text-white font-serif leading-loose opacity-90 border-l-2 border-white pl-4">"{input}"</p>
                     </div>
                  </div>

                  {/* RESULT CARDS (COLORFUL) */}
                  <div className="lg:col-span-3">
                     {simulationMode === 'distort' ? (
                       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                         {Object.keys(resultData).filter(key => THEMES[key.charAt(0).toUpperCase() + key.slice(1)]).map((key) => {
                            const title = key.charAt(0).toUpperCase() + key.slice(1);
                            const data = resultData[key];
                            const level = intensity < 33 ? "low" : intensity < 66 ? "med" : "high";
                            return (
                              <InteractiveCard 
                                key={key}
                                title={title} 
                                data={data} intensity={intensity} viewMode={viewMode}
                                onOpen={() => openModal({ title, ...data[level], triggers: data.high.triggers })}
                                playHover={playHover}
                              />
                            )
                         })}
                       </div>
                     ) : (
                       <div className="border border-blue-500/30 bg-blue-950/10 p-12">
                          <h3 className="text-base font-black text-blue-400 uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
                             <Shield className="w-6 h-6" /> Truth Restored
                          </h3>
                          <p className="text-3xl text-white font-light leading-relaxed">"{resultData.neutral_version}"</p>
                          <div className="mt-12 flex gap-4 flex-wrap">
                             {resultData.removed_terms?.map((t, i) => (
                               <span key={i} className="px-4 py-2 bg-black border border-red-500/30 text-xs text-red-400 uppercase tracking-wider font-bold line-through">{t}</span>
                             ))}
                          </div>
                       </div>
                     )}
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// --- COLORFUL INTERACTIVE CARD ---
const InteractiveCard = ({ title, data, intensity, viewMode, onOpen, playHover }) => {
  if (!data) return null;
  const levelKey = intensity < 33 ? "low" : intensity < 66 ? "med" : "high";
  const text = data[levelKey]?.text || "";
  const theme = THEMES[title];

  // Tailwind maps for dynamic colors
  const borderColor = {
    orange: "hover:border-orange-500/50",
    red: "hover:border-red-500/50",
    purple: "hover:border-purple-500/50",
    emerald: "hover:border-emerald-500/50",
    blue: "hover:border-blue-500/50"
  }[theme.color];

  const textColor = {
    orange: "text-orange-500",
    red: "text-red-500",
    purple: "text-purple-500",
    emerald: "text-emerald-500",
    blue: "text-blue-500"
  }[theme.color];

  const bgColor = {
    orange: "hover:bg-orange-950/10",
    red: "hover:bg-red-950/10",
    purple: "hover:bg-purple-950/10",
    emerald: "hover:bg-emerald-950/10",
    blue: "hover:bg-blue-950/10"
  }[theme.color];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      onMouseEnter={playHover}
      onClick={onOpen}
      className={`group relative p-8 bg-black border border-white/10 ${borderColor} ${bgColor} transition-all duration-500 cursor-pointer flex flex-col h-full min-h-[350px] shadow-lg`}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className={`p-3 bg-black border border-white/10 ${textColor} group-hover:scale-110 transition-transform duration-300`}>
            {theme.icon}
          </div>
          <span className={`text-xs font-black uppercase tracking-[0.2em] text-neutral-500 group-hover:text-white transition-colors`}>{title}</span>
        </div>
        <Info className={`w-4 h-4 text-neutral-700 group-hover:text-white transition-colors`} />
      </div>

      <div className="flex-1">
        {viewMode === 'standard' && <p className="text-lg text-neutral-300 font-serif font-light leading-relaxed group-hover:text-white transition-colors">"{text}"</p>}
        {viewMode === 'diff' && <p className="text-lg text-neutral-300 font-serif font-light leading-relaxed">"{text}"</p>}
        {viewMode === 'redacted' && (
          <div className="text-lg leading-loose font-mono">
             {text.split(" ").map((w,i) => <span key={i} className="bg-neutral-800 text-transparent hover:bg-transparent hover:text-white transition-all px-1 rounded-sm cursor-pointer mr-1">{w}</span>)}
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-neutral-900 flex justify-between items-center opacity-50 group-hover:opacity-100 transition-opacity">
         <span className={`text-[10px] uppercase tracking-widest ${textColor}`}>Tap for Analysis</span>
         <ChevronRight className={`w-4 h-4 ${textColor}`} />
      </div>
    </motion.div>
  );
};