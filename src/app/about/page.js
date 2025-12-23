"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useVelocity, useReducedMotion, useMotionValueEvent } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// --- 1. CONFIGURATION ---

const SCRIPT = [
  { id: 0, range: [0, 0.03], text: "", type: "silence" }, 
  { id: 1, range: [0.03, 0.08], text: "You came here looking for answers.", type: "familiarity" },
  { id: 2, range: [0.08, 0.13], text: "But answers are rarely neutral.", type: "doubt" },
  { id: 3, range: [0.13, 0.18], text: ["It arrives with tone.", "With emphasis.", "With intent."], type: "awareness" },
  { id: 4, range: [0.18, 0.23], text: "Wait. Did that change?", type: "gaslight" }, 
  { id: 5, range: [0.23, 0.30], text: "WHAT THIS WEBSITE IS", type: "grounding" },
  { id: 6, range: [0.30, 0.35], text: ["Facts don't usually deceive you.", "PRESENTATION DOES."], type: "realization" },
  { id: 7, range: [0.35, 0.43], text: ["Bias", "Urgency", "Framing", "Control"], type: "overload" },
  { id: 8, range: [0.43, 0.50], text: ["Designed", "To", "Shape", "You"], type: "pattern" },
  { id: 9, range: [0.50, 0.56], text: "This isn't centered.", type: "engagement" },
  { id: 10, range: [0.56, 0.61], text: "THIS IS NEUTRAL REALITY.", type: "neutral" }, 
  { id: 11, range: [0.61, 0.66], text: "Then the truth fractures.", type: "fracture" },
  { id: 12, range: [0.66, 0.72], text: ["Fear Reality", "Optimistic Reality", "Cynical Reality", "Corporate Reality"], type: "dissonance" },
  { id: 13, range: [0.72, 0.76], text: "This is where it gets uncomfortable.", type: "discomfort" },
  { id: 14, range: [0.76, 0.81], text: "Why does this one feel true to you?", type: "introspection" },
  { id: 15, range: [0.81, 0.86], text: "Awareness is irreversible.", type: "mirror" }, 
  { id: 16, range: [0.86, 0.90], text: "SOME PEOPLE GET MAD HERE.", type: "confrontation" },
  { id: 17, range: [0.90, 0.94], text: "This is not a comfort tool.", type: "authority" },
  { id: 18, range: [0.94, 0.98], text: "It is a mirror.", type: "resolution" },
  { id: 19, range: [0.98, 1.0], text: "ENTER THE SIMULATOR", type: "cta" },
];

// --- 2. SCENE COMPONENTS ---

const SceneSilence = ({ progress }) => {
  const opacity = useTransform(progress, [0, 1], [0, 0.08]);
  return (
    <motion.div style={{ opacity }} className="fixed inset-0 pointer-events-none z-0 mix-blend-overlay">
       <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50" />
    </motion.div>
  );
};

const SceneGaslight = ({ progress, scrollVelocity }) => {
    const [text, setText] = useState("Wait. Did that change?");
    const [hasChanged, setHasChanged] = useState(false);
    const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    useEffect(() => {
        return scrollVelocity.on("change", (latest) => {
            if (latest < -500 && !hasChanged) {
                setText("Wait. Was it always like this?");
                setHasChanged(true);
            }
        });
    }, [scrollVelocity, hasChanged]);

    return (
        <motion.h2 
            style={{ opacity }} 
            className="text-3xl md:text-5xl font-light text-neutral-300 transition-all duration-1000"
        >
            {text}
        </motion.h2>
    );
};

const SceneRealization = ({ progress, text }) => {
  const [line1, line2] = text;
  
  const glitch = useTransform(progress, [0.4, 0.5, 0.6], [0, 10, 0]);
  const color = useTransform(progress, [0.45, 0.5, 0.55], ["#a3a3a3", "#ef4444", "#a3a3a3"]); 
  
  return (
    <div className="flex flex-col gap-4 items-center text-center">
      <motion.h2 style={{ opacity: useTransform(progress, [0, 0.2], [0, 1]) }} className="text-2xl md:text-3xl text-neutral-500 font-light">{line1}</motion.h2>
      <motion.h2 
        style={{ 
            x: glitch,
            color,
            opacity: useTransform(progress, [0.2, 0.4], [0, 1])
        }} 
        className="text-4xl md:text-6xl font-bold uppercase tracking-widest"
      >
        {line2}
      </motion.h2>
    </div>
  );
};

const SceneDissonance = ({ progress, text }) => {
    // 1. Hooks (MUST RUN EVERY TIME)
    const y1 = useTransform(progress, [0, 1], [100, 0]);
    const y2 = useTransform(progress, [0, 1], [-100, 0]);
    const x1 = useTransform(progress, [0, 1], [-100, 0]);
    const x2 = useTransform(progress, [0, 1], [100, 0]);
    
    const op1 = useTransform(progress, [0, 0.3], [0, 1]);
    const op2 = useTransform(progress, [0, 0.4], [0, 1]);
    const op3 = useTransform(progress, [0, 0.5], [0, 1]);
    const op4 = useTransform(progress, [0, 0.6], [0, 1]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <motion.div style={{ y: y1, opacity: op1 }} className="text-xl md:text-2xl font-mono text-red-500">{text[0]}</motion.div>
            <motion.div style={{ y: y2, opacity: op2 }} className="text-xl md:text-2xl font-mono text-green-500">{text[1]}</motion.div>
            <motion.div style={{ x: x1, opacity: op3 }} className="text-xl md:text-2xl font-mono text-neutral-500">{text[2]}</motion.div>
            <motion.div style={{ x: x2, opacity: op4 }} className="text-xl md:text-2xl font-mono text-blue-500">{text[3]}</motion.div>
        </div>
    );
};

const SceneMirror = ({ progress, text }) => {
    const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const [showHidden, setShowHidden] = useState(false);
    
    useEffect(() => {
        const t = setTimeout(() => setShowHidden(true), 3000);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="text-center relative">
            <motion.h2 style={{ opacity }} className="text-3xl md:text-5xl font-light text-white mb-4">
                {text}
            </motion.h2>
            
            {showHidden && (
                <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 2 }}
                    className="text-xs font-mono text-neutral-600 absolute -bottom-12 left-0 right-0"
                >
                    (You are still looking for a safe answer.)
                </motion.p>
            )}
        </div>
    )
}

const SceneCTA = ({ progress, text }) => {
    const router = useRouter();
    const opacity = useTransform(progress, [0, 1], [0, 1]);
    const scale = useTransform(progress, [0, 1], [0.9, 1]);
    
    return (
        <motion.div style={{ opacity, scale }} className="text-center">
            <button 
                onClick={() => router.push('/simulator')}
                className="group relative px-12 py-6 bg-transparent overflow-hidden"
            >
                <span className="relative z-10 text-white font-bold tracking-[0.2em] uppercase text-xl group-hover:text-black transition-colors duration-300">{text}</span>
                <div className="absolute inset-0 border border-white group-hover:bg-white transition-colors duration-300" />
                <span className="absolute inset-0 border border-red-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-100" />
            </button>
            <p className="mt-8 text-[10px] font-mono text-neutral-600">NO PERSONAL DATA IS STORED.</p>
        </motion.div>
    )
}

const GenericScene = ({ progress, text, type }) => {
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const blur = useTransform(progress, [0, 0.2], ["10px", "0px"]);
  
  // Deterministic Shake
  const shake = useTransform(progress, (v) => {
      if (type === 'discomfort' && v > 0.4 && v < 0.6) {
          return Math.sin(v * 50) * 4; 
      }
      return 0;
  });

  const xValue = useTransform(shake, (s) => {
      if (type === 'engagement') return 24;
      return s;
  });
  
  const isArray = Array.isArray(text);

  return (
    <motion.div 
      style={{ 
          opacity, 
          filter: useTransform(blur, b => `blur(${b})`), 
          x: xValue 
      }} 
      className={`text-center max-w-3xl px-6 ${type === 'neutral' ? 'text-white font-bold tracking-tight' : 'text-neutral-300'}`}
    >
      {isArray ? (
        <div className="flex flex-col gap-6">
            {text.map((line, i) => (
                 <p key={i} className={`text-2xl md:text-4xl font-light leading-relaxed ${type === 'overload' ? 'text-neutral-500' : ''}`}>{line}</p>
            ))}
        </div>
      ) : (
        <h2 className={`text-3xl md:text-6xl font-light leading-tight ${type === 'neutral' ? 'text-white' : 'text-neutral-400'}`}>{text}</h2>
      )}
    </motion.div>
  );
};


// --- 3. WRAPPER COMPONENT ---
// This ensures hooks are isolated per scene
const SceneWrapper = ({ scene, scrollYProgress, scrollVelocity }) => {
  const sceneProgress = useTransform(scrollYProgress, scene.range, [0, 1]);
  
  // Visibility logic
  const opacity = useTransform(scrollYProgress, (v) => {
      const start = scene.range[0] - 0.001;
      const end = scene.range[1] + 0.001;
      return v >= start && v <= end ? 1 : 0;
  });

  const pointerEvents = useTransform(opacity, v => v === 1 ? 'auto' : 'none');

  return (
    <motion.div 
        style={{ opacity, pointerEvents }}
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
    >
        {scene.type === 'gaslight' ? (
            <SceneGaslight progress={sceneProgress} scrollVelocity={scrollVelocity} />
        ) : scene.type === 'realization' ? (
            <SceneRealization progress={sceneProgress} text={scene.text} />
        ) : scene.type === 'dissonance' ? (
            <SceneDissonance progress={sceneProgress} text={scene.text} />
        ) : scene.type === 'mirror' ? (
            <SceneMirror progress={sceneProgress} text={scene.text} />
        ) : scene.type === 'cta' ? (
            <SceneCTA progress={sceneProgress} text={scene.text} />
        ) : (
            <GenericScene progress={sceneProgress} text={scene.text} type={scene.type} />
        )}
    </motion.div>
  );
};


// --- 4. MAIN PAGE ---

export default function AboutPage() {
  const containerRef = useRef(null);
  const router = useRouter();
  
  const { scrollYProgress, scrollY } = useScroll({ target: containerRef });
  const scrollVelocity = useVelocity(scrollY);
  
  // Memoize script to ensure stability
  const activeScript = useMemo(() => SCRIPT.filter(scene => scene.type !== 'silence'), []);

  return (
    <main ref={containerRef} className="bg-black min-h-[2000vh] relative selection:bg-red-900 selection:text-white cursor-default">
      
      {/* 4.1 UI CONTROLS (Simplified) */}
      <div className="fixed top-0 left-0 w-full p-6 z-[100] flex justify-between items-start pointer-events-none">
          <button 
            onClick={() => router.push('/')}
            className="pointer-events-auto flex items-center gap-2 text-neutral-600 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Exit
          </button>
      </div>

      <SceneSilence progress={scrollYProgress} />

      {/* 4.3 STICKY STAGE */}
      <div className="fixed inset-0 flex items-center justify-center">
        {activeScript.map((scene) => (
            <SceneWrapper 
                key={scene.id} 
                scene={scene} 
                scrollYProgress={scrollYProgress} 
                scrollVelocity={scrollVelocity}
            />
        ))}
      </div>

      {/* 4.4 PROGRESS BAR */}
      <motion.div 
        style={{ scaleX: scrollYProgress }} 
        className="fixed bottom-0 left-0 h-1 origin-left z-50 bg-neutral-800" 
      />
      
      {/* 4.5 SCROLL HINT */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.02], [1, 0]) }}
        className="fixed bottom-10 w-full text-center text-neutral-700 animate-pulse font-mono text-[10px] uppercase tracking-widest"
      >
        Scroll Deep
      </motion.div>

    </main>
  );
}