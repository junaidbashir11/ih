import React, { useState } from 'react';

const ProCLISection = () => {
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
            title: 'CLI Login : ihub login <walletname>',
            description: 'Use immutable hub cli to login into the cli',
        },
        {
            number: '02',
            title: 'Code Push : ihub push <reponame>',
            description: 'Use immutable hub cli to push the code to our immutable & decentralized storage ',
        },
        {
            number: '03',
            title: 'Code Clone : ihub clone <repoame> if new use flag as --new true ',
            description: 'Use immutable hub cli to clone the repo from our immutable & decentalized storage.',
        },
        
    ];

    return (
        <section style={styles.hero}>
            <div style={styles.leftPanel}>
                <h1 style={styles.heroTitle}>
                    {/* UPDATED: Code-style decoration for main title */}
                   
                    SETUP
                   
                    <span style={{ color: T.accentBlue, opacity: 0.5, display: 'block', fontSize: '0.4em', fontWeight: 400, marginTop: '10px' }}>
                        
                    </span>
                </h1>
                
                {/* UPDATED: Code-style decoration for subtitle */}
                <p style={styles.heroSubtitle}>
                    <span style={{ color: T.accentYellow, marginRight: '15px' }}>{'>_'}</span> 
                    True digital sovereignty and permanence for every line of your work, secured by the network.
                </p>
                <p style={{...styles.heroSubtitle, fontSize: '20px', marginTop: '40px', color: T.accentBlue, opacity: 0.6}}>
                    <span style={{ color: T.accentYellow, marginRight: '15px' }}>{'[ ]'}</span> 
                
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
                            <span style={{ color: T.accentYellow, marginRight: '10px' }}>{'#'}</span>
                            {feature.number}
                        </div>
                        <h3 style={{
                            ...styles.featureTitle,
                            transform: hoveredFeature === idx ? 'translateX(20px)' : 'translateX(0)',
                        }}>
                            {/* UPDATED: Code-style decoration for feature title */}
                           
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

export default ProCLISection;