import React, { useState } from 'react';

const TimelineRoadmap = () => {
    const [activePhase, setActivePhase] = useState(1);

    const T = {
        background: '#0d1117',
        cardBackground: '#161b22',
        textPrimary: '#e6edf3',
        textSecondary: '#7d8590',
        accentCyan: '#58a6ff',
        accentOrange: '#f78166',
        accentGreen: '#3fb950',
        border: '#30363d',
    };

    const styles = {
        section: {
            minHeight: '100vh',
            padding: '100px 40px',
            backgroundColor: T.background,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
        container: {
            maxWidth: '1400px',
            margin: '0 auto',
        },
        header: {
            marginBottom: '100px',
        },
        title: {
            fontSize: '72px',
            fontWeight: 700,
            color: T.textPrimary,
            marginBottom: '20px',
            letterSpacing: '-0.03em',
        },
        subtitle: {
            fontSize: '22px',
            color: T.textSecondary,
            maxWidth: '700px',
        },
        phaseNav: {
            display: 'flex',
            gap: '16px',
            marginBottom: '80px',
            borderBottom: `1px solid ${T.border}`,
            paddingBottom: '0',
        },
        phaseTab: {
            padding: '20px 32px',
            fontSize: '18px',
            fontWeight: 600,
            background: 'none',
            border: 'none',
            borderBottom: '3px solid transparent',
            color: T.textSecondary,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            bottom: '-1px',
        },
        timelineContainer: {
            position: 'relative',
        },
        timeline: {
            position: 'absolute',
            left: '60px',
            top: '0',
            bottom: '0',
            width: '2px',
            background: T.border,
        },
        featureItem: {
            display: 'flex',
            gap: '60px',
            marginBottom: '80px',
            alignItems: 'flex-start',
        },
        timelineNode: {
            width: '120px',
            flexShrink: 0,
            textAlign: 'right',
            paddingTop: '8px',
        },
        nodeNumber: {
            fontSize: '56px',
            fontWeight: 800,
            lineHeight: 1,
            opacity: 0.15,
        },
        nodeDot: {
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '3px solid',
            background: T.background,
            flexShrink: 0,
            marginTop: '8px',
            zIndex: 1,
            position: 'relative',
        },
        featureContent: {
            flex: 1,
            paddingTop: '0',
        },
        featureTitle: {
            fontSize: '36px',
            fontWeight: 700,
            color: T.textPrimary,
            marginBottom: '16px',
            letterSpacing: '-0.02em',
        },
        featureDescription: {
            fontSize: '18px',
            color: T.textSecondary,
            lineHeight: 1.7,
            marginBottom: '24px',
            maxWidth: '700px',
        },
        detailsList: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
        },
        detailTag: {
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
            border: '1px solid',
        },
    };

    const phases = [
        { id: 1, label: 'Phase 01', color: T.accentCyan },
        { id: 2, label: 'Phase 02', color: T.accentOrange },
        { id: 3, label: 'Phase 03', color: T.accentGreen },
    ];

    const features = [
        { 
            title: 'AI Code Creation', 
            description: 'Instantly generate boilerplate and complex functions from natural language prompts, reducing manual coding time and improving output consistency.', 
            details: ['Context-aware generation', 'Multi-language support', 'Repository integration'], 
            phase: 1,
            order: 1
        },
        { 
            title: 'MCP Registry', 
            description: 'A centralized registry for MCP tools', 
            details: ['Model Context Protocol', 'AI agent usable', 'Autonomous workflows'], 
            phase: 1,
            order: 2
        },
        { 
            title: 'Manage & Compare Prompts', 
            description: 'Track, version, and A/B test the performance of different prompts used by your Intelligent Apps to optimize output quality.', 
            details: ['Prompt history & versioning', 'A/B testing for efficiency', 'Performance metrics tracking'], 
            phase: 1,
            order: 3
        },
        { 
            title: 'AI Code Review', 
            description: 'Automated, AI-powered static analysis to identify bugs, security vulnerabilities, and ensure adherence to coding standards pre-merge.', 
            details: ['Real-time vulnerability scanning', 'Automated style checks', 'Enhanced human review flow'], 
            phase: 2,
            order: 1
        },
        { 
            title: 'Automate Any Workflow', 
            description: 'Intuitive visual builder for creating custom CI/CD pipelines, testing, and deployment workflows, triggered by code events or schedules.', 
            details: ['Drag-and-drop pipeline builder', 'Event-based triggering', 'Pre-built action templates'], 
            phase: 2,
            order: 2
        },
        { 
            title: 'External Tools Integration', 
            description: 'Seamlessly connect and manage third-party development tools like external CI/CD platforms, monitoring systems, and cloud services.', 
            details: ['Open API for custom hooks', 'Pre-configured marketplace', 'Unified dashboard visibility'], 
            phase: 3,
            order: 1
        },
        { 
            title: 'Build & Deploy Intelligent Apps', 
            description: 'Dedicated environments and tools optimized for building, testing, and deploying applications that heavily leverage AI/ML models.', 
            details: ['AI model serving integration', 'Auto-scaling for intelligent workloads', 'Zero-downtime deployment'], 
            phase: 3,
            order: 2
        },
    ];

    const filteredFeatures = features.filter(f => f.phase === activePhase);
    const currentPhase = phases.find(p => p.id === activePhase);

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Roadmap</h1>
                    <p style={styles.subtitle}>
                        Building the future of development, one phase at a time
                    </p>
                </div>

                <div style={styles.phaseNav}>
                    {phases.map((phase) => (
                        <button
                            key={phase.id}
                            style={{
                                ...styles.phaseTab,
                                color: activePhase === phase.id ? phase.color : T.textSecondary,
                                borderBottomColor: activePhase === phase.id ? phase.color : 'transparent',
                            }}
                            onClick={() => setActivePhase(phase.id)}
                        >
                            {phase.label}
                        </button>
                    ))}
                </div>

                <div style={styles.timelineContainer}>
                    <div style={{
                        ...styles.timeline,
                        background: currentPhase.color,
                        opacity: 0.3,
                    }} />

                    {filteredFeatures.map((feature, idx) => (
                        <div key={idx} style={styles.featureItem}>
                            <div style={styles.timelineNode}>
                                <div style={{
                                    ...styles.nodeNumber,
                                    color: currentPhase.color,
                                }}>
                                    0{feature.order}
                                </div>
                            </div>

                            <div style={{
                                ...styles.nodeDot,
                                borderColor: currentPhase.color,
                            }} />

                            <div style={styles.featureContent}>
                                <h3 style={styles.featureTitle}>{feature.title}</h3>
                                <p style={styles.featureDescription}>{feature.description}</p>
                                <div style={styles.detailsList}>
                                    {feature.details.map((detail, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                ...styles.detailTag,
                                                borderColor: currentPhase.color,
                                                color: currentPhase.color,
                                                backgroundColor: `${currentPhase.color}15`,
                                            }}
                                        >
                                            {detail}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TimelineRoadmap;