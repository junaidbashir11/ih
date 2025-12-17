"use client";

import { jwtDecode } from "jwt-decode";


import { useState,useEffect } from 'react';

import RepoExplorer from "../../lib/repoexplorer";
import Link from "next/link";
import ProCLISection from "../../lib/cli-features";


const GithubProDashboard = () => {
    const [activeTab, setActiveTab] = useState('account');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [folderName, setFolderName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [uploads,setUploads]=useState("")




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


  


    const handleCreateRepo=async ()=>{


        let request=await fetch("http://localhost:3000/api/repo/create",{
            mode:"cors",
            method:"post",
            body:JSON.stringify({"wallet":"HYUFyAnmGKsm6Qwjp5D2U6VyNNcCt4UpBox2occw5vLj","foldername":folderName}),
            headers:{
                "content-type":"application/json"
            }
        })
       let response=await request.json()
       if(response.status_==true){
        alert("repo created , check the repo section")
       }
      else if (response.status_==false){
        alert("repo not created , error")
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
    };


      const styles = {
        dashboard: {
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: T.background,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
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
            backgroundColor: T.background,
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
    };

    const AccountContent = () => (
        <div>
            <div style={styles.pageHeader}>
                <div style={styles.breadcrumb}>
                    <span>Settings</span>
                    <span>›</span>
                    <span style={{color: T.textPrimary}}>Account</span>
                </div>
                <h1 style={styles.pageTitle}>Account Settings</h1>
                
            </div>

            <div style={styles.section}>
                <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>Profile</h2>
                </div>
                <div style={{
                    ...styles.card,
                    borderColor: hoveredCard === 'profile' ? T.textPrimary : T.border,
                }}
                onMouseEnter={() => setHoveredCard('profile')}
                onMouseLeave={() => setHoveredCard(null)}
                >
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Display Name</label>
                
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


                    <Link href="/folders" className="text-white font-mono"><h1>REPOSITORIES</h1></Link>
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

   
const CreateRepoContent = () => (

      
        
        <div>
            <div style={styles.pageHeader}>
                <div style={styles.breadcrumb}>
                    <span>Repositories</span>
                    <span>›</span>
                    <span style={{color: T.textPrimary}}>New</span>
                </div>
                <h1 style={styles.pageTitle}>Create New Repository</h1>
                <p style={styles.pageDescription}>
                    Create a new immutable repository
                </p>
            </div>

            <div style={styles.section}>
                <div style={{
                    ...styles.card,
                    maxWidth: '600px',
                    borderColor: hoveredCard === 'create-form' ? T.textPrimary : T.border,
                }}
                onMouseEnter={() => setHoveredCard('create-form')}
                onMouseLeave={() => setHoveredCard(null)}
                >
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Folder Name</label>
                        <input 
                            style={styles.input} 
                            type="text" 
                            placeholder="my-awesome-project"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                        />
                    </div>
                    <div style={{display: 'flex', gap: '8px'}}>
                        <button 
                            style={{
                                ...styles.button,
                                opacity: (!folderName.trim() || isCreating) ? 0.5 : 1,
                                cursor: (!folderName.trim() || isCreating) ? 'not-allowed' : 'pointer',
                            }}
                            onClick={handleCreateRepo}
                            disabled={!folderName.trim() || isCreating}
                        >
                            {isCreating ? 'Creating...' : 'Create Repository'}
                        </button>
                        <button 
                            style={styles.buttonSecondary}
                            onClick={() => {
                                setActiveTab('repos');
                                setFolderName('');
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
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

<h1 className="text-2xl md:text-2xl font-bold tracking-tight leading-none mb-6">
                    
                
                    <p className="text-white">Immutable  &  Decentralized  </p>
                    <span className="block mt-2">
                        <span className="text-fuchsia-400 opacity-70">{'{'}</span>
                        <span className="ml-4 text-white">Code</span>
                        <span className="text-fuchsia-400 opacity-70">{'}'}</span>
                    </span>
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
                    </div>
                </nav>
            </aside>

            <main style={styles.mainContent}>
                <div style={styles.topBar}>

               
                </div>

                
                <div style={styles.contentArea}>
                    {activeTab === 'account' && <AccountContent />}
                    {activeTab === 'repos' && <ReposContent />}
                    {activeTab === 'create-repo' && <CreateRepoContent styles={styles} T={T} />}
                </div>
            </main>
        </div>
    );
};

export default GithubProDashboard