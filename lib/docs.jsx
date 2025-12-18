import { useState } from "react";

const DocsSection = () => {
  const [activeStep, setActiveStep] = useState(null);

  const T = {
    bg: "#0b0b0e",
    panel: "#111113",
    border: "rgba(255,255,255,0.08)",
    textPrimary: "#ffffff",
    textSecondary: "#a1a1aa",
    accent: "#f97316", // orange
    codeBg: "#0f0f12",
  };

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: T.bg,
      color: T.textPrimary,
      display: "flex",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },

    sidebar: {
      width: "280px",
      borderRight: `1px solid ${T.border}`,
      padding: "40px 24px",
      position: "sticky",
      top: 0,
      height: "100vh",
      background: T.bg,
    },

    sidebarTitle: {
      fontSize: "14px",
      letterSpacing: "0.12em",
      color: T.textSecondary,
      marginBottom: "24px",
      textTransform: "uppercase",
    },

    sidebarItem: (active) => ({
      padding: "10px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      color: active ? T.textPrimary : T.textSecondary,
      background: active ? "rgba(249,115,22,0.08)" : "transparent",
      borderLeft: active ? `2px solid ${T.accent}` : "2px solid transparent",
    }),

    content: {
      flex: 1,
      padding: "64px 80px",
      maxWidth: "900px",
    },

    pageTitle: {
      fontSize: "36px",
      fontWeight: 700,
      marginBottom: "12px",
    },

    pageSubtitle: {
      fontSize: "16px",
      color: T.textSecondary,
      marginBottom: "48px",
    },

    step: {
      marginBottom: "48px",
      paddingBottom: "32px",
      borderBottom: `1px solid ${T.border}`,
    },

    stepHeader: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "12px",
    },

    stepNumber: {
      fontFamily: "monospace",
      color: T.accent,
      fontSize: "14px",
    },

    stepTitle: {
      fontSize: "20px",
      fontWeight: 600,
    },

    stepDesc: {
      fontSize: "15px",
      color: T.textSecondary,
      marginBottom: "16px",
      maxWidth: "640px",
    },

    code: {
      background: T.codeBg,
      border: `1px solid ${T.border}`,
      borderRadius: "6px",
      padding: "12px 16px",
      fontFamily: "monospace",
      fontSize: "14px",
      color: T.textPrimary,
      display: "inline-block",
    },
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
      title: "Login using CLI",
      desc: "Authenticate your wallet using the ImmutableHub CLI.",
      command: "npx ihub op login <wallet-address>",
    },
    {
      title: "Commit your changes",
      desc: "Stage and commit your code changes using Git.",
      command: "git add . && git commit -m \"initial commit\"",
    },
    {
      title: "Push code",
      desc: "Push your repository to immutable decentralized storage.",
      command: "npx ihub op push <repo-path>",
    },
    {
      title: "Clone repository",
      desc: "Clone an existing repository. Use --new true for first-time setup.",
      command: "npx ihub op clone <repo-name>",
    },
  ];

  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarTitle}>Documentation</div>
        {steps.map((step, i) => (
          <div
            key={i}
            style={styles.sidebarItem(activeStep === i)}
            onClick={() => setActiveStep(i)}
          >
            {i + 1}. {step.title}
          </div>
        ))}
      </aside>

      {/* Content */}
      <main style={styles.content}>
        <h1 style={styles.pageTitle}>ImmutableHub CLI</h1>
        <p style={styles.pageSubtitle}>
          Minimal guide to pushing and cloning immutable repositories.
        </p>

        {steps.map((step, i) => (
          <section key={i} style={styles.step}>
            <div style={styles.stepHeader}>
              <span style={styles.stepNumber}>#{i + 1}</span>
              <h2 style={styles.stepTitle}>{step.title}</h2>
            </div>
            <p style={styles.stepDesc}>{step.desc}</p>
            <div style={styles.code}>{step.command}</div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default DocsSection;
