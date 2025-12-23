'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// 1. ADDED LINK IMPORT
import Link from 'next/link';
import { Play, ArrowRight, Eye, Zap, Sliders, Lock, Activity, MousePointer2, RotateCw } from 'lucide-react';
import { generateRealities } from '@/lib/engine';
import RealityCard from '@/components/RealityCard';
import GlitchText from '@/components/GlitchText'; 

// --- SCROLL SECTION COMPONENT ---
function Section({ children, className = "" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-[60vh] flex flex-col justify-center items-center text-center p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// --- LANDING PAGE ( The Manifesto ) ---
function LandingPage({ onEnter }) {
  // Animation variant for the blinking eye effect
  const blinkingEyeVariants = {
    initial: { scaleY: 1 },
    hover: {
      scaleY: [1, 0.1, 1], // Squashes down and back up
      transition: {
        duration: 0.25, // Quick blink duration
        times: [0, 0.5, 1],
        ease: "easeInOut",
        repeat: Infinity, // Keeps blinking while hovered
        repeatDelay: 2.5 // Waits 2.5 seconds between blinks for realism
      }
    }
  };

  return (
    <div className="bg-black text-white selection:bg-cyber-neon selection:text-black overflow-x-hidden">
      
      {/* 2. ADDED NAVIGATION BUTTON HERE */}
      <nav className="fixed top-0 right-0 p-6 z-50 mix-blend-difference">
        <Link href="/about" className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-cyber-neon transition-colors cursor-pointer">
          <span className="opacity-70 group-hover:opacity-100 transition-opacity">About / Manifesto</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </nav>

      {/* Background Noise & Grid */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0"></div>

      {/* --- HERO SECTION --- */}
      <div className="min-h-screen flex flex-col justify-center items-center relative z-10">
        {/* Blinking Eye Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          whileHover="hover" // Triggers the blink variant on hover
          className="relative mb-8 cursor-pointer group"
        >
           {/* Background Glow */}
           <div className="absolute -inset-10 bg-cyber-neon/20 blur-[100px] rounded-full opacity-50 animate-pulse-slow group-hover:bg-cyber-neon/30 transition-colors duration-500"></div>
           
           {/* The Eye Icon wrapped in motion div for blinking */}
           <motion.div variants={blinkingEyeVariants} className="relative z-10">
             <Eye className="w-20 h-20 text-cyber-neon group-hover:text-white transition-colors duration-300" />
           </motion.div>
        </motion.div>

        <GlitchText text="REALITY DISTORTION SIMULATOR" className="text-4xl md:text-7xl font-bold font-orbitron tracking-tighter text-center mb-6" />
        
        <p className="text-gray-400 font-mono tracking-[0.3em] uppercase text-sm md:text-base mb-12 animate-pulse">
          Truth is optional. Perception is programmable.
        </p>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
           <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Scroll to Initiate</span>
           <div className="w-[1px] h-16 bg-gradient-to-b from-cyber-neon to-transparent"></div>
        </motion.div>
      </div>

      {/* --- CHAPTER 1: THE REVEAL --- */}
      <Section>
        <h2 className="text-3xl md:text-5xl font-light leading-tight mb-8">
          What you read <br />
          <span className="font-serif italic text-gray-500">is not what happened.</span>
        </h2>
        <p className="text-xl md:text-2xl text-cyber-neon/80 font-mono">
          It’s what you were meant to feel.
        </p>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl">
          <div className="p-6 border-l border-cyber-neon/30">
            <h3 className="text-xl font-orbitron mb-2">The Same Fact.</h3>
          </div>
          <div className="p-6 border-l border-cyber-neon/30">
            <h3 className="text-xl font-orbitron mb-2">Different Realities.</h3>
          </div>
          <div className="p-6 border-l border-cyber-neon/30">
            <h3 className="text-xl font-orbitron mb-2">All Believable.</h3>
          </div>
        </div>
        <p className="mt-12 text-gray-500 font-mono text-sm max-w-2xl">
          This is not a news app. This is not an opinion engine. <br/>
          <span className="text-white">This is a simulation of how your perception is manipulated.</span>
        </p>
      </Section>

      {/* --- CHAPTER 2: THE WARNING --- */}
      <Section className="bg-cyber-danger/5 border-y border-cyber-danger/20">
        <div className="flex items-center gap-4 mb-6">
          <Activity className="w-8 h-8 text-cyber-danger animate-pulse" />
          <h2 className="text-2xl font-mono text-cyber-danger tracking-widest uppercase">WARNING</h2>
        </div>
        <h3 className="text-4xl md:text-6xl font-bold mb-8">
          You are not immune to bias.
        </h3>
        <p className="text-gray-400 font-mono mb-8">No one is.</p>
        
        <div className="space-y-4 text-lg md:text-xl font-light text-gray-300">
          <p>Every headline you scroll.</p>
          <p>Every stat you trust.</p>
          <p>Every narrative you repeat.</p>
          <p className="text-white pt-4">Has already passed through filters you didn’t choose.</p>
        </div>
      </Section>

      {/* --- CHAPTER 3: THE MECHANISM --- */}
      <Section>
        <div className="flex flex-col md:flex-row items-center gap-6 text-2xl md:text-4xl font-orbitron font-bold text-gray-500 mb-12">
          <span className="text-white">INPUT</span>
          <ArrowRight className="text-cyber-neon" />
          <span className="text-white">DISTORT</span>
          <ArrowRight className="text-cyber-neon" />
          <span className="text-cyber-neon drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">BELIEVE</span>
        </div>

        <div className="max-w-3xl text-left space-y-6 font-mono text-sm md:text-base border border-white/10 p-8 rounded-xl bg-white/5 backdrop-blur-md">
          <p className="text-gray-400">Paste a fact. Any fact.</p>
          <p className="text-white">Now watch it fracture:</p>
          <ul className="space-y-3 pl-4 border-l-2 border-cyber-neon/50">
            <li className="text-red-400">One version makes you anxious.</li>
            <li className="text-green-400">One calms you down.</li>
            <li className="text-orange-400">One makes you angry.</li>
            <li className="text-purple-400">One makes you obedient.</li>
            <li className="text-blue-400">One makes you feel "informed".</li>
          </ul>
          <p className="text-right text-gray-500 pt-4">// All from the same truth.</p>
        </div>
      </Section>

      {/* --- CHAPTER 4: THE PHILOSOPHY --- */}
      <Section>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          REALITY IS NOT BROKEN.
        </h2>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyber-neon to-cyber-purple mb-12">
          IT IS FRAMED.
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-sm uppercase tracking-widest text-gray-400">
          <div className="flex flex-col items-center gap-3">
             <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_red]"></div>
             Fear
          </div>
          <div className="flex flex-col items-center gap-3">
             <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_blue]"></div>
             Authority
          </div>
          <div className="flex flex-col items-center gap-3">
             <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_green]"></div>
             Hope
          </div>
          <div className="flex flex-col items-center gap-3">
             <div className="w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_yellow]"></div>
             Doubt
          </div>
        </div>
        
        <p className="mt-12 text-xl font-light">
          Change the tone <span className="text-cyber-neon">→</span> Change the meaning <span className="text-cyber-neon">→</span> <span className="text-white font-bold">Change the belief.</span>
        </p>
      </Section>

      {/* --- CHAPTER 5: THE FEATURES --- */}
      <Section className="gap-16">
        {/* Feature 1 */}
        <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8 text-left">
           <div className="flex-1">
             <h3 className="text-2xl font-orbitron mb-4 text-cyber-purple flex items-center gap-3">
               <Zap className="w-6 h-6" /> PARALLEL REALITIES
             </h3>
             <p className="text-gray-400 font-mono leading-relaxed">
               You don’t get the truth. You get a version. Switch realities. Break continuity. Watch narratives glitch.
             </p>
           </div>
           <div className="flex-1 font-mono text-xs text-gray-600 border border-gray-800 p-4 rounded bg-black">
              Which one feels right to you? <br/>
              And why?
           </div>
        </div>

        {/* Feature 2 */}
        <div className="max-w-4xl w-full flex flex-col md:flex-row-reverse items-center gap-8 text-left">
           <div className="flex-1">
             <h3 className="text-2xl font-orbitron mb-4 text-cyber-neon flex items-center gap-3">
               <Eye className="w-6 h-6" /> BIAS IS INVISIBLE
             </h3>
             <p className="text-gray-400 font-mono leading-relaxed">
               Every distorted reality reveals the bias applied, the cognitive shortcut exploited, and the emotional trigger activated.
             </p>
           </div>
           <div className="flex-1 font-mono text-xs text-gray-600 border border-gray-800 p-4 rounded bg-black">
              Nothing hidden. <br/>
              Nothing softened.
           </div>
        </div>

        {/* Feature 3 */}
        <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8 text-left">
           <div className="flex-1">
             <h3 className="text-2xl font-orbitron mb-4 text-cyber-danger flex items-center gap-3">
               <Sliders className="w-6 h-6" /> TURN THE DIAL
             </h3>
             <p className="text-gray-400 font-mono leading-relaxed">
               Neutral ←────────────→ Extreme. Slide it slowly. Notice when facts stop mattering and emotions take control.
             </p>
           </div>
           <div className="flex-1 font-mono text-xs text-gray-600 border border-gray-800 p-4 rounded bg-black">
              That point? <br/>
              That’s where manipulation begins.
           </div>
        </div>
      </Section>

      {/* --- FINAL CTA --- */}
      <div className="min-h-[80vh] flex flex-col justify-center items-center relative z-10 pb-20">
        <h2 className="text-2xl md:text-3xl font-mono text-gray-500 mb-8 uppercase tracking-widest text-center px-6">
          You are already inside the system.
        </h2>
        
        <p className="text-white mb-16 text-lg text-center max-w-lg px-6">
          Reality Distortion Simulator doesn’t tell you what to believe. <br/>
          <span className="text-cyber-neon font-bold">It shows you how belief is manufactured.</span>
        </p>

        <button 
          onClick={onEnter}
          className="group relative inline-flex items-center gap-6 px-16 py-8 bg-transparent border border-cyber-neon text-cyber-neon font-orbitron text-xl font-bold tracking-[0.3em] uppercase transition-all hover:bg-cyber-neon hover:text-black overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-4">
             [ ENTER REALITY ] <ArrowRight className="w-6 h-6" />
          </span>
          
          {/* Glitch Overlay */}
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          
          {/* Button Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[0_0_50px_rgba(0,243,255,0.5)] transition-opacity duration-300 pointer-events-none"></div>
        </button>
        
        <div className="mt-12 flex flex-col items-center gap-2 opacity-50">
           <p className="font-mono text-[10px] uppercase">Break the narrative</p>
           <p className="font-mono text-[10px] uppercase">See clearly — or don’t</p>
        </div>
      </div>

    </div>
  );
}


// --- MAIN SIMULATOR APP ---
export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [intensity, setIntensity] = useState(50);
  const [chaosMode, setChaosMode] = useState(false);
  const [realityIQ, setRealityIQ] = useState(false);
  const [revealed, setRevealed] = useState({});

  const handleSimulate = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setIsLoading(true);
    setData(null);
    setRevealed({});
    const result = await generateRealities(input, intensity, chaosMode);
    setData(result);
    setIsLoading(false);
  };

  const handleReveal = (id) => {
    if (realityIQ) setRevealed(prev => ({ ...prev, [id]: true }));
  };

  if (!hasEntered) {
    return <LandingPage onEnter={() => setHasEntered(true)} />;
  }

  // --- SIMULATOR RENDER ---
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="min-h-screen bg-cyber-black text-foreground scanlines p-6 md:p-12 relative overflow-x-hidden"
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          >
            <div className="text-center space-y-8">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 border-t-4 border-cyber-neon rounded-full animate-spin shadow-[0_0_20px_var(--color-cyber-neon)]" />
                <div className="absolute inset-4 border-r-4 border-cyber-purple rounded-full animate-spin [animation-direction:reverse]" />
              </div>
              <p className="text-cyber-neon font-mono text-xl tracking-[0.3em] animate-pulse">FRACTURING REALITY...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 border border-cyber-neon rounded-full flex items-center justify-center animate-pulse-slow">
                <Eye className="w-5 h-5 text-cyber-neon" />
             </div>
             <div>
               <h1 className="font-orbitron font-bold text-xl tracking-wider text-white">REALITY SIM</h1>
               <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">v2.5 // Online</p>
             </div>
          </div>
          <button 
            onClick={() => setHasEntered(false)}
            className="text-xs font-mono text-gray-500 hover:text-cyber-danger transition-colors uppercase tracking-widest"
          >
            [ Exit Simulation ]
          </button>
        </header>

        <section className="bg-cyber-dark/40 border border-white/5 p-8 rounded-2xl backdrop-blur-sm mb-12 shadow-2xl">
          <form onSubmit={handleSimulate} className="space-y-10">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-neon via-cyber-purple to-cyber-neon rounded-lg blur opacity-20 group-hover:opacity-75 transition duration-500 group-hover:duration-200"></div>
              <div className="relative bg-black rounded-lg p-1 ring-1 ring-white/10">
                <div className="flex items-center bg-cyber-dark/80 rounded-md px-4 py-4">
                  <span className="text-cyber-neon font-mono mr-4 text-xl animate-pulse">{'>'}</span>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a fact to distort..."
                    className="w-full bg-transparent text-xl font-mono text-white placeholder-gray-600 focus:outline-none"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-mono text-gray-400 uppercase tracking-widest">
                  <span>Distortion Intensity</span>
                  <span className="text-cyber-neon">{intensity}%</span>
                </div>
                <div className="relative h-2 bg-gray-800 rounded-full">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-cyber-neon to-cyber-purple rounded-full shadow-[0_0_10px_var(--color-cyber-neon)]" 
                    style={{ width: `${intensity}%` }} 
                  />
                  <input 
                    type="range" min="0" max="100" value={intensity} 
                    onChange={(e) => setIntensity(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setChaosMode(!chaosMode)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg border font-mono text-xs uppercase transition-all duration-300
                    ${chaosMode 
                      ? 'border-cyber-danger text-cyber-danger bg-cyber-danger/10 shadow-[0_0_15px_rgba(255,0,60,0.3)]' 
                      : 'border-white/10 text-gray-500 hover:border-cyber-danger/50 hover:text-cyber-danger'}`}
                >
                  <Zap size={16} className={chaosMode ? "fill-current" : ""} /> Chaos Mode
                </button>
                <button
                  type="button"
                  onClick={() => setRealityIQ(!realityIQ)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg border font-mono text-xs uppercase transition-all duration-300
                    ${realityIQ 
                      ? 'border-cyber-purple text-cyber-purple bg-cyber-purple/10 shadow-[0_0_15px_rgba(189,0,255,0.3)]' 
                      : 'border-white/10 text-gray-500 hover:border-cyber-purple/50 hover:text-cyber-purple'}`}
                >
                  <Sliders size={16} /> Reality IQ
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !input}
              className="group relative w-full overflow-hidden rounded-lg bg-cyber-gray p-4 transition-all hover:bg-cyber-gray/80 disabled:opacity-50"
            >
              <div className="absolute inset-0 w-0 bg-cyber-neon transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
              <div className="relative flex items-center justify-center gap-3 text-cyber-neon font-bold tracking-[0.25em] uppercase group-hover:text-white">
                 <Play size={18} fill="currentColor" /> INITIATE
              </div>
            </button>
          </form>
        </section>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
              <RealityCard data={data.neutral} hidden={realityIQ && !revealed['neutral']} onReveal={() => handleReveal('neutral')} />
              {data.distortions.map((card) => (
                <RealityCard 
                  key={card.id} 
                  data={card} 
                  hidden={realityIQ && !revealed[card.id]} 
                  onReveal={() => handleReveal(card.id)} 
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}