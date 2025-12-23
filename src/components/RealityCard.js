'use client';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, Briefcase, Zap, Brain, Lock, Activity, Terminal, Radio } from 'lucide-react';

const icons = {
  Neutral: Brain,
  Fear: AlertTriangle,
  Optimistic: TrendingUp,
  Corporate: Briefcase,
  Cynical: Zap,
  Political: Activity,
};

// Refined themes to match the homepage neon palette exactly
const getTheme = (type) => {
  const themes = {
    Neutral:   { color: 'text-gray-100',  border: 'border-gray-700', shadow: 'shadow-gray-500/20' },
    Fear:      { color: 'text-red-500',   border: 'border-red-900',   shadow: 'shadow-red-500/30' },
    Optimistic:{ color: 'text-green-400', border: 'border-green-900', shadow: 'shadow-green-400/30' },
    Corporate: { color: 'text-blue-400',  border: 'border-blue-900',  shadow: 'shadow-blue-400/30' },
    Political: { color: 'text-purple-400',border: 'border-purple-900',shadow: 'shadow-purple-400/30' },
    Cynical:   { color: 'text-yellow-400',border: 'border-yellow-900',shadow: 'shadow-yellow-400/30' },
  };
  return themes[type] || themes.Neutral;
};

export default function RealityCard({ data, hidden, onReveal }) {
  const Icon = icons[data?.type] || Brain;
  const theme = getTheme(data?.type);
  // Safety check for ID
  const lensId = (data?.id || '000').toString().padStart(3, '0');
  const isNeutral = data?.type === 'Neutral';

  // Animation variants for smooth entrance
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    hover: { scale: 1.01, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onReveal}
      className={`
        relative group min-h-[240px] flex flex-col justify-between
        bg-black rounded-xl overflow-hidden border transition-all duration-500
        ${theme.border} border-opacity-50
        ${hidden ? 'cursor-pointer' : ''}
        ${!hidden && `hover:border-opacity-100 hover:${theme.shadow} hover:-translate-y-1`}
        ${isNeutral ? 'md:col-span-2 bg-white/5' : ''}
      `}
    >
      {/* Internal Scanline Texture (matches homepage background) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-0"></div>

      {/* --- LOCKED STATE: Terminal Redaction --- */}
      {hidden ? (
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 p-8 bg-black/90 backdrop-blur-sm">
           <div className="relative">
             <div className={`absolute -inset-2 rounded-full blur-md opacity-20 animate-pulse ${theme.color.replace('text', 'bg')}`}></div>
             <Lock className={`w-8 h-8 ${theme.color} relative z-10`} />
           </div>
           <div className="text-center space-y-2">
             <p className={`font-mono text-sm uppercase tracking-[0.3em] ${theme.color} animate-pulse`}>
               [ DATA REDACTED ]
             </p>
             <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
               // Secure Narrative Found //
             </p>
           </div>
           <div className={`mt-4 text-xs font-mono ${theme.color} border ${theme.border} px-3 py-1 rounded hover:bg-white/5 transition-colors`}>
              Tap to Decrypt
           </div>
        </div>
      ) : (
        /* --- REVEALED STATE: Terminal Readout --- */
        <div className="relative z-10 p-6 flex flex-col h-full">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded border ${theme.border} bg-white/5`}>
                <Icon className={`w-5 h-5 ${theme.color}`} />
              </div>
              <div>
                <h3 className={`font-orbitron font-bold text-sm tracking-wider uppercase ${theme.color}`}>
                  {data.type}
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono mt-1">
                  <Terminal className="w-3 h-3" />
                  <span>ID::{lensId}</span>
                </div>
              </div>
            </div>

            {/* Intensity HUD */}
            {data.intensity !== 'None' && (
              <div className="flex flex-col items-end gap-1">
                <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">Signal Strength</span>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={`w-1 h-2 rounded-sm ${
                      i < (data.intensity === 'High' ? 3 : data.intensity === 'Medium' ? 2 : 1)
                      ? `${theme.color.replace('text', 'bg')} shadow-[0_0_5px_currentColor]` 
                      : 'bg-gray-800'
                    }`} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-grow relative pl-4 border-l-2 border-white/10 my-2 group-hover:border-white/30 transition-colors">
             {/* Decorative top marker */}
             <div className={`absolute top-0 -left-[5px] w-2 h-[2px] ${theme.color.replace('text', 'bg')}`}></div>
             
             <p className="font-mono text-base text-gray-200 leading-relaxed">
               "{data.content}"
             </p>

             {/* Decorative bottom marker */}
             <div className={`absolute bottom-0 -left-[5px] w-2 h-[2px] ${theme.color.replace('text', 'bg')}`}></div>
          </div>

          {/* Footer Metadata */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
             <div className="flex items-center gap-2 text-gray-600">
               <Radio className="w-3 h-3" />
               <span>Filter Applied:</span>
             </div>
             <div className={`${theme.color} bg-white/5 border ${theme.border} px-2 py-1 rounded`}>
               {data.cognitiveBias}
             </div>
          </div>
        </div>
      )}

      {/* Subtle Corner accents for cyberpunk feel */}
      {!hidden && (
        <>
        <div className={`absolute top-0 right-0 w-4 h-4 border-t border-r ${theme.border} opacity-30 group-hover:opacity-100 transition-opacity`}></div>
        <div className={`absolute bottom-0 left-0 w-4 h-4 border-b border-l ${theme.border} opacity-30 group-hover:opacity-100 transition-opacity`}></div>
        </>
      )}
    </motion.div>
  );
}