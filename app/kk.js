import Image from "next/image";

// Define utility classes for the secondary GitHub-style link button (now the main action)
const mainActionButtonClasses =
  "h-12 px-6 font-semibold text-base rounded-md border border-white/50 text-white hover:border-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-4 focus:ring-white/40";

const navLinkClasses =
  "text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1";

export default function Home() {
  return (
    // Main container with deep blue/purple background, mimicking GitHub's dark theme
    <div className="font-sans min-h-screen bg-[#0d1117] text-white overflow-hidden relative">
      
      {/* --- 1. Top Navigation Bar --- */}
      <header className="px-8 py-4 flex justify-between items-center max-w-7xl mx-auto">
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
          <a className={navLinkClasses}>Solutions</a>
          <a className={navLinkClasses}>Resources</a>
          <a className={navLinkClasses}>Open Source</a>
          <a className={navLinkClasses}>Enterprise</a>
          <a className={navLinkClasses}>Pricing</a>
        </nav>

        {/* Action Buttons on the Right */}
        <div className="flex items-center space-x-4">
          <button className="text-white/80 hover:text-white transition-colors">
             {/* Search Icon Placeholder */}
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
          <a className="text-sm font-medium text-white/80 hover:text-white transition-colors" href="#">Sign in</a>
          <a className="text-sm font-medium border border-white/50 px-3 py-1.5 rounded-md hover:border-white transition-colors" href="#">Sign up</a>
        </div>
      </header>
      
      {/* --- 2. Main Content and Hero Section --- */}
      <main className="flex flex-col items-center justify-start pt-12 text-center max-w-4xl mx-auto">
        
        {/* "Explore the latest tools from Universe '25" Banner */}
        <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-white/10 text-sm font-medium border border-white/20 cursor-pointer hover:bg-white/20 transition-colors">
            {/* Duck/Emoji Placeholder */}
            <span role="img" aria-label="duck" className="mr-2 text-xl">🦆</span>
            Explore the latest tools from Universe '25 
            <span className="ml-2 font-bold text-lg">›</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none mb-6">
          Immutable  &  Decentralized  <span className="block">Code</span>
        </h1>

        {/* Subtext - Replaced GitHub with ImmutableHub */}
        <p className="text-lg text-white/80 max-w-2xl mb-10">
          Code that you own , Code that persists and is Unhackable
        </p>

        {/* Action Block - Only the button remains */}
        <div className="mt-4">
            <a
                className={mainActionButtonClasses}
                href="#" // Action link
            >
                Try ImmutableHub free
            </a>
        </div>
      </main>
      
      {/* Optional: Add placeholder clouds/swirls (complex background graphics) */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        {/* Placeholder for complex background gradients/graphics */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl opacity-50"></div>
      </div>
    </div>
  );
}