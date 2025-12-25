"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Quote, Eye, Check, X, AlertTriangle, ShieldAlert } from "lucide-react";

// --- NEW COMPONENT: VIRAL INTERCEPTOR (Logic Extracted Here) ---
const ViralSignalHandler = ({ onDefend }) => {
  const searchParams = useSearchParams();
  const signal = searchParams.get('signal');

  if (!signal) return null;

  let data = null;
  try {
    data = JSON.parse(atob(signal));
  } catch (e) {
    return null;
  }

  const { text, vector, virality } = data;

  const styles = {
    "FEAR": { border: "border-red-500", text: "text-red-500", bg: "bg-red-950/90", label: "THREAT DETECTED" },
    "OUTRAGE": { border: "border-orange-500", text: "text-orange-500", bg: "bg-orange-950/90", label: "VIOLATION DETECTED" },
    "VALIDATION": { border: "border-green-500", text: "text-green-500", bg: "bg-green-950/90", label: "EGO CONFIRMATION" },
    "CONFUSION": { border: "border-purple-500", text: "text-purple-500", bg: "bg-purple-950/90", label: "REALITY FRACTURE" }
  };

  const currentStyle = styles[vector] || styles["FEAR"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <div className={`max-w-2xl w-full border-2 ${currentStyle.border} ${currentStyle.bg} p-8 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden`}>
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/18/Scan_lines.png')]" />
        <div className="relative z-10 text-center space-y-6">
          <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full border ${currentStyle.border} ${currentStyle.text} text-xs font-black uppercase tracking-widest animate-pulse`}>
            <AlertTriangle className="w-4 h-4" />
            Incoming Signal: {currentStyle.label}
          </div>
          <div className="py-8">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase leading-tight tracking-tighter drop-shadow-2xl">
              "{text}"
            </h1>
            <div className="mt-4 flex justify-center gap-8 text-xs font-mono text-white/50 uppercase tracking-widest">
              <span>Virality: {virality}%</span>
              <span>Vector: {vector}</span>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 space-y-4">
            <p className="text-white/70 text-sm">This belief has been engineered for survival. It is now spreading.</p>
            <button 
              onClick={() => onDefend(text)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-neutral-200 transition-all w-full md:w-auto justify-center"
            >
              <ShieldAlert className="w-5 h-5 text-red-600" />
              Intercept & Defend Reality
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- BIAS GAME COMPONENT ---
const BiasGame = () => {
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const questions = [
    {
      text: "The regime's desperate claw-back of funds will devastate the working class.",
      options: [
        { label: "Neutral Reporting", isCorrect: false },
        { label: "Fear / Alarmism", isCorrect: true },
        { label: "Optimism", isCorrect: false }
      ],
      explanation: "Words like 'regime', 'desperate', and 'devastate' are high-arousal fear triggers."
    },
    {
      text: "We are streamlining our workforce to optimize synergy and agility for Q4.",
      options: [
        { label: "Corporate Spin", isCorrect: true },
        { label: "Objective Fact", isCorrect: false },
        { label: "Cynicism", isCorrect: false }
      ],
      explanation: "'Streamlining' and 'optimize synergy' are classic euphemisms for firing people."
    }
  ];

  const currentQ = questions[step % questions.length];

  const handleGuess = (isCorrect) => {
    setAnswered(true);
    setCorrect(isCorrect);
  };

  const nextQ = () => {
    setStep(step + 1);
    setAnswered(false);
    setCorrect(false);
  };

  return (
    <div className="border border-neutral-800 bg-neutral-900/30 p-8 my-24 max-w-2xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-20 text-[100px] leading-none font-bold select-none pointer-events-none">?</div>
      <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8">Mini-Game: Spot The Bias</h3>
      <div className="min-h-[200px]">
        <p className="text-2xl text-white font-serif mb-8">"{currentQ.text}"</p>
        {!answered ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentQ.options.map((opt, i) => (
              <button key={i} onClick={() => handleGuess(opt.isCorrect)} className="py-3 border border-neutral-700 hover:bg-white hover:text-black transition-colors text-sm uppercase tracking-widest">{opt.label}</button>
            ))}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className={`flex items-center gap-3 text-lg font-bold ${correct ? 'text-green-500' : 'text-red-500'}`}>
               {correct ? <Check className="w-6 h-6"/> : <X className="w-6 h-6"/>}
               {correct ? "Correct Identification." : "Incorrect."}
            </div>
            <p className="text-neutral-300">{currentQ.explanation}</p>
            <button onClick={nextQ} className="text-xs underline text-neutral-500 hover:text-white">Next Sample</button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- ANIMATION CONFIG ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// --- INTERACTIVE COMPONENTS ---
const ReactionTest = () => {
  const [state, setState] = useState('idle');
  const [result, setResult] = useState(null);
  const startTimeRef = useRef(null);
  const timeoutRef = useRef(null);

  const startTest = () => {
    setState('waiting');
    setResult(null);
    const delay = 1000 + Math.random() * 2000;
    timeoutRef.current = setTimeout(() => {
      setState('ready');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleInteract = () => {
    if (state === 'ready') {
      const time = Date.now() - startTimeRef.current;
      setResult(time);
      setState('done');
    } else if (state === 'waiting') {
      if(timeoutRef.current) clearTimeout(timeoutRef.current);
      setState('idle'); 
      alert("Too early. Wait for the signal.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault(); 
        if (state === 'idle') startTest();
        else handleInteract();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state]);

  return (
    <div className="border border-neutral-800 bg-neutral-900/30 p-8 my-12 text-center select-none relative group">
      <div className="absolute top-0 left-0 w-1 h-full bg-red-900 group-hover:bg-red-600 transition-colors" />
      <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Interaction: The Millisecond Gap</h3>
      {state === 'idle' && (
        <button onClick={startTest} className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors">Test Your Reflexes <span className="text-[10px] block opacity-50 mt-1">(or press SPACE)</span></button>
      )}
      {state === 'waiting' && <div onMouseDown={handleInteract} className="w-full h-32 flex items-center justify-center bg-neutral-800 cursor-pointer animate-pulse"><span className="text-neutral-500 uppercase tracking-widest">Wait for Green...</span></div>}
      {state === 'ready' && <div onMouseDown={handleInteract} className="w-full h-32 flex items-center justify-center bg-red-600 cursor-pointer"><span className="text-white font-bold uppercase tracking-widest text-xl">CLICK NOW!</span></div>}
      {state === 'done' && <div className="space-y-4"><div className="text-5xl font-mono text-white">{result}ms</div><p className="text-neutral-400 text-sm max-w-md mx-auto">Emotional processing takes ~200ms. <br/><span className="text-red-500">You reacted before you could fully think.</span></p><button onClick={() => setState('idle')} className="text-xs text-neutral-500 underline mt-4 hover:text-white">Try Again</button></div>}
    </div>
  );
};

const FramingToggle = () => {
  const [mode, setMode] = useState('neutral');
  const content = {
    neutral: { text: "The company announced a 10% workforce reduction.", color: "text-neutral-400" },
    alarmist: { text: "Corporate bloodbath: Thousands slashed as crisis deepens.", color: "text-red-500" },
    corporate: { text: "We are optimizing our talent synergy for future agility.", color: "text-blue-400" },
  };
  return (
    <div className="border border-neutral-800 bg-black p-6 my-12">
       <div className="flex justify-center gap-4 mb-8 border-b border-neutral-900 pb-4">
          {['neutral', 'alarmist', 'corporate'].map((m) => (
             <button key={m} onClick={() => setMode(m)} className={`text-[10px] uppercase tracking-widest px-3 py-1 transition-all ${mode === m ? 'bg-white text-black' : 'text-neutral-600 hover:text-white'}`}>{m}</button>
          ))}
       </div>
       <div className="h-32 flex items-center justify-center text-center px-4">
          <motion.p key={mode} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`text-xl md:text-2xl font-serif ${content[mode].color}`}>"{content[mode].text}"</motion.p>
       </div>
       <p className="text-center text-[10px] text-neutral-600 mt-4 uppercase">The fact (10% cut) remained constant.</p>
    </div>
  );
};

const TextXRay = () => {
  return (
    <div className="my-12 p-8 border border-neutral-800 bg-neutral-900/10 text-center cursor-help group">
      <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-6 flex items-center justify-center gap-2"><Eye className="w-4 h-4" /> Hover to Reveal Bias</h3>
      <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-serif">
        "The <span className="relative inline-block border-b border-dashed border-neutral-600 hover:border-red-500 hover:text-red-500 transition-colors">controversial<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-red-900 text-white text-[10px] p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-sans uppercase tracking-wide">Implies guilt</span></span> decision sparked 
        <span className="relative inline-block border-b border-dashed border-neutral-600 hover:border-red-500 hover:text-red-500 transition-colors mx-1">outrage<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-red-900 text-white text-[10px] p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-sans uppercase tracking-wide">Emotional Scale</span></span>
        among the <span className="relative inline-block border-b border-dashed border-neutral-600 hover:border-red-500 hover:text-red-500 transition-colors mx-1">vulnerable<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-red-900 text-white text-[10px] p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-sans uppercase tracking-wide">Victim Frame</span></span> population."
      </p>
    </div>
  );
};

const Section = ({ children, className = "" }) => (
  <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10% 0px -10% 0px" }} variants={fadeUp} className={`max-w-3xl mx-auto py-24 px-6 md:px-0 ${className}`}>{children}</motion.section>
);
const Highlight = ({ children }) => <span className="text-white font-bold">{children}</span>;
const Divider = () => <div className="w-px h-16 bg-gradient-to-b from-transparent via-neutral-800 to-transparent mx-auto my-16 opacity-50" />;
const QuoteBlock = ({ text, author, context }) => (
  <div className="my-16 text-center space-y-6 px-4 md:px-12 border-l-2 border-red-900/50 bg-neutral-900/10 py-12">
    <Quote className="w-8 h-8 text-red-700 mx-auto opacity-50 mb-4" />
    <p className="text-xl md:text-3xl text-white font-serif italic leading-relaxed">"{text}"</p>
    <div className="text-sm font-mono text-neutral-500 uppercase tracking-widest">— {author}{context && <span className="block text-[10px] opacity-60 mt-1 lowercase normal-case">({context})</span>}</div>
  </div>
);
const FactBox = ({ title, children }) => (
  <div className="border border-neutral-800 bg-neutral-900/20 p-8 my-8 relative overflow-hidden group">
    <div className="absolute top-0 left-0 w-1 h-full bg-neutral-700 group-hover:bg-white transition-colors duration-500" />
    <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">{title}</h3>
    <div className="text-lg md:text-xl text-neutral-300 space-y-4">{children}</div>
  </div>
);

// --- MAIN PAGE ---
export default function Homepage() {
  const router = useRouter();
  const [showNav, setShowNav] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setShowNav(true), 6000); return () => clearTimeout(timer); }, []);

  const handleDefend = (topic) => {
    const encodedTopic = encodeURIComponent(topic);
    window.location.href = `https://debate-again.vercel.app/create?topic=${encodedTopic}&source=TIO`;
  };

  return (
    <main className="bg-black min-h-screen text-neutral-500 font-mono selection:bg-red-900 selection:text-white overflow-x-hidden">
      
      {/* 1. WRAP SEARCH PARAMS LOGIC IN SUSPENSE */}
      <Suspense fallback={null}>
        <ViralSignalHandler onDefend={handleDefend} />
      </Suspense>

      <motion.nav initial={{ opacity: 0 }} animate={{ opacity: showNav ? 1 : 0 }} transition={{ duration: 1 }} className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest text-neutral-700">RDS // v2.0</span>
        <button onClick={() => router.push('/about')} className="pointer-events-auto px-6 py-3 border border-neutral-900 bg-black hover:border-neutral-600 text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-all duration-300">[ About ]</button>
      </motion.nav>

      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative z-10">
        <div className="max-w-4xl space-y-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 4, times: [0, 0.2, 0.8, 1] }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white">Truth is Optional.</h1>
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-red-600 mt-2">Perception is Programmable.</h1>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 5.5 }} className="space-y-8">
            <p className="text-xl md:text-2xl text-white">Information does not arrive neutral.</p>
            <p className="text-lg text-neutral-400">By the time you read a sentence,<br /><Highlight>your brain has already decided how to feel about it.</Highlight></p>
            <div className="flex flex-col gap-2 text-sm uppercase tracking-widest text-neutral-600 pt-8"><span>This happens before logic.</span><span>This happens before reasoning.</span><span className="text-red-500">This happens before awareness.</span></div>
            <div className="pt-24 opacity-50"><span className="text-[10px] animate-pulse uppercase tracking-widest">This website exists inside that moment</span></div>
          </motion.div>
        </div>
      </section>

      <Section>
        <FactBox title="A Measurable Fact">
          <p>Studies in cognitive psychology show that emotional response precedes rational evaluation by <Highlight>milliseconds</Highlight>.</p>
          <p className="text-sm uppercase tracking-widest text-neutral-500">Not seconds. Milliseconds.</p>
          <p>That is enough to bias judgment. Enough to anchor belief. Enough to shape memory.</p>
          <p className="text-white mt-4">You are not slow. Your brain is fast.</p>
        </FactBox>
        <ReactionTest />
      </Section>

      <Section className="space-y-6">
        <h2 className="text-white text-2xl uppercase tracking-tighter">Another Fact</h2>
        <p className="text-lg">The same factual statement, when framed differently, can produce:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm uppercase tracking-wider text-neutral-400 my-8">
          <div className="p-3 border border-neutral-800 text-center">Fear</div><div className="p-3 border border-neutral-800 text-center">Confidence</div><div className="p-3 border border-neutral-800 text-center">Anger</div><div className="p-3 border border-neutral-800 text-center">Compliance</div><div className="p-3 border border-neutral-800 text-center text-white border-white">Trust</div>
        </div>
        <p>Without changing a single data point.</p>
        <p>This is not theory. <Highlight>This is framing.</Highlight></p>
        <FramingToggle />
      </Section>

      <Section><QuoteBlock text="We do not see things as they are. We see them as we are." author="Anaïs Nin" /></Section>

      <Section>
        <h2 className="text-2xl text-white mb-8">How Information Actually Persuades</h2>
        <p className="mb-6">Most persuasion does not work by convincing you. It works by:</p>
        <ul className="space-y-4 border-l border-neutral-800 pl-6 mb-8"><li>Selecting which detail appears first</li><li>Repeating certain words</li><li>Attaching emotional adjectives</li><li>Implying urgency or authority</li></ul>
        <TextXRay />
        <p className="text-lg text-white">By the time you ask “Is this true?”, your nervous system has already reacted. <br/><span className="text-red-500">Truth arrives late.</span></p>
      </Section>

      <Section>
        <FactBox title="Documented Reality">
          <ul className="space-y-2 list-disc pl-4 text-neutral-400 text-base"><li>Framing effects alter decision-making</li><li>Emotional language increases belief retention</li><li>Authority tone increases compliance</li><li>Repetition increases perceived truth</li></ul>
          <p className="mt-6 text-white">None of these require false information. Only presentation.</p>
        </FactBox>
      </Section>

      <Section><QuoteBlock text="A lie can travel halfway around the world while the truth is putting on its shoes." author="Attributed to Mark Twain" context="Ironically, the attribution itself is disputed. Even the quote about misinformation is framed." /></Section>
      <Divider />

      <Section className="text-center">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">What This Website Is</h2>
        <p className="text-xl mb-4">Reality Distortion Simulator is not a news site. <br/>It is not a fact-checker. <br/>It is not a detector.</p>
        <p className="text-2xl text-white border-y border-neutral-800 py-8 my-8">It is a simulation of perception.</p>
        <p>It shows how the same fact can create multiple psychological realities.</p>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-white uppercase text-sm mb-4">What You Bring</h3>
            <p className="mb-4">You bring a headline, a statistic, a factual claim. Something ordinary. Something believable.</p>
            <div className="bg-neutral-900 p-4 font-mono text-sm text-neutral-300 border-l-2 border-white italic">“Fuel prices increased by 5% this month.”</div>
            <p className="mt-2 text-xs text-neutral-600">Nothing emotional. Just information.</p>
          </div>
          <div>
            <h3 className="text-white uppercase text-sm mb-4">What The System Does</h3>
            <p className="mb-4">First, it removes emotional language.</p>
            <p className="mb-4 text-white">What remains is a neutral reality. Flat. Unconvincing. Quiet.</p>
            <p>Then the same fact is reconstructed. Not changed. <Highlight>Reframed.</Highlight></p>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl text-white mb-8">Parallel Versions Appear</h2>
        <p className="mb-8">The same information becomes:</p>
        <div className="space-y-2 text-lg text-white font-bold uppercase opacity-80">
          <p className="hover:text-red-500 transition-colors cursor-default">A Threat</p>
          <p className="hover:text-green-500 transition-colors cursor-default">A Reassurance</p>
          <p className="hover:text-blue-500 transition-colors cursor-default">A Political Argument</p>
          <p className="hover:text-yellow-500 transition-colors cursor-default">A Corporate Justification</p>
          <p className="hover:text-purple-500 transition-colors cursor-default">An Emotional Trigger</p>
        </div>
        <p className="mt-8 text-neutral-400">All of them are “true”. All of them feel different.</p>
      </Section>

      <Section><QuoteBlock text="People don’t believe what is true. They believe what feels true." author="Cognitive Bias Research Summary" /></Section>

      <Section className="border-l-4 border-red-900 pl-8 py-2">
        <h2 className="text-red-500 uppercase tracking-widest text-sm mb-4">The Dangerous Part</h2>
        <p className="text-2xl text-white mb-6">One version will feel obvious.</p>
        <p className="mb-6">Not because it is more accurate. Because it matches:</p>
        <ul className="text-neutral-300 space-y-2 mb-6"><li>Your fears</li><li>Your hopes</li><li>Your identity</li><li>Your expectations</li></ul>
        <p>That reaction is automatic. This website does not shame it. <Highlight>It exposes it.</Highlight></p>
      </Section>

      <Section><FactBox title="Another Fact"><p>Once a belief is emotionally accepted, contradictory evidence is processed more critically than supportive evidence.</p><p className="mt-4 text-white">This is called motivated reasoning.</p><p>Your brain defends what it already feels.</p></FactBox></Section>

      <Section><QuoteBlock text="It is difficult to get a man to understand something when his salary depends on his not understanding it." author="Upton Sinclair" context="Replace 'salary' with: ideology, identity, belonging. The mechanism remains." /></Section>

      <Section>
        <h2 className="text-2xl text-white mb-8">What Starts to Change</h2>
        <div className="grid md:grid-cols-2 gap-8">
           <div className="space-y-4"><p>You notice adjectives before facts.</p><p>You notice urgency before evidence.</p><p>You notice authority before logic.</p></div>
           <div className="space-y-4 text-white"><p>You reread sentences.</p><p>You hesitate.</p><p>You feel certainty forming — and interrupt it.</p></div>
        </div>
        <p className="mt-8 text-center text-sm uppercase tracking-widest border border-neutral-800 p-4">That interruption is not weakness. It is awareness.</p>
      </Section>

      <Section className="text-center max-w-xl">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-6">This Is Not Comforting</h2>
        <p className="mb-4">This does not make you immune. No one is immune.</p>
        <p className="mb-8">It only makes the manipulation visible. Visibility does not remove influence. It slows it.</p>
        <p className="text-white text-lg">Sometimes, slowing is the only defense.</p>
      </Section>
      
      <Section><QuoteBlock text="The most effective propaganda is not what is said, but what is taken for granted." author="Media Theory Principle" /></Section>
      <Divider />

      <Section>
         <BiasGame />
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">What This Is Not</h3>
            <ul className="space-y-2 text-neutral-400"><li>❌ Not fake news</li><li>❌ Not propaganda</li><li>❌ Not opinion</li></ul>
            <p className="mt-4 text-white">This is structural analysis.</p>
            <p>It examines how meaning is constructed, not what meaning should be.</p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4">A Quiet Warning</h3>
            <p className="mb-4">Once you learn to see framing, you will notice it everywhere. News. Politics. Marketing. Conversations.</p>
            <p className="text-white">You will not be able to turn it off.</p>
          </div>
        </div>
      </Section>

      <section className="py-40 px-6 flex flex-col items-center justify-center bg-black border-t border-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-900/5 blur-[150px]" />
        <div className="relative z-10 text-center max-w-2xl space-y-12">
          <div className="space-y-4">
             <h2 className="text-3xl text-white uppercase tracking-tighter">If You Continue</h2>
             <p className="text-lg text-neutral-400">Paste a fact. Watch it fracture. Notice which version reaches you first.</p>
             <p className="text-white font-bold">Then ask yourself why.</p>
          </div>
          <div>
            <button onClick={() => router.push('/simulator')} className="group relative inline-flex items-center justify-center px-12 py-5 text-sm font-bold text-black transition-all duration-300 bg-white hover:bg-red-600 hover:text-white uppercase tracking-[0.2em]">Enter the Simulator<ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" /></button>
          </div>
          <div className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity space-y-2"><p>Understanding framing doesn’t make you safe.</p><p className="text-red-500">It makes you responsible.</p></div>
        </div>
      </section>
    </main>
  );
}