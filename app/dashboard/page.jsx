"use client";

import { jwtDecode } from "jwt-decode";


import { useState,useEffect } from 'react';

import Link from "next/link";
import ProCLISection from "../../lib/cli-features";
import DocsSection from "../../lib/docs";
import SupportSection from "../../lib/support";
import { useRouter } from "next/navigation";


const GithubProDashboard = () => {
    const [activeTab, setActiveTab] = useState('account');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [folderName, setFolderName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [uploads,setUploads]=useState("")
    const [decoded,setDecoded] =useState(null)
    const [version,setVersion]=useState("normal")
    const [prompt,setPrompt]=useState("")
    const [checked, setChecked] = useState(false)
    const router = useRouter();



    useEffect(() => {
    const token = localStorage.getItem("vjwt")
    
    if (!token) {
      router.replace("/")
      return
    }

    try {
      const decoded = jwtDecode(token)
      //setChecked(true)
      setDecoded(decoded)
    } catch {
      //localStorage.removeItem("vjwt")
      router.replace("/")
    }
  }, [])
    


     async function checkRepos(){
        let request=await fetch(`http://localhost:3000/api/repocheck/${'HYUFyAnmGKsm6Qwjp5D2U6VyNNcCt4UpBox2occw5vLj'}`,{
          method:"GET",
          headers:{

            "content-type":"application/json",
          }
        })
        let response=await request.json()
        if(response.data==true){
            localStorage.setItem("repos","yes")
        }
        else{
            localStorage.setItem("repos","no")
        }
    }

    const repoData=async ()=>{
        let request=await fetch("http://localhost:3000/api/data/HYUFyAnmGKsm6Qwjp5D2U6VyNNcCt4UpBox2occw5vLj",{

            headers:{
                "content-type":"application/json"
            }
        })
        let response=await request.json()
        if(response){
            setUploads(response)

        }
        else{
            setUploads("")
        }
    }

    useEffect(()=>{

        checkRepos()
        repoData()

    },[])

    ////{activeTab === 'create-repo' && <CreateRepoContent styles={styles} T={T} />}
    
    const handleChange = (event) => {
    setVersion(event.target.value);
  };

    const handleCreateRepo=async ()=>{

        if(folderName==""){

            alert("empty reponame")

        }
        else {

        let url=""
        if(version=="normal"){

            setIsCreating(true)
            url="/api/repo/create"
            let request=await fetch(url,{
            mode:"cors",
            method:"post",
            body:JSON.stringify({"wallet":"HYUFyAnmGKsm6Qwjp5D2U6VyNNcCt4UpBox2occw5vLj","foldername":folderName}),
            headers:{
                "content-type":"application/json"
            }
        })
            let response=await request.json()
            if(response.success==true){
                alert("repo created , check the repo section")
            }
            else if (response.success==false){
                alert("repo not created , error")
            }
            setIsCreating(false)


        }
/*
        else{

            setIsCreating(true)
            url="/api/repo/createjs"
            let request=await fetch(url,{
                mode:"cors",
                method:"post",
                body:JSON.stringify({
                    wallet:"HYUFyAnmGKsm6Qwjp5D2U6VyNNcCt4UpBox2occw5vLj",
                    foldername:folderName,
                    prompt:prompt
            }),
            headers:{
                "content-type":"application/json"
            }
        })
            let response=await request.json()
            if(response.success==true){
            alert("repo created , check the repo section")
            }
            else if (response.success==false){
                alert("repo not created , error")
            }
            setIsCreating(false)
        }
  */    
       



    }
    }


    const T = {
        background: '#0d1117',
        sidebarBg: '#010409',
        cardBg: '#161b22',
        textPrimary: '#e6edf3',
        textSecondary: '#7d8590',
        textTertiary: '#6e7681',
        border: '#30363d',
        borderLight: '#21262d',
        accentBlue: '#58a6ff',
        accentGreen: '#3fb950',
        accentOrange: '#f78166',
        hoverBg: '#1c2128',
        successBg: '#1a7f3714',
        warningBg: '#9e640014',
        accentYellow: '#f59e0b', 
    };


      const styles = {
        dashboard: {
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: T.background,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
        },
        heroSubtitle: {
            fontSize: '24px',
            color: T.textSecondary,
            fontWeight: 400,
            lineHeight: 1.6,
            marginTop: '20px',
            fontFamily: 'monospace, "Courier New"',
        },
        sidebar: {
            width: '280px',
            backgroundColor: T.sidebarBg,
            borderRight: `1px solid ${T.border}`,
            padding: '24px 0',
            position: 'fixed',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
        },
        logoSection: {
            padding: '0 16px',
        },
        logo: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 12px',
            borderRadius: '8px',
            transition: 'background 0.2s ease',
            cursor: 'pointer',
        },
        logoIcon: {
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            background: `linear-gradient(135deg, ${T.accentBlue}, ${T.accentGreen})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 700,
        },
        logoText: {
            fontSize: '16px',
            fontWeight: 600,
            color: T.textPrimary,
        },
        nav: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            padding: '0 16px',
        },
        navSection: {
            marginBottom: '16px',
        },
        navLabel: {
            fontSize: '12px',
            fontWeight: 600,
            color: T.textTertiary,
            padding: '0 12px 8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
        },
        navItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 12px',
            fontSize: '14px',
            fontWeight: 500,
            color: T.textSecondary,
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            textAlign: 'left',
            width: '100%',
        },
        navIcon: {
            fontSize: '16px',
            width: '20px',
            textAlign: 'center',
        },
        mainContent: {
            marginLeft: '280px',
            flex: 1,
            minHeight: '100vh',
        },
        topBar: {
            height: '64px',
            borderBottom: `1px solid ${T.border}`,
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: T.background,
            position: 'sticky',
            top: 0,
            zIndex: 10,
        },
        contentArea: {
            padding: '32px',
        },
        pageHeader: {
            marginBottom: '32px',
        },
        breadcrumb: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: T.textSecondary,
            marginBottom: '12px',
        },
        pageTitle: {
            fontSize: '32px',
            fontWeight: 600,
            color: T.textPrimary,
            marginBottom: '8px',
            letterSpacing: '-0.02em',
        },
        pageDescription: {
            fontSize: '16px',
            color: T.textSecondary,
            lineHeight: 1.5,
        },
        section: {
            marginBottom: '40px',
        },
        sectionHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
        },
        sectionTitle: {
            fontSize: '20px',
            fontWeight: 600,
            color: T.textPrimary,
            letterSpacing: '-0.01em',
        },
        card: {
            backgroundColor: T.cardBg,
            border: `1px solid ${T.border}`,
            borderRadius: '8px',
            padding: '24px',
            transition: 'all 0.2s ease',
        },
        cardHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '16px',
        },
        cardTitle: {
            fontSize: '16px',
            fontWeight: 600,
            color: T.textPrimary,
            marginBottom: '4px',
        },
        cardDescription: {
            fontSize: '14px',
            color: T.textSecondary,
            lineHeight: 1.5,
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
        },
        inputGroup: {
            marginBottom: '20px',
        },
        label: {
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: T.textPrimary,
            marginBottom: '8px',
        },
        input: {
            width: '100%',
            padding: '8px 12px',
            fontSize: '14px',
            color: T.textPrimary,
            backgroundColor:'black',
            border: `1px solid ${T.border}`,
            borderRadius: '6px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            fontFamily: 'inherit',
        },
        button: {
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 500,
            color: T.background,
            backgroundColor: T.textPrimary,
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        },
        buttonSecondary: {
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 500,
            color: T.textPrimary,
            backgroundColor: T.hoverBg,
            border: `1px solid ${T.border}`,
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        },
        statCard: {
            backgroundColor: T.cardBg,
            border: `1px solid ${T.border}`,
            borderRadius: '8px',
            padding: '20px',
            transition: 'all 0.2s ease',
        },
        statValue: {
            fontSize: '32px',
            fontWeight: 600,
            color: T.textPrimary,
            marginBottom: '4px',
            letterSpacing: '-0.02em',
        },
        statLabel: {
            fontSize: '14px',
            color: T.textSecondary,
        },
        badge: {
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 500,
        },
        emptyState: {
            textAlign: 'center',
            padding: '48px 24px',
            backgroundColor: T.cardBg,
            border: `1px solid ${T.border}`,
            borderRadius: '8px',
        },
        emptyIcon: {
            fontSize: '48px',
            marginBottom: '16px',
            opacity: 0.3,
        },
        emptyTitle: {
            fontSize: '16px',
            fontWeight: 600,
            color: T.textPrimary,
            marginBottom: '8px',
        },
        emptyDescription: {
            fontSize: '14px',
            color: T.textSecondary,
            marginBottom: '16px',
        },
        tabContainer: {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    animation: 'fadeIn 0.3s ease-in-out', // Assuming you have a keyframe
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    marginBottom: '16px',
  },
  breadcrumbLink: {
    color: T.textSecondary,
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  breadcrumbSeparator: {
    color: T.border,
  },
  breadcrumbActive: {
    color: T.textPrimary,
    fontWeight: '500',
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '600',
    color: T.textPrimary,
    margin: '0 0 8px 0',
  },
  pageDescription: {
    fontSize: '16px',
    color: T.textSecondary,
    marginBottom: '32px',
  },
  card: {
    backgroundColor: T.cardBg, // e.g., #ffffff
    borderRadius: '12px',
    border: `1px solid ${T.border}`,
    padding: '32px',
    maxWidth: '600px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    transition: 'all 0.2s ease-in-out',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px',
    color: T.textPrimary,
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: `1px solid ${T.border}`,
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
    color:"white"
    // On focus, you should dynamically add: 
    // boxShadow: `0 0 0 3px ${T.accentLight}`
  },
  inputHint: {
    fontSize: '12px',
    color: T.textSecondary,
    marginTop: '8px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: `1px solid ${T.border}`,
  },
  buttonPrimary: {
    backgroundColor: T.accent, // e.g., #007bff
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'background 0.2s',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    color: T.textPrimary,
    border: `1px solid ${T.border}`,
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  }
    };2

 const AccountContent = () => (
    <div style={{ maxWidth: '1000px' }}>
        {/* TOP BAR / BREADCRUMB */}
        <div style={{ ...styles.pageHeader, borderLeft: `4px solid ${T.textPrimary}`, paddingLeft: '20px', marginBottom: '40px' }}>
            <div style={{ ...styles.breadcrumb, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '10px', opacity: 0.5 }}>
                <span>Settings</span>
                <span style={{ margin: '0 10px' }}>//</span>
                <span style={{ color: T.textPrimary }}>Account_Protocol</span>
            </div>
            <h1 style={{ ...styles.pageTitle, fontSize: '48px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '10px 0' }}>
                System Identity
            </h1>
        </div>

        {/* PROFILE SECTION */}
        <div style={styles.section}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ width: '8px', h: '8px', background: T.textPrimary }}></div>
                <h2 style={{ ...styles.sectionTitle, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.3em', margin: 0 }}>
                    Active Session Data
                </h2>
            </div>

            <div 
                style={{
                    ...styles.card,
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '0', // Sharp corners for brutalist look
                    border: '1px solid',
                    borderColor: hoveredCard === 'profile' ? T.textPrimary : 'rgba(255,255,255,0.1)',
                    padding: '30px',
                    transition: 'all 0.2s ease-in-out',
                    position: 'relative',
                    overflow: 'hidden'
                }}
                onMouseEnter={() => setHoveredCard('profile')}
                onMouseLeave={() => setHoveredCard(null)}
            >
                {/* Decorative corner tag */}
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '4px 8px', background: 'rgba(255,255,255,0.1)', fontSize: '8px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
                    SECURE NODE
                </div>

                <div style={styles.inputGroup}>
                    <label style={{ ...styles.label, display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.1em' }}>
                        Authenticated Address
                    </label>
                    <div style={{ 
                        fontFamily: 'monospace', 
                        fontSize: '18px', 
                        color: T.textPrimary,
                        background: 'rgba(0,0,0,0.3)',
                        padding: '15px',
                        borderLeft: `2px solid ${T.accentBlue || '#555'}` 
                    }}>
                        {decoded ? decoded.sub : "NO_SESSION_DETECTED"}
                    </div>
                </div>

                {/* CLI INSTRUCTION BOX */}
                <div style={{ marginTop: '30px', padding: '20px', border: '1px dashed rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                    <p style={{ ...styles.heroSubtitle, margin: 0, display: 'flex', alignItems: 'center', fontFamily: 'monospace', fontSize: '13px' }}>
                        <span style={{ color: T.accentYellow, marginRight: '15px', fontWeight: 'bold' }}>{'>_'}</span> 
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Login via CLI:</span>
                        <code style={{ marginLeft: '10px', color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '2px 8px' }}>
                            npx ihub op login [walletaddress]
                        </code>
                    </p>
                </div>

                {/* Status Bar Decoration */}
                <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
                   <div style={{ fontSize: '10px', color: T.accentBlue, opacity: 0.6, fontFamily: 'monospace' }}>
                        <span style={{ marginRight: '5px' }}>[x]</span> STATUS: OPERATIONAL
                   </div>
                   <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>
                        <span style={{ marginRight: '5px' }}>[ ]</span> SYNC: 100%
                   </div>
                </div>
            </div>
        </div>
    </div>
);



    const ReposContent = () => (
       
          <div>

            <div style={styles.section}>
                
                {localStorage.getItem("repos")=="yes"?(
                    <div>

<Link
  href="/folders"
  className="
    flex items-center justify-between
    w-full max-w-sm
    px-6 py-3
    rounded-xl
    border border-orange-500/30
    text-orange-500 font-mono text-lg
    hover:bg-orange-500/10
    hover:shadow-lg
    transition
    cursor-pointer
  "
>
  <div className="flex items-center gap-3">
    <span className="text-2xl">^</span>
    <span>[]REPOSITORIES</span>
  </div>
  <span className="text-orange-400 text-xl">{'→'}</span>
</Link>

                   
                    <ProCLISection/>

                    </div>


                ):
                (
                <div>
                 <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>📦</div>
                    <h3 style={styles.emptyTitle}>No repositories yet</h3>
                    <p style={styles.emptyDescription}>
                        Create your first repository to get started
                    </p>
                </div>

                </div>
            
            )}
                

            </div>

       </div>
    );





    return (
        <div style={styles.dashboard}>

            <aside style={styles.sidebar}>

            
                <div style={styles.logoSection}>
                    <div 
                        style={styles.logo}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = T.hoverBg}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        
                        <div>

<h1 className="text-3xl md:text-3xl font-black  tracking-tight leading-none mb-6">
                    
    <p className="text-white">ImmutableHub </p>
                    
</h1>

                        </div>
                    </div>
                </div>
                
                <nav style={styles.nav}>
                    <div style={styles.navSection}>
                        <div style={styles.navLabel}>Main</div>
                        <button
                            style={{
                                ...styles.navItem,
                                backgroundColor: activeTab === 'account' ? T.hoverBg : 'transparent',
                                color: activeTab === 'account' ? T.textPrimary : T.textSecondary,
                            }}
                            onClick={() => setActiveTab('account')}
                            onMouseEnter={(e) => {
                                if (activeTab !== 'account') e.currentTarget.style.backgroundColor = T.hoverBg;
                            }}
                            onMouseLeave={(e) => {
                                if (activeTab !== 'account') e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <span style={styles.navIcon}>⚙</span>
                            Account
                        </button>
                        <button
                            style={{
                                ...styles.navItem,
                                backgroundColor: activeTab === 'repos' ? T.hoverBg : 'transparent',
                                color: activeTab === 'repos' ? T.textPrimary : T.textSecondary,
                            }}
                            onClick={() => setActiveTab('repos')}
                            onMouseEnter={(e) => {
                                if (activeTab !== 'repos') e.currentTarget.style.backgroundColor = T.hoverBg;
                            }}
                            onMouseLeave={(e) => {
                                if (activeTab !== 'repos') e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <span style={styles.navIcon}>📁</span>
                            Repositories
                        </button>


                        <button
                            style={{
                                ...styles.navItem,
                                backgroundColor: activeTab === 'create-repo' ? T.hoverBg : 'transparent',
                                color: activeTab === 'create-repo' ? T.textPrimary : T.textSecondary,
                            }}
                            onClick={() => setActiveTab('create-repo')}
                            onMouseEnter={(e) => {
                                if (activeTab !== 'create-repo') e.currentTarget.style.backgroundColor = T.hoverBg;
                            }}
                            onMouseLeave={(e) => {
                                if (activeTab !== 'create-repo') e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <span style={styles.navIcon}>➕</span>
                            New Repository
                        </button>


                        <button
  style={{
    ...styles.navItem,
    backgroundColor: activeTab === 'docs' ? T.hoverBg : 'transparent',
    color: activeTab === 'docs' ? T.textPrimary : T.textSecondary,
  }}
  onClick={() => setActiveTab('docs')}
  onMouseEnter={(e) => {
    if (activeTab !== 'docs') e.currentTarget.style.backgroundColor = T.hoverBg;
  }}
  onMouseLeave={(e) => {
    if (activeTab !== 'docs') e.currentTarget.style.backgroundColor = 'transparent';
  }}
>
  <span style={styles.navIcon}>📄</span>
  Docs
</button>


                        <button
  style={{
    ...styles.navItem,
    backgroundColor: activeTab === 'support' ? T.hoverBg : 'transparent',
    color: activeTab === 'support' ? T.textPrimary : T.textSecondary,
  }}
  onClick={() => setActiveTab('support')}
  onMouseEnter={(e) => {
    if (activeTab !== 'support') e.currentTarget.style.backgroundColor = T.hoverBg;
  }}
  onMouseLeave={(e) => {
    if (activeTab !== 'support') e.currentTarget.style.backgroundColor = 'transparent';
  }}
>
  <span style={styles.navIcon}>!</span>
  Support
</button>


    </div>
                </nav>
            </aside>

            <main style={styles.mainContent}>
                <div style={styles.topBar}>

               
                </div>

                
                <div style={styles.contentArea}>
                    {activeTab === 'account' && <AccountContent />}
                    {activeTab === 'repos' && <ReposContent />}
                    
    {activeTab === "create-repo" && (
  <div style={styles.tabContainer}>
    {/* Breadcrumb & Header using the Screenshot's styling */}

    {isCreating==true?<div className="animate-pulse text-white font-mono">creating..</div>:<div></div>}
  
    <div style={{ ...styles.pageHeader, borderLeft: `4px solid ${T.textPrimary}`, paddingLeft: '20px', marginBottom: '40px' }}>
      <div style={styles.breadcrumb}>
        <span style={styles.breadcrumbLink}>SETTINGS</span>
        <span style={styles.breadcrumbSeparator}>//</span>
        <span style={styles.breadcrumbActive}>REPO_INITIALIZATION</span>
      </div>
      <h1 style={{ ...styles.pageTitle, fontSize: '48px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '10px 0' }}>
                CREATE NEW REPO
    </h1>
    </div>

    <div style={styles.layoutGrid}>
      {/* Left Side: The Form */}
      <div 
        style={{
          ...styles.card,
          borderColor: hoveredCard === 'create-form' ? T.textPrimary : '',
        }}
        onMouseEnter={() => setHoveredCard('create-form')}
        onMouseLeave={() => setHoveredCard(null)}
      >
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>REPOSITORY_IDENTIFIER</label>
          <input 
            style={styles.input} 
            type="text" 
            placeholder="e.g. protocol-v1"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </div>

        <div style={styles.buttonGroup}>

       
          
         <button
         style={styles.buttonPrimary}
         onClick={()=>handleCreateRepo()}

         >
            create repo
         </button>
          <button style={styles.buttonSecondary} onClick={() => setActiveTab('repos')}>
            CANCEL
          </button>
        </div> <br/><br/>
      
    
      </div>

      {/* Right Side: Filler / Technical
       Specs */}
      <div style={styles.sidePanel}>
        <div style={styles.sideHeader}></div>
        <div style={styles.fillerText}>
        </div>
      </div>
    </div>
  </div>
)}






    {activeTab === 'docs' && <div><DocsSection/></div>}
    {activeTab === 'support' && <div><SupportSection/></div>}
   </div>
            </main>
        </div>
    );
};

export default GithubProDashboard