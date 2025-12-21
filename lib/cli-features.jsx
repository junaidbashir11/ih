"use client";
import React from "react";
import { motion } from "framer-motion";

const ProCLISection = () => {
  return (
    <section style={{
      backgroundColor: "",
      height: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      color: "#fff",
      fontFamily: '"Inter", "Impact", sans-serif',
      position: "relative",
      padding: "0 4vw"
    }}>
      {/* TOP DECORATIVE BAR (From Image) */}
      <div style={{
        position: "absolute",
        top: "40px",
        width: "92%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        paddingTop: "10px",
        fontSize: "12px",
        letterSpacing: "0.4em",
        color: "#444"
      }}>
        <span>IMMUTABLEHUB</span>
        <span>V.2025</span>
      </div>

      {/* MAIN TYPOGRAPHIC STACK */}
      <div style={{ textAlign: "center", width: "100%", maxWidth: "1400px" }}>
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(80px, 16vw, 240px)",
            fontWeight: 900,
            lineHeight: 0.75,
            margin: 0,
            letterSpacing: "-0.06em",
            textTransform: "uppercase"
          }}
        >
        </motion.h1>

        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(50px, 10vw, 100px)",
            fontWeight: 900,
            lineHeight: 0.75,
            margin: 0,
            letterSpacing: "-0.06em",
            textTransform: "uppercase",
            color: "#31363f" // Muted Grey from your image
          }}
        >
        
        </motion.h1>

        {/* SUBTEXT (From Image) */}
        <div style={{
          marginTop: "40px",
          textAlign: "left",
          maxWidth: "450px",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
         
          
          {/* THE BLUE "IMMUTABILITY" PULSE (Minimalist Accent) */}
          <motion.div
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
            style={{
              marginTop: "10px",
              height: "2px",
              width: "40px",
              background: "#3b82f6",
              boxShadow: "0 0 15px #3b82f6"
            }}
          />
        </div>
      </div>

      {/* BACKGROUND GRID OVERLAY (SUBTLE) */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        backgroundImage: "radial-gradient(circle at 2px 2px, #111 1px, transparent 0)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse at center, black, transparent 80%)"
      }} />

      {/* F1 STYLE SCANLINE */}
      <motion.div
        animate={{ y: ["-100%", "300%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "10px",
          background: "linear-gradient(90deg, transparent, #3b82f6, transparent)",
          opacity: 0.2
        }}
      />
    </section>
  );
};

export default ProCLISection;