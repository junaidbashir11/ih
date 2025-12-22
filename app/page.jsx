"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import TimelineRoadmap from "../lib/roadmap";
import Header from "../lib/header";
import TypingDiv from "@/lib/typ";
import { motion } from "framer-motion";
import Hero from "../lib/ha";
import { useRouter } from "next/navigation";


export default function Home() {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("vjwt"));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("vjwt")
    if (!token) {
      router.replace("/")
      return
    }
    else if(token){

      router.replace("/dashboard")

    }}, [token])

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-mono selection:bg-white selection:text-black">
      
      {/* BRUTALIST OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10"></div>

      <Header />

      <main className="relative z-10">
        
        {/* SECTION 1: HERO */}
        <section className="px-6 py-24 md:py-40 flex flex-col items-center border-b border-white/10">
          <div className="w-full max-w-7xl">
            <div className="pt-3">
              <Hero />
              <pre className="mt-12 text-xl md:text-2xl uppercase tracking-widest text-white/60" >       Immutable • Decentralized • Tamper-proof • Takedown-resistant</pre> 
            </div>
          </div>
        </section>

        {/* SECTION 2: FEATURES */}
        <section className="border-b border-white/10 py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            {/* Unified Section Title Spacing */}
            <div className="mb-16">
                <h2 className="text-[5vw] leading-[0.85] font-black uppercase tracking-tighter text-white/20">
                    FEATURES
                </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
              {/* Feature 01 */}
              <div className="p-12 border-b border-r border-white/10 hover:bg-white/[0.02] transition-all">
                <h3 className="text-xl font-bold uppercase mb-6 text-white tracking-tighter">01 Immutable Code</h3>
                <p className="text-sm text-white/50 leading-relaxed font-sans">
                  Once deployed, your code becomes permanent and unalterable. Every version is cryptographically sealed for complete integrity.
                </p>
              </div>

              {/* Feature 02 */}
              <div className="p-12 border-b border-r border-white/10 hover:bg-white/[0.02] transition-all">
                <h3 className="text-xl font-bold uppercase mb-6 text-white tracking-tighter">02 Decentralized</h3>
                <p className="text-sm text-white/50 leading-relaxed font-sans">
                  Your code lives across a distributed network. No central authority can control, modify, or restrict access to your work.
                </p>
              </div>

              {/* Feature 03 */}
              <div className="p-12 border-b border-r border-white/10 hover:bg-white/[0.02] transition-all">
                <h3 className="text-xl font-bold uppercase mb-6 text-white tracking-tighter">03 Tamper Proof</h3>
                <p className="text-sm text-white/50 leading-relaxed font-sans">
                  Advanced cryptographic validation ensures every line remains exactly as intended. Modifications are instantly rejected.
                </p>
              </div>

              {/* Feature 04 */}
              <div className="p-12 border-b border-r border-white/10 hover:bg-white/[0.02] transition-all">
                <h3 className="text-xl font-bold uppercase mb-6 text-white tracking-tighter">04 Takedown Resistant</h3>
                <p className="text-sm text-white/50 leading-relaxed font-sans">
                  Your code cannot be censored or removed. It persists indefinitely across the network, providing true permanence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ROADMAP */}
        <section className="py-24 md:py-32 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
                
            </div>
            <TimelineRoadmap />
          </div>
        </section>
         
       
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;700&display=swap');
        
        body {
          font-family: 'Space Grotesk', sans-serif;
        }

        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: #050505;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #fff;
        }
      `}</style>
    </div>
  );
}