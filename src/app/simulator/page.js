"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, AlertTriangle, TrendingUp, Briefcase, Terminal, 
  RefreshCw, Eye, Code, Sliders, CheckCircle2, Download, Megaphone, Loader2 
} from "lucide-react";

export default function SimulatorPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); 
  const [logs, setLogs] = useState([]);
  const [resultData, setResultData] = useState(null);

  // UI STATES
  const [intensity, setIntensity] = useState(50); 
  const [viewMode, setViewMode] = useState("standard");
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  // --- API CALL ---
  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setStatus("processing");
    setLogs([]);
    
    let step = 0;
    const messages = [
      "CONNECTING TO GROQ NEURAL CLOUD...",
      "INGESTING NARRATIVE...",
      "DETECTING EMOTIONAL BIAS...",
      "GENERATING PARALLEL REALITIES...",
      "COMPILING DIFFS..."
    ];
    
    const logInterval = setInterval(() => {
      if (step < messages.length) {
        setLogs(prev => [...prev, messages[step]]);
        step++;
      }
    }, 600);

    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) throw new Error("API Request Failed");

      const data = await response.json();

      clearInterval(logInterval);
      setResultData(data);
      setStatus("results");

    } catch (error) {
      clearInterval(logInterval);
      console.error(error);
      setLogs(prev => [...prev, "ERROR: SIMULATION FAILED."]);
      setTimeout(() => setStatus("idle"), 2000);
      alert("Failed to connect. Check your API Key.");
    }
  };

  // --- NEW: JPEG EXPORT FUNCTION (CANVAS DRAWING) ---
  const handleExport = () => {
    if (!resultData) return;
    setIsExporting(true);

    // 1. Prepare Content
    const timestamp = new Date().toISOString();
    const rawLines = [
      "===========================================================",
      "      REALITY DISTORTION SIMULATOR // CLASSIFIED LOG",
      "===========================================================",
      `TIMESTAMP: ${timestamp}`,
      "STATUS:    GENERATED",
      "SUBJECT:   FRAMING ANALYSIS",
      "-----------------------------------------------------------",
      "",
      "[ ORIGINAL INPUT FACT ]",
      `"${input}"`,
      "",
      "-----------------------------------------------------------",
      "[ LENS 01: POLITICAL CHAOS ]",
      `> Low:  "${resultData.politics.low.text}"`,
      `> High: "${resultData.politics.high.text}"`,
      `> Triggers: [${resultData.politics.high.triggers?.join(', ') || 'N/A'}]`,
      "",
      "[ LENS 02: FEAR & PANIC ]",
      `> Low:  "${resultData.fear.low.text}"`,
      `> High: "${resultData.fear.high.text}"`,
      `> Triggers: [${resultData.fear.high.triggers?.join(', ') || 'N/A'}]`,
      "",
      "[ LENS 03: CYNICISM ]",
      `> Low:  "${resultData.cynicism.low.text}"`,
      `> High: "${resultData.cynicism.high.text}"`,
      "",
      "[ LENS 04: OPTIMISM ]",
      `> Low:  "${resultData.optimism.low.text}"`,
      `> High: "${resultData.optimism.high.text}"`,
      "",
      "[ LENS 05: CORPORATE AUTHORITY ]",
      `> Low:  "${resultData.authority.low.text}"`,
      `> High: "${resultData.authority.high.text}"`,
      "",
      "-----------------------------------------------------------",
      "[ ANALYSIS COMPLETE ]",
      "Reality is programmable.",
      "==========================================================="
    ];

    setTimeout(() => {
      // 2. Setup Canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      const padding = 40;
      const lineHeight = 24;
      const font = "14px 'Courier New', monospace";
      
      // Calculate needed height
      // Simple wrap simulation to guess height
      let totalLines = 0;
      const maxWidth = 800 - (padding * 2);
      ctx.font = font;

      // Helper to split long lines
      const wrapText = (text) => {
        const words = text.split(' ');
        let line = '';
        let lines = [];
        
        for(let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }
        lines.push(line);
        return lines;
      };

      // Process all text to wrapped lines
      let finalLines = [];
      rawLines.forEach(raw => {
        finalLines.push(...wrapText(raw));
      });

      // Set Canvas Size
      canvas.width = 800;
      canvas.height = (finalLines.length * lineHeight) + (padding * 2);

      // 3. Draw Background (Hacker Dark Mode)
      ctx.fillStyle = "#0a0a0a"; // Almost Black
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 4. Draw Text
      ctx.font = font;
      ctx.textBaseline = "top";
      
      let y = padding;
      finalLines.forEach((line) => {
        // Color coding logic
        if (line.includes("=====") || line.includes("-----")) ctx.fillStyle = "#333";
        else if (line.includes("[ ")) ctx.fillStyle = "#ef4444"; // Red headers
        else if (line.includes("> High:")) ctx.fillStyle = "#f87171"; // Light Red
        else if (line.includes("> Low:")) ctx.fillStyle = "#4ade80"; // Green
        else if (line.includes("TIMESTAMP")) ctx.fillStyle = "#666";
        else ctx.fillStyle = "#d4d4d4"; // Default Grey

        ctx.fillText(line, padding, y);
        y += lineHeight;
      });

      // 5. Convert to JPG and Download
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      const link = document.createElement("a");
      link.download = `RDS_Dossier_${Date.now()}.jpg`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3000);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-black text-neutral-400 font-mono selection:bg-red-900 selection:text-white relative overflow-x-hidden">
      
      {/* GRID BG */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none opacity-10" />

      {/* HEADER */}
      <header className="fixed top-0 w-full border-b border-neutral-900 bg-black/80 backdrop-blur-md z-50 h-16 flex items-center justify-between px-6">
        <button onClick={() => router.push('/')} className="group flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
        </button>
        <span className="text-[10px] uppercase tracking-widest text-neutral-600 flex items-center gap-2">
           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> SYSTEM ONLINE
        </span>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative z-10">

        <AnimatePresence mode="wait">
          
          {/* 1. INPUT STAGE */}
          {status === "idle" && (
            <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto">
              <div className="mb-8 border-l-2 border-red-700 pl-6">
                <h1 className="text-3xl text-white font-bold uppercase tracking-tighter mb-2">Input Fact</h1>
                <p className="text-sm text-neutral-500">Paste a statement. The system will deconstruct it.</p>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ex: 'The government announced a new tax policy today.'"
                className="w-full h-48 bg-neutral-900/30 border border-neutral-800 p-6 text-lg text-white focus:outline-none focus:border-red-900 transition-colors resize-none mb-8"
              />
              <button onClick={handleAnalyze} disabled={!input.trim()} className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-red-600 hover:text-white transition-all">
                Initiate Simulation
              </button>
            </motion.div>
          )}

          {/* 2. PROCESSING STAGE */}
          {status === "processing" && (
            <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-xl mx-auto font-mono text-sm h-64 border border-neutral-800 bg-black p-6 flex flex-col">
              <div className="flex-1 space-y-2 text-green-500/80">
                {logs.map((log, i) => <div key={i}>{`> ${log}`}</div>)}
              </div>
              <div className="flex items-center gap-2 text-green-500 text-xs px-2 py-1">
                 <Loader2 className="w-3 h-3 animate-spin"/> PROCESSING...
              </div>
            </motion.div>
          )}

          {/* 3. RESULTS DASHBOARD */}
          {status === "results" && resultData && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              
              {/* CONTROL PANEL */}
              <div className="sticky top-20 z-40 bg-black/90 backdrop-blur border-b border-neutral-800 pb-6 mb-12 shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                  
                  {/* Intensity Slider */}
                  <div className="w-full md:w-1/3 space-y-3">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-400">
                      <span className="flex items-center gap-2"><Sliders className="w-3 h-3" /> Distortion Intensity</span>
                      <span className={intensity > 66 ? "text-red-500" : "text-white"}>{intensity}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" value={intensity} onChange={(e) => setIntensity(parseInt(e.target.value))}
                      className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-600 font-mono">
                      <span>SUBTLE</span>
                      <span>MODERATE</span>
                      <span>EXTREME</span>
                    </div>
                  </div>

                  {/* Global View Toggles */}
                  <div className="flex gap-2">
                    <ViewBtn active={viewMode === 'standard'} onClick={() => setViewMode('standard')} icon={<Code className="w-3 h-3" />}>Text</ViewBtn>
                    <ViewBtn active={viewMode === 'diff'} onClick={() => setViewMode('diff')} icon={<Code className="w-3 h-3" />}>Diff</ViewBtn>
                    <ViewBtn active={viewMode === 'xray'} onClick={() => setViewMode('xray')} icon={<Eye className="w-3 h-3" />}>X-Ray</ViewBtn>
                  </div>
                </div>
              </div>

              {/* CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <ResultCard 
                  title="Political Chaos" 
                  data={resultData.politics} 
                  intensity={intensity} 
                  viewMode={viewMode}
                  icon={<Megaphone className="w-4 h-4 text-orange-500" />}
                  color="border-orange-900/30 bg-orange-950/5"
                  highlight="text-orange-500"
                />

                <ResultCard 
                  title="Fear Lens" 
                  data={resultData.fear} 
                  intensity={intensity} 
                  viewMode={viewMode}
                  icon={<AlertTriangle className="w-4 h-4 text-red-500" />}
                  color="border-red-900/30 bg-red-950/5"
                  highlight="text-red-500"
                />

                <ResultCard 
                  title="Cynicism Lens" 
                  data={resultData.cynicism} 
                  intensity={intensity} 
                  viewMode={viewMode}
                  icon={<Terminal className="w-4 h-4 text-purple-500" />}
                  color="border-purple-900/30 bg-purple-950/5"
                  highlight="text-purple-500"
                />

                <ResultCard 
                  title="Optimism Lens" 
                  data={resultData.optimism} 
                  intensity={intensity} 
                  viewMode={viewMode}
                  icon={<TrendingUp className="w-4 h-4 text-green-500" />}
                  color="border-green-900/30 bg-green-950/5"
                  highlight="text-green-500"
                />

                <ResultCard 
                  title="Authority Lens" 
                  data={resultData.authority} 
                  intensity={intensity} 
                  viewMode={viewMode}
                  icon={<Briefcase className="w-4 h-4 text-blue-500" />}
                  color="border-blue-900/30 bg-blue-950/5"
                  highlight="text-blue-500"
                />
              </div>

              {/* ACTION FOOTER */}
              <div className="flex justify-center gap-6 pt-12 border-t border-neutral-900">
                <button onClick={() => { setStatus('idle'); setInput(''); setResultData(null); }} className="flex items-center gap-2 px-6 py-3 text-neutral-500 hover:text-white transition-colors text-xs uppercase tracking-widest">
                  <RefreshCw className="w-4 h-4" /> Reset
                </button>
                
                <button 
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors disabled:opacity-50"
                >
                  {isExporting ? <Loader2 className="w-4 h-4 animate-spin"/> : exportComplete ? <CheckCircle2 className="w-4 h-4 text-green-600"/> : <Download className="w-4 h-4"/>}
                  {isExporting ? "Rendering JPG..." : exportComplete ? "Dossier Saved" : "Export JPG Dossier"}
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---

const ViewBtn = ({ active, onClick, icon, children }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 border text-[10px] uppercase tracking-widest transition-all ${
      active 
        ? 'bg-neutral-800 border-neutral-600 text-white' 
        : 'border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-white'
    }`}
  >
    {icon} {children}
  </button>
);

const ResultCard = ({ title, data, intensity, viewMode, icon, color, highlight }) => {
  if (!data) return null;

  const levelKey = intensity < 33 ? "low" : intensity < 66 ? "med" : "high";
  const levelData = data[levelKey];
  
  return (
    <div className={`p-8 border ${color} transition-all duration-500 relative group overflow-hidden`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-black border border-neutral-800 rounded-sm">{icon}</div>
        <span className={`text-[10px] uppercase tracking-widest ${highlight} font-bold`}>{title}</span>
      </div>

      <div className="min-h-[80px] text-lg md:text-xl font-serif leading-relaxed opacity-90">
        
        {/* VIEW: STANDARD */}
        {viewMode === 'standard' && (
          <motion.p key="std" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{levelData?.text}</motion.p>
        )}

        {/* VIEW: DIFF */}
        {viewMode === 'diff' && (
          <motion.div key="diff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-sm leading-loose">
            <span 
              className="text-neutral-300"
              dangerouslySetInnerHTML={{ 
                __html: (data.diff || data.high.text) 
                  .replace(/<del>/g, '<span class="bg-red-900/40 text-red-200 px-1 mx-1 decoration-double line-through">')
                  .replace(/<\/del>/g, '</span>')
                  .replace(/<ins>/g, '<span class="bg-green-900/40 text-green-200 px-1 mx-1 font-bold">')
                  .replace(/<\/ins>/g, '</span>') 
              }} 
            />
          </motion.div>
        )}

        {/* VIEW: X-RAY (HEATMAP) */}
        {viewMode === 'xray' && (
          <motion.div key="xray" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {levelData?.text.split(" ").map((word, i) => {
              const cleanWord = word.replace(/[.,!?;:]/g, "").toLowerCase();
              const isTrigger = levelData.triggers?.some(t => cleanWord.includes(t.toLowerCase()));
              return (
                <span 
                  key={i} 
                  className={`inline-block transition-all duration-500 ${
                    isTrigger 
                      ? `${highlight} font-bold border-b border-dashed border-current mx-1 px-1` 
                      : 'opacity-20 blur-[0.5px]'
                  }`}
                >
                  {word}{" "}
                </span>
              )
            })}
          </motion.div>
        )}

      </div>

      {/* META DATA FOOTER */}
      <div className="mt-8 pt-4 border-t border-neutral-800/50 flex justify-between text-[10px] font-mono text-neutral-500 uppercase">
        <span>Distortion: {intensity}%</span>
        <span>{viewMode === 'diff' ? 'Semantic Diff' : viewMode === 'xray' ? 'Emotional X-Ray' : 'Standard Read'}</span>
      </div>
    </div>
  );
};