'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Fingerprint, BrainCircuit, Eye, Terminal } from 'lucide-react';
import GlitchText from '@/components/GlitchText'; // Assumes you have this from previous steps

// Reusable Section Component for scroll reveals
const Reveal = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function About() {
  return (
    <div className="min-h-screen bg-black text-gray-300 selection:bg-cyber-danger selection:text-black font-sans overflow-x-hidden">
      
      {/* Background Textures */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 p-6 z-50">
        <Link href="/" className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-cyber-neon transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Return to Simulation
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-24 relative z-10">
        
        {/* --- HERO: THE WARNING --- */}
        <header className="mb-32 pt-12">
          <Reveal>
            <h1 className="text-6xl md:text-9xl font-bold font-orbitron text-white opacity-10 mb-4 select-none">
              ABOUT
            </h1>
            <div className="border-l-2 border-cyber-danger pl-6 md:pl-10">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
                This may upset you. <br />
                <span className="text-cyber-danger">That’s the point.</span>
              </h2>
              <p className="font-mono text-gray-400 text-sm md:text-base max-w-lg">
                You came here expecting clarity. <br/>
                You might leave with doubt. <br/>
                <br/>
                Reality Distortion Simulator isn’t built to comfort you. <br/>
                It’s built to <span className="text-white border-b border-white">interrupt you.</span>
              </p>
            </div>
          </Reveal>
        </header>

        {/* --- SECTION 1: THE MECHANISM --- */}
        <section className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative">
               <div className="absolute -inset-4 bg-cyber-neon/10 blur-xl rounded-full"></div>
               <BrainCircuit className="w-24 h-24 text-cyber-neon relative z-10" />
            </div>
            <h3 className="text-3xl font-orbitron text-white mt-8 mb-4">
              This App Doesn’t Lie.
            </h3>
            <p className="font-mono text-gray-400 leading-relaxed">
              It shows you how easily <span className="text-cyber-neon">you lie to yourself</span> — when the framing feels right.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="border border-white/10 bg-white/5 p-8 rounded-xl backdrop-blur-sm">
            <ul className="space-y-6 font-mono text-sm">
              <li className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>Same Facts</span>
                <span className="text-gray-600">→</span>
                <span className="text-white">Different Emotions</span>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>Same Event</span>
                <span className="text-gray-600">→</span>
                <span className="text-white">Contradictory Convictions</span>
              </li>
              <li className="text-center pt-2 text-cyber-danger uppercase tracking-widest text-xs">
                All Valid. All Convincing. All Dangerous.
              </li>
            </ul>
          </Reveal>
        </section>

        {/* --- SECTION 2: THE MIRROR --- */}
        <section className="mb-32 text-center">
          <Reveal>
            <Fingerprint className="w-12 h-12 text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl md:text-4xl font-bold mb-8">
              You think you want the truth.
            </h3>
            <p className="text-xl font-light text-gray-400 max-w-2xl mx-auto mb-12">
              What you actually want is the version that <span className="text-white font-bold">agrees with you.</span>
            </p>
            
            <div className="inline-block border border-cyber-danger text-cyber-danger font-mono text-xs px-4 py-2 uppercase tracking-[0.2em] animate-pulse">
              This app removes that privilege.
            </div>
          </Reveal>
        </section>

        {/* --- SECTION 3: THE FRACTURE PROCESS --- */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12 opacity-50">
            <Terminal className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-widest">System Diagnostic</span>
          </div>

          <div className="space-y-12 border-l border-white/10 pl-8 relative">
            <Reveal>
              <h4 className="text-white font-bold mb-2">01. INPUT</h4>
              <p className="font-mono text-sm text-gray-500">You input a fact. A clean one. Harmless.</p>
            </Reveal>

            <Reveal delay={0.1}>
              <h4 className="text-cyber-neon font-bold mb-2">02. FRACTURE</h4>
              <p className="font-mono text-sm text-gray-500 mb-4">Then it splits:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 bg-red-900/10 border border-red-900/30 text-red-400">Fear makes it urgent.</div>
                <div className="p-3 bg-green-900/10 border border-green-900/30 text-green-400">Optimism makes it harmless.</div>
                <div className="p-3 bg-purple-900/10 border border-purple-900/30 text-purple-400">Authority makes it unquestionable.</div>
                <div className="p-3 bg-blue-900/10 border border-blue-900/30 text-blue-400">Emotion makes it unforgettable.</div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h4 className="text-white font-bold mb-2">03. RESULT</h4>
              <p className="font-mono text-sm text-gray-500">Nothing changed. <span className="text-white">Except you.</span></p>
            </Reveal>
          </div>
        </section>

        {/* --- SECTION 4: THE UNCOMFORTABLE TRUTH --- */}
        <section className="mb-32 bg-cyber-dark/40 p-8 md:p-12 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <AlertTriangle className="w-24 h-24 text-cyber-danger" />
          </div>

          <Reveal>
            <h3 className="text-3xl font-orbitron text-white mb-6">
              This is where people get uncomfortable.
            </h3>
            <div className="space-y-6 font-mono text-sm md:text-base leading-relaxed text-gray-300">
              <p>
                Because the app doesn’t tell you: <br/>
                <span className="text-green-400">“This source is biased.”</span>
              </p>
              <p>
                It shows you: <br/>
                <span className="text-red-500 border-b border-red-500">“You are persuadable.”</span>
              </p>
              <p className="text-gray-500 italic">And that realization stings.</p>
            </div>
          </Reveal>
        </section>

        {/* --- SECTION 5: THE WHISPER --- */}
        <section className="mb-32 max-w-2xl mx-auto text-center">
          <Reveal>
            <h3 className="text-xl font-bold uppercase tracking-widest text-gray-600 mb-8">
              Bias doesn't announce itself.
            </h3>
            
            <div className="space-y-4 font-serif text-2xl md:text-3xl italic text-gray-400">
              <p className="opacity-40">It whispers.</p>
              <p className="opacity-60">It reassures.</p>
              <p className="opacity-80">It uses your language.</p>
              <p className="text-white">Your fears.</p>
              <p className="text-white">Your hopes.</p>
            </div>

            <p className="mt-12 font-mono text-xs text-cyber-danger">
              By the time you notice it, you’re already defending it.
            </p>
          </Reveal>
        </section>

        {/* --- SECTION 6: THE ANGER --- */}
        <section className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-12">
          <Reveal>
            <h3 className="text-4xl font-orbitron font-bold mb-4">
              Some users get angry.
            </h3>
            <p className="font-mono text-gray-400 mb-4">
              Not at the app. At themselves.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Because once you see how tone bends meaning, how emotion overrides logic, and how framing manufactures certainty... <br/>
              <span className="text-white font-bold">You can’t unsee it.</span>
            </p>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-col justify-center gap-4 text-sm font-mono text-gray-400 border-l border-white/10 pl-6">
            <p>News becomes suspicious.</p>
            <p>Certainty feels fake.</p>
            <p>Confidence looks rehearsed.</p>
          </Reveal>
        </section>

        {/* --- SECTION 7: SAFE SPACE --- */}
        <section className="mb-32 text-center py-20 border-y border-white/5">
           <Reveal>
             <h3 className="text-sm font-mono uppercase tracking-[0.5em] text-gray-600 mb-4">
               Safety Protocol: Disabled
             </h3>
             <GlitchText text="THIS IS NOT A SAFE SPACE" className="text-3xl md:text-5xl font-bold font-orbitron text-white mb-8" />
             <p className="text-xl text-gray-300 font-light">It’s an <span className="text-cyber-neon">honest</span> one.</p>
             
             <div className="flex flex-wrap justify-center gap-4 mt-8 opacity-60">
               <span className="px-3 py-1 border border-gray-700 rounded-full text-xs text-gray-500 line-through">No content warnings</span>
               <span className="px-3 py-1 border border-gray-700 rounded-full text-xs text-gray-500 line-through">No moral guidance</span>
               <span className="px-3 py-1 border border-gray-700 rounded-full text-xs text-gray-500 line-through">No correct interpretation</span>
             </div>
           </Reveal>
        </section>

        {/* --- SECTION 8: FINAL MANIFESTO --- */}
        <section className="mb-24">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/5 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                <h4 className="text-cyber-neon font-bold mb-2">IF IT MAKES YOU UNCOMFORTABLE</h4>
                <p className="text-sm text-gray-400">Good. Discomfort means the illusion cracked.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                <h4 className="text-cyber-danger font-bold mb-2">IF IT MAKES YOU ANGRY</h4>
                <p className="text-sm text-gray-400">Better. Anger means something you trusted didn’t survive scrutiny.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                <h4 className="text-cyber-purple font-bold mb-2">IF YOU QUESTION EVERYTHING</h4>
                <p className="text-sm text-gray-400">That’s not confusion. That’s awareness.</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* --- FOOTER CTA --- */}
        <footer className="text-center pb-20">
          <Reveal>
            <h2 className="text-3xl font-orbitron font-bold mb-4">Reality Distortion Simulator</h2>
            <p className="font-mono text-gray-500 mb-12">
              It doesn’t give answers. It removes certainty.
            </p>

            <Link href="/">
              <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-cyber-danger/10 border border-cyber-danger text-cyber-danger font-mono font-bold tracking-widest uppercase hover:bg-cyber-danger hover:text-black transition-all duration-300">
                <AlertTriangle className="w-5 h-5" />
                <span>Enter at your own risk</span>
                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-200 skew-x-12"></div>
              </button>
            </Link>

            <p className="mt-8 text-xs text-gray-600 font-mono">
              Use it carefully. Or don’t. <br/>
              Either way — your perception will not be the same afterward.
            </p>
          </Reveal>
        </footer>

      </div>
    </div>
  );
}