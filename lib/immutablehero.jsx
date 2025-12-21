import React from "react";
import { motion } from "framer-motion";
import TypingDiv from "./typ";

const ImmutableHero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto text-center overflow-visible">
      
      {/* --- Left Side: Floating Logs --- */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[110%] hidden xl:block w-72">
        <div className="font-mono text-left space-y-4">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Live_Buffer</span>
          </div>
          
          <div className="space-y-6">
            {[
              { label: "SHARDS", val: "ACTIVE", color: "text-orange-500" },
              { label: "LATENCY", val: "12ms", color: "text-white" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col border-l-2 border-orange-500/20 pl-4">
                <span className="text-[10px] text-gray-600 uppercase tracking-tighter">{item.label}</span>
                <motion.span 
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                  className={`${item.color} text-xl font-bold font-mono`}
                >
                  {item.val}
                </motion.span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Right Side: Floating Abstract Matrix (No Box) --- */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[110%] hidden xl:block w-64">
        <div className="flex flex-col items-end space-y-8">
          
          {/* 1. Free-floating Grid */}
          <div className="grid grid-cols-6 gap-2">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 border border-blue-500/20"
                animate={{
                  backgroundColor: ["rgba(59, 130, 246, 0)", "rgba(59, 130, 246, 0.4)", "rgba(59, 130, 246, 0)"],
                  borderColor: ["rgba(59, 130, 246, 0.2)", "rgba(59, 130, 246, 0.8)", "rgba(59, 130, 246, 0.2)"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* 2. Floating Sync Bar */}
          <div className="w-full space-y-2">
             <div className="flex justify-between font-mono text-[9px] text-blue-500/50 uppercase tracking-[0.2em]">
              <span>Network</span>
              <span className="animate-pulse">Stable</span>
            </div>
            <div className="h-[1px] w-full bg-white/10 relative">
              <motion.div 
                animate={{ left: ["-10%", "110%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 w-12 h-[1px] bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"
              />
            </div>
          </div>

          {/* 3. Decentralized "Nodes" Pulse */}
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                className="w-1 h-1 rounded-full bg-blue-400"
              />
            ))}
          </div>
        </div>
      </div>

      {/* --- Center: Brutalist Typography --- */}
      <div className="relative z-10">
        <h1 className="text-white text-5xl md:text-[5rem] font-black tracking-tighter leading-[0.8] uppercase">
          Immutable & Decentralized
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-800">
            Code
          </span>
        </h1>
        
        <div className="mt-12 flex flex-col items-center gap-2">
          <p className="text-gray-600 font-mono text-xs tracking-[0.3em] uppercase">
            Architectural Integrity // 0x112
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-orange-500/50 to-transparent" />
        </div>

        <div className="mt-6 flex justify-center">
          <TypingDiv />
        </div>
      </div>
    </section>
  );
};

export default ImmutableHero;