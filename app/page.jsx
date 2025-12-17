"use client";

import { jwtDecode } from "jwt-decode";
import { detectWallets ,getGeolocationData,VelocityAuth} from "velocitytunedx401"
import { useState ,useEffect} from "react";
import { useRouter } from 'next/navigation';
import TimelineRoadmap from "../lib/roadmap"
import ProHeroSection from "../lib/features"

// Define utility classes for navigation links
const navLinkClasses ="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1";





export default function Home() {

    const [showPopup, setShowPopup] = useState(false);
    const [wallets, setWallets] = useState([]);
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null,
        isFetching: false,
    });
    const [token, setToken] = useState(null)
    const router = useRouter();


    useEffect(() => {
    setToken(localStorage.getItem("vjwt"))
    }, [])

    useEffect(()=>{
        let token=localStorage.getItem("vjwt")
        if(!token){
            // If the user is on the root path and has no token, no redirect needed,
            // but if they are trying to access a protected page, the push to "/" handles it.
            // Since this is the Home page ("/"), we can skip the router.push("/") here.
        }
        else if(token){
            // Optionally redirect to dashboard if already authenticated
            // router.push("/dashboard") 
        }

    },[token])


    useEffect(() => {
        async function fetchLocation() {
            // Set isFetching to true while waiting for location data
            setLocation(prev => ({ ...prev, isFetching: true }));

            const locationdata = await getGeolocationData(); 
    
            setLocation({
                latitude: locationdata.latitude || null, 
                longitude: locationdata.longitude || null,
                error: locationdata.error || null,
                isFetching: false,
            });
            console.log("Location Data:", locationdata)
        }

        fetchLocation(); 
    }, []);

    useEffect(() => {
        let wallets=detectWallets()
        setWallets(wallets)
    }, []);


    const getWalletIcon = (walletName) => {
        const icons = {
        metamask: "", // You should define an icon path for Metamask
        phantom: "/plogo.png",
        solflare:"/solflare.svg"
        
    };

    // Assuming detectWallets returns the lowercase name of the wallet (e.g., "phantom", "solflare")
    return icons[walletName.toLowerCase()] || ""; 
    }


    const LOGGER=async (wallet)=>{

    const config={
        wallet:wallet,
        required_mint:"3d4XyPWkUJzruF5c2qc1QfpLgsaNaDLMtTya1bWBpump",
        mint_amount:"0.0",
        geo_code:"false",
        geo_code_locs:"",
        coords:{
            latitude:location.latitude,
            longitude:location.longitude
        },
        device_auth:false
    }

    const result=await VelocityAuth(config)

        if(result.success){

        if(result.alreadyAuthenticated) {
            alert("Already authenticated")
            console.log(result.token)
            setToken(result.token) // Update token state
        }
        else if(result.alreadyAuthenticated==false){
            
            console.log(result.token)
            localStorage.setItem("vjwt",result.token)
            alert("Authenticated successfully")
            let token=localStorage.getItem("vjwt")  
            const decoded = jwtDecode(token);
            console.log(decoded)
            setToken(token) // Update token state
        }


        }
        else{

            switch(result.error){

                case "INSUFFICIENT_TOKENS":

                    alert(`You need ${result.required} tokens to access`);
                    break;

                case "LOCATION_DENIED":

                    alert("Access denied for your location");
                    break;

                case "LOCATION_ERROR":
                    
                    alert("Location permission denied")
                    break;
                
                default:
                    alert(`Authentication failed: ${result.error}`)
            }}
    }

    


    return (
        // Main container with deep blue/purple background, mimicking GitHub's dark theme
        <div className="font-sans min-h-screen bg-[#0d1117] text-white overflow-hidden relative">

            {/* --- NEW: ANIMATED BACKGROUND LAYER (Code/Data Grid) --- */}
            {/* Requires custom Tailwind setup for bg-grid-white-10 and animate-pulse-slow for true effect */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="w-full h-full bg-grid-white-10 [background-size:25px_25px] [background-image:linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)]">
                    {/* Subtle animated gradient overlay for the 'flow' effect and fade out edges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-[#0d1117]"></div>
                    
                    {/* Placeholder for slow, subtle animation on the grid itself */}
                    {/* <div className="w-full h-full animate-pulse-slow"></div> */}
                </div>
            </div>
            {/* --- END OF NEW ANIMATED BACKGROUND LAYER --- */}
        
            {/* --- 1. Top Navigation Bar --- (z-index added for layering above background) */}
            <header className="px-8 py-4 flex justify-between items-center max-w-7xl mx-auto relative z-10">
                {/* Navigation Links (Simplified) */}
                <nav className="flex items-center space-x-6">
                    {/* Placeholder for Octocat/Logo - Renamed to ImmutableHub */}
                    <div className="text-2xl font-bold">
                        <span className="text-white">ImmutableHub</span>
                    </div>
                    
                    <a className={navLinkClasses}>
                        Platform 
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </a>
                    <a className={navLinkClasses}>Features</a>
                    <a className={navLinkClasses}>Open Source</a>
                    <a className={navLinkClasses}>Pricing</a>
                </nav>

                {/* Action Buttons on the Right */}
                <div className="flex items-center space-x-4">
                    <button className="text-white/80 hover:text-white transition-colors">
                        {/* Search Icon Placeholder */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                    {/* Use token state to conditionally render Sign In/Out or Dashboard button */}
                    {token ? (
                        <button 
                            className="text-sm font-medium border border-white/50 px-3 py-1.5 rounded-md hover:border-white transition-colors" 
                            onClick={() => router.push("/dashboard")}
                        >
                            Dashboard
                        </button>
                    ) : (
                        <>
                            <a className="text-sm font-medium text-white/80 hover:text-white transition-colors" href="#">Sign in</a>
                            <a className="text-sm font-medium border border-white/50 px-3 py-1.5 rounded-md hover:border-white transition-colors" href="#">Sign up</a>
                        </>
                    )}
                </div>
            </header>
            
            {/* --- 2. Main Content and Hero Section --- */}
            <main className="flex flex-col items-center justify-start pt-12 text-center max-w-4xl mx-auto relative z-10"> 
                
                {/* NEW: Animated Glowing Orb/Node (Requires custom animate-float-slow) */}
                <div className="absolute -top-10 right-1/4 w-32 h-32 bg-purple-500/30 rounded-full filter blur-3xl opacity-50 animate-float-slow"></div>

                {/* Hero Headline: UPDATED WITH CODE-STYLE SPACE FILLERS */}
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none mb-6">
                    
                    <span className="text-purple-400 opacity-70">// █ </span> 
                    Immutable  &  Decentralized  
                    <span className="text-fuchsia-400 opacity-70">::</span>
                    <span className="block mt-2">
                        <span className="text-fuchsia-400 opacity-70">{'{'}</span>
                        <span className="ml-4">Code</span>
                        <span className="text-fuchsia-400 opacity-70">{'}'}</span>
                        <span className="text-purple-400 opacity-70 ml-2">▒</span>
                    </span>
                </h1>

                {/* Subtext - Replaced GitHub with ImmutableHub */}
                <p className="text-lg text-white/80 max-w-2xl mb-10">
                    Code that you own, Code that persists and is Unhackable
                </p>

                {/* Action Block - Only the button remains */}
                <div className="mt-4">
                    
                    <div className="items-center justify-center p-20"  style={{ background: '',minHeight: '20vh'}}>

                    
                    <button
                        onClick={() => setShowPopup(true)}
                        className="
                            px-10 py-1
                            text-lg font-bold
                            uppercase tracking-widest 
                            rounded-lg 
                            transition duration-300 ease-in-out
                            
                            bg-white/10 backdrop-blur-md 
                            border border-purple-500/50
                            
                            text-white 
                            /* Enhanced Base Shadow */
                            shadow-[0_0_15px_rgba(168,85,247,0.7)] 
                            
                            /* New: More vibrant, dual-color glow on hover */
                            hover:bg-white/20 
                            hover:border-fuchsia-500/70
                            hover:shadow-[0_0_20px_rgba(236,72,153,1),_0_0_40px_rgba(168,85,247,0.7)] 
                            
                            transform hover:scale-[1.05]
                        "
                        >
                        Connect Wallet
                    </button>
                    
                    {showPopup && (
                        
                        <div 
                            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-2 backdrop-blur-sm"
                            onClick={() => setShowPopup(false)}
                        >
                            
                        <div 
                            className="bg-gray-900/95 p-6 rounded-xl shadow-[0_0_40px_rgba(124,58,237,0.9)] w-full max-w-sm border border-purple-700/70"
                            onClick={(e) => e.stopPropagation()}
                        >
                        <div className="flex justify-between items-center mb-2">
                        <h2 className="text-2xl font-bold text-white tracking-wide">
                                    Connect Wallet 
                        </h2>
                        <button 
                            onClick={() => setShowPopup(false)}
                            className="text-gray-400 hover:text-white transition duration-200 p-1"
                            aria-label="Close"
                        >
                             {/* Close Icon (X) */}
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        </div>
                                    
                                
                        <div className="space-y-3">
                        {wallets.map((wallet,index) => (

                        <button
                    
                            key={wallet}
                            onClick={()=>LOGGER(wallet)}
                            className="
                                flex items-center justify-start gap-3
                                w-full p-3
                                rounded-lg 
                                transition duration-200 
                                bg-gray-800/80 
                                border border-transparent
                                hover:bg-purple-600/30 
                                hover:border-fuchsia-500 
                                shadow-md
                                hover:scale-[1.02]
                            "
                            >
                
                        <img 
                            src={getWalletIcon(wallet)} 
                            alt={`${wallet} icon`}
                            className="w-8 h-8 rounded-md"
                        />
                    
                    
                        <span className="text-lg font-semibold text-white font-mono">
                            {wallet.toUpperCase()}
                        </span>

                        </button>
                    ))}
                        </div>

                        {wallets.length === 0 && (
                            <p className="text-center text-gray-400 pt-4">No wallets detected. Please install a Solana wallet extension (e.g., Phantom or Solflare).</p>
                            )}
                        </div>
                        </div>
                        )}
                    </div>
                </div>

                <ProHeroSection/>
                <TimelineRoadmap/>

            </main>
            
            {/* Original Optional: Add placeholder clouds/swirls (now replaced by the background layer) */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-50">
                {/* Original Placeholder: kept for complex visuals that float *above* the grid layer */}
                <div className="absolute top-20 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl opacity-50"></div>
            </div>
        </div>
    );
}