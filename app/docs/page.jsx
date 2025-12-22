"use client";

import { useState } from "react";

const DocsSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const T = {
    bg: "",
    cardBg: "rgba(10, 12, 16, 0.5)",
    border: "#1a1a1a",
    textPrimary: "#ffffff",
    textSecondary: "#666",
    accent: "#f97316",
    mutedText: "rgba(255,255,255,0.03)" // For that giant background text
  };

  // ... styles object below ...

  const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "black",
    color: "white",
    display: "flex",
    fontFamily: '"Inter", "JetBrains Mono", monospace',
    position: 'relative',
    overflowX: 'hidden',
  },
  watermark: {
    position: 'absolute',
    top: '-20px',
    left: '300px',
    fontSize: '180px',
    fontWeight: '900',
    color: 'rgba(255,255,255,0.03)',
    letterSpacing: '-5px',
    pointerEvents: 'none',
    zIndex: 0,
  },
  sidebar: {
    width: "320px",
    borderRight: `1px solid #1a1a1a`,
    padding: "60px 40px",
    position: "sticky",
    top: 0,
    height: "100vh",
    zIndex: 10,
    background: "",
  },
  sidebarItem: (active) => ({
    display: 'flex',
    alignItems: 'center',
    padding: "15px 0",
    fontSize: "12px",
    letterSpacing: '1px',
    cursor: 'pointer',
    color: active ? "#fff" : "#444",
    borderBottom: `1px solid ${active ? '#333' : 'transparent'}`,
    transition: 'all 0.2s ease',
  }),
  sidebarIndex: {
    marginRight: '15px',
    fontSize: '10px',
    opacity: 0.5
  },
  content: {
    flex: 1,
    padding: "120px 60px",
    zIndex: 1,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '2px', // Thin line gap
    background: '', // Shows through as borders
    border: '1px solid #1a1a1a',
  },
  stepCard: {
    background: "",
    padding: "40px",
    position: "relative",
    minHeight: "450px",
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },
  chip: {
    border: '1px solid #333',
    padding: '4px 12px',
    fontSize: '10px',
    letterSpacing: '2px',
    color: '#666',
  },
  titleContainer: {
    position: 'relative',
    marginBottom: '20px',
  },
  bgNumber: {
    position: 'absolute',
    top: '-10px',
    left: '-5px',
    fontSize: '64px',
    fontWeight: '900',
    color: 'rgba(255,255,255,0.05)',
    zIndex: 1,
  },
  stepTitle: {
    fontSize: "32px",
    fontWeight: "800",
    position: 'relative',
    zIndex: 2,
    margin: 0,
    letterSpacing: '-1px',
  },
  stepDesc: {
    fontSize: "15px",
    color: "#888",
    lineHeight: "1.6",
    marginBottom: "30px",
    flex: 1,
  },
  commandBox: {
    background: '',
    padding: '15px',
    border: '1px solid #1a1a1a',
    fontFamily: 'monospace',
    fontSize: '13px',
    marginBottom: '20px',
  },
  cardFooter: {
    fontSize: '9px',
    color: '#333',
    letterSpacing: '1px',
  }
};
const steps = [

  

    

    {
      title: "Create or select a project",
      desc: "Start by creating a new project or navigating to an existing one.",
      command: "mkdir project && cd project , write some code",
    },
    {
      title: "Initialize Git",
      desc: "Initialize an empty Git repository in your project directory.",
      command: "git init",
    },

     {
      title: "Install immutablehub cli ",
      desc: "Install immutablehub [ihub-cli] package",
      command: "npm i -g ihub-cli",
    },
    {
      title: "Login using CLI",
      desc: "Authenticate your wallet using the ImmutableHub CLI.",
      command: "ihub op login <wallet-address>",
    },
    {
      title: "Commit your changes",
      desc: "Stage and commit your code changes using Git.",
      command: "git add . && git commit -m \"initial commit\"",
    },
    {
      title: "Push code",
      desc: "Push your repository to immutable decentralized storage.",
      command: "ihub op push <repo-path>",
    },
    {
      title: "Clone repository",
      desc: "Clone an existing repository. Use --new true for first-time setup.",
      command: "ihub op clone <repo-name>",
    },
  ];

  return (
    <div style={styles.wrapper}>
      {/* Giant Background Watermark like "PILLARS" in your image */}
      <div style={styles.watermark}></div>

      <aside style={styles.sidebar}>
        <div style={styles.sidebarTitle}>DOCS  v1.0</div>
        {steps.map((step, i) => (
          <div
            key={i}
            style={styles.sidebarItem(activeStep === i)}
            onClick={() => setActiveStep(i)}
          >
            <span style={styles.sidebarIndex}>0{i + 1}</span>
            {step.title.toUpperCase()}
          </div>
        ))}
      </aside>

      <main style={styles.content}>
        <div style={styles.grid}>
          {steps.map((step, i) => (
            <section 
                key={i} 
                style={{
                    ...styles.stepCard,
                    borderColor: activeStep === i ? T.textSecondary : T.border,
                }}
                onMouseEnter={() => setActiveStep(i)}
            >
              {/* Top Meta Bar */}
              <div style={styles.cardHeader}>
                <div style={styles.chip}>STEP_0{i + 1}</div>
                <div style={styles.icon}>⚙</div>
              </div>

              {/* Title & Large Background Number */}
              <div style={styles.titleContainer}>
                <div style={styles.bgNumber}></div>
                <h2 style={styles.stepTitle}>{step.title.toUpperCase()}</h2>
              </div>

              <p style={styles.stepDesc}>{step.desc}</p>

              {/* Terminal Style Command */}
              <div style={styles.commandBox}>
                <span style={{color: T.accent, marginRight: '8px'}}></span>
                {step.command}
              </div>

              
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};
export default DocsSection