import Link from "next/link";

const SupportSection = () => {
  const T = {
    bg: "#0b0b0e",
    panel: "#111113",
    border: "rgba(255,255,255,0.08)",
    textPrimary: "#ffffff",
    textSecondary: "#a1a1aa",
    accent: "#f97316", // orange
  };

  const styles = {
    wrapper: {
      minHeight: "100vh",
      background: T.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    card: {
      background: T.panel,
      border: `1px solid ${T.border}`,
      borderRadius: "12px",
      padding: "48px",
      width: "100%",
      maxWidth: "480px",
      textAlign: "center",
    },
    title: {
      fontSize: "28px",
      fontWeight: 700,
      color: T.textPrimary,
      marginBottom: "12px",
    },
    subtitle: {
      fontSize: "15px",
      color: T.textSecondary,
      marginBottom: "32px",
    },
    link: {
      display: "block",
      padding: "12px 16px",
      marginBottom: "12px",
      borderRadius: "8px",
      border: `1px solid ${T.border}`,
      color: T.textPrimary,
      textDecoration: "none",
      fontSize: "15px",
      transition: "all 0.2s ease",
    },
    accent: {
      color: T.accent,
      marginRight: "8px",
      fontFamily: "monospace",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Support</h1>
        <p style={styles.subtitle}>
          Need help? Reach out to us on our community channels.
        </p>

        <Link
          href="https://discord.gg/YOUR_DISCORD_INVITE"
          target="_blank"
          style={styles.link}
        >
          <span style={styles.accent}>#</span> Join Discord
        </Link>

        <Link
          href="https://t.me/YOUR_TELEGRAM_LINK"
          target="_blank"
          style={styles.link}
        >
          <span style={styles.accent}>→</span> Join Telegram
        </Link>
      </div>
    </div>
  );
};

export default SupportSection;
