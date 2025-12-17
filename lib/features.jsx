import React, { useState } from 'react';

const ProHeroSection = () => {
    const [hoveredFeature, setHoveredFeature] = useState(null);

    const T = {
        background: '#0d1117', // Match ImmutableHub background
        cardBackground: '#0a0a0f',
        textPrimary: '#ffffff',
        textSecondary: '#a1a1aa',
        border: 'rgba(255, 255, 255, 0.1)',
        // New accent colors
        accentBlue: '#3b82f6',   // Tailwind blue-500
        accentGreen: '#10b981',  // Tailwind emerald-500
        accentYellow: '#f59e0b', // Tailwind amber-500
    };

    const styles = {
        hero: {
            minHeight: '100vh',
            padding: '0',
            backgroundColor: T.background,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            display: 'flex',
            marginTop: '-1px', 
            maxWidth: '1280px', 
            margin: '0 auto',
            position: 'relative', 
            zIndex: 10,
        },
        leftPanel: {
            width: '40%',
            padding: '120px 80px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRight: `1px solid ${T.border}`,
            position: 'sticky',
            top: 0,
            height: '100vh',
            boxShadow: `5px 0 15px rgba(0, 0, 0, 0.2)`
        },
        heroTitle: {
            fontSize: '70px',
            fontWeight: 800,
            color: T.textPrimary,
            marginBottom: '40px',
            letterSpacing: '-0.05em',
            lineHeight: 0.9,
        },
        heroSubtitle: {
            fontSize: '24px',
            color: T.textSecondary,
            fontWeight: 400,
            lineHeight: 1.6,
            marginTop: '20px',
            // Ensure font is monospace/code-like
            fontFamily: 'monospace, "Courier New"',
        },
        rightPanel: {
            width: '60%',
            padding: '120px 80px',
            display: 'flex',
            flexDirection: 'column',
            gap: '60px',
        },
        featureBlock: {
            borderBottom: `1px solid ${T.border}`,
            paddingBottom: '60px',
            transition: 'all 0.4s ease',
        },
        featureNumber: {
            fontSize: '18px',
            fontWeight: 700,
            color: T.textSecondary,
            marginBottom: '24px',
            letterSpacing: '0.2em',
            fontFamily: 'monospace, "Courier New"', // Monospace for numbers
        },
        featureTitle: {
            fontSize: '48px',
            fontWeight: 700,
            color: T.textPrimary,
            marginBottom: '20px',
            letterSpacing: '-0.02em',
            transition: 'all 0.3s ease',
        },
        featureDescription: {
            fontSize: '18px',
            color: T.textSecondary,
            lineHeight: 1.8,
            maxWidth: '600px',
        },
    };

    const features = [
        {
            number: '01',
            title: 'Immutable Code',
            description: 'Once deployed, your code becomes permanent and unalterable. Every version is cryptographically sealed, creating an immutable history that guarantees complete integrity and auditability throughout the entire lifecycle.',
        },
        {
            number: '02',
            title: 'Decentralized Infrastructure',
            description: 'Your code lives across a distributed network with no central authority. True ownership means no platform can control, modify, or restrict access to your work. You maintain sovereignty over your creations.',
        },
        {
            number: '03',
            title: 'Tamper Proof Security',
            description: 'Advanced cryptographic validation ensures every line of code remains exactly as intended. Any unauthorized modification attempt is instantly detected and rejected by the network consensus mechanism.',
        },
        {
            number: '04',
            title: 'Takedown Resistant',
            description: 'Your code cannot be censored, removed, or taken down by any entity. It persists indefinitely across the decentralized network, providing true permanence and resistance to centralized control.',
        },
    ];

    return (
        <section style={styles.hero}>
            <div style={styles.leftPanel}>
                <h1 style={styles.heroTitle}>
                    {/* UPDATED: Code-style decoration for main title */}
                    <span style={{ color: T.accentGreen, opacity: 0.8, fontSize: '1.2em', marginRight: '15px' }}>
                        {'</>'}
                    </span>
                    Features
                    <span style={{ color: T.accentGreen, opacity: 0.8, fontSize: '1.2em', marginLeft: '15px' }}>
                        {'</>'}
                    </span>
                    <span style={{ color: T.accentBlue, opacity: 0.5, display: 'block', fontSize: '0.4em', fontWeight: 400, marginTop: '10px' }}>
                        /// Features that Redefine Code Ownership
                    </span>
                </h1>
                
                {/* UPDATED: Code-style decoration for subtitle */}
                <p style={styles.heroSubtitle}>
                    <span style={{ color: T.accentYellow, marginRight: '15px' }}>{'>_'}</span> 
                    True digital sovereignty and permanence for every line of your work, secured by the network.
                </p>
                <p style={{...styles.heroSubtitle, fontSize: '20px', marginTop: '40px', color: T.accentBlue, opacity: 0.6}}>
                    <span style={{ color: T.accentYellow, marginRight: '15px' }}>{'[ ]'}</span> 
                    Scroll to explore the decentralized stack.
                </p>
            </div>

            <div style={styles.rightPanel}>
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        style={{
                            ...styles.featureBlock,
                            opacity: hoveredFeature === idx ? 1 : hoveredFeature === null ? 1 : 0.4,
                        }}
                        onMouseEnter={() => setHoveredFeature(idx)}
                        onMouseLeave={() => setHoveredFeature(null)}
                    >
                        {/* UPDATED: Code-style decoration for feature number */}
                        <div style={styles.featureNumber}>
                            <span style={{ color: T.accentYellow, marginRight: '10px' }}>{'# BLOCK'}</span>
                            {feature.number}
                        </div>
                        <h3 style={{
                            ...styles.featureTitle,
                            transform: hoveredFeature === idx ? 'translateX(20px)' : 'translateX(0)',
                        }}>
                            {/* UPDATED: Code-style decoration for feature title */}
                            <span style={{ color: T.accentBlue, opacity: 0.8, marginRight: '15px', fontSize: '0.6em', fontWeight: 400 }}>
                                const
                            </span>
                            {feature.title}
                            <span style={{ color: T.accentGreen, opacity: 0.7, marginLeft: '15px', transition: 'all 0.3s ease', display: hoveredFeature === idx ? 'inline' : 'none' }}>
                                {'=>'}
                            </span>
                        </h3>
                        <p style={styles.featureDescription}>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProHeroSection;