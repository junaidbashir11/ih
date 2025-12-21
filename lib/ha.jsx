import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto text-center bg-[#050505] overflow-visible selection:bg-blue-500 selection:text-white">
      
      {/* --- Left Side: Neural Processing Block (Original Blue Colors) --- */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[110%] hidden xl:block w-72 h-72">
        <div className="relative w-full h-full flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-blue-500/30"
              style={{ width: 100 + i * 40, height: 100 + i * 40 }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360, borderRadius: ["0%", "10%", "0%"] }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
            />
          ))}
          
        </div>
      </div>

      {/* --- Main Headline (Original Structure & Colors, Architectural Font) --- */}
      <div className="relative z-10">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase">
          <div className="relative inline-flex items-center justify-center gap-4">
            
            {/* Left Decorative Bracket - Original Blue */}
            <span className="text-blue-500 font-mono text-5xl md:text-7xl opacity-50">{"["}</span>
            
            <div className="flex flex-col">
              <span className="block text-4xl md:text-6xl font-black uppercase tracking-tighter">
                Immutable <span className="text-blue-500">&</span>
              </span>
              <span className="block text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-400">
               Decentralized Code
              </span>
            </div>

            {/* Right Decorative Elements - Original Blue/White Mix */}
            <div className="flex flex-col gap-2">
              <motion.div 
                className="w-12 h-4 bg-white"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <div className="w-8 h-4 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
            </div>

            {/* Original Blue Double Slash */}
            <span className="text-blue-500 font-mono text-5xl md:text-7xl opacity-50">{"//"}</span>
          </div>
        </h1>
      </div>

      {/* --- Right Side: The "Ledger" Grid (Original Blue Colors) --- */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[110%] hidden xl:block w-72 h-72">
        <div className="grid grid-cols-4 gap-2 opacity-40">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className="w-12 h-12 border border-blue-400/40"
              initial={{ opacity: 0.2 }}
              animate={{ 
                opacity: [0.2, 1, 0.2],
                backgroundColor: ["transparent", "rgba(37,99,235,0.2)", "transparent"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.1 
              }}
            />
          ))}
        </div>
        
        {/* Floating Data Tag - Original White/Blue Accent */}
        <motion.div 
          className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] px-2 py-1 font-mono font-bold uppercase tracking-tighter shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          BLOCK_SYNC: 100%
        </motion.div>
      </div>

      {/* Subtext - Subtle Blue Tint */}
      <p className="mt-12 text-blue-200/30 font-mono text-xs tracking-[0.5em] uppercase border-t border-white/10 pt-8 inline-block">
    
      </p>

    </section>
  );
};

export default Hero;