'use client';

// MUST use 'export default' here
export default function GlitchText({ text }) {
  return (
    <div className="relative inline-block group mb-4">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white relative z-10">
        {text}
      </h1>
      <span className="absolute top-0 left-0 -ml-1 text-cyber-danger opacity-70 animate-glitch hidden group-hover:block">
        {text}
      </span>
      <span className="absolute top-0 left-0 ml-1 text-cyber-neon opacity-70 animate-glitch hidden group-hover:block" style={{ animationDirection: 'reverse' }}>
        {text}
      </span>
    </div>
  );
}