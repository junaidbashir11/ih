"use client";

import {useState } from "react";
import Link from "next/link";
import { useRepoData } from "@/lib/useRepoData";

export default function FolderPage() {
  

  const { uploads, loading } = useRepoData();

  if (loading) return <div className="bg-dark-500">Loading…</div>;


/*

  useEffect(() => {
    async function repoData() {
      const request = await fetch(
        "http://localhost:3000/api/data/HYUFyAnmGKsm6Qwjp5D2U6VyNNcCt4UpBox2occw5vLj",
        { headers: { "content-type": "application/json" } }
      );

      const response = await request.json();
      setUploads(response.uploads || []);
    }

    repoData();
  }, []);

*/

/*
useEffect(() => {
  async function repoData() {
    const CACHE_KEY = "folders";

    // 2️⃣ Fetch fallback
    const request = await fetch(
      "http://localhost:3000/api/data/HYUFyAnmGKsm6Qwjp5D2U6VyNNcCt4UpBox2occw5vLj",
      { headers: { "content-type": "application/json" } }
    );

    const response = await request.json();
    const uploads = Array.isArray(response.uploads) ? response.uploads : [];

    // 3️⃣ Cache + state
    localStorage.setItem(CACHE_KEY, JSON.stringify(uploads));
    setUploads(uploads);
  }

  repoData();
}, []);

*/
/*
useEffect(() => {
  let cancelled = false;

  async function repoData() {
    const CACHE_KEY = "folders";
    const TTL = 5 * 60 * 1000; // 5 minutes

    let cacheValid = false;

    // 1️⃣ Read cache FIRST (with TTL)
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { time, data } = JSON.parse(cached);

        if (
          Array.isArray(data) &&
          typeof time === "number" &&
          Date.now() - time < TTL
        ) {
          cacheValid = true;
          if (!cancelled) {
            setUploads(data); // 🔥 instant render
          }
        } else {
          localStorage.removeItem(CACHE_KEY);
        }
      } catch {
        localStorage.removeItem(CACHE_KEY);
      }
    }

    // 2️⃣ Background revalidation (always)
    try {

      const vjwt=localStorage.getItem('vjwt')
      const decoded=jwtDecode(vjwt)
      const wallet=decoded.sub

      const request = await fetch(
        `http://localhost:3000/api/data/${wallet}`,
        { headers: { "content-type": "application/json" } }
      );

      const response = await request.json();
      const freshUploads = Array.isArray(response.uploads)
        ? response.uploads
        : [];

      if (!cancelled) {
        // update UI only if changed
        setUploads(prev =>
          JSON.stringify(prev) === JSON.stringify(freshUploads)
            ? prev
            : freshUploads
        );

        // update cache with timestamp
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            time: Date.now(),
            data: freshUploads
          })
        );
      }
    } catch (err) {
      console.error("Folders fetch failed:", err);
    }
  }

  repoData();

  return () => {
    cancelled = true;
  };
}, []);

*/

  const theme = {
    bg: "bg-gradient-to-br from-[#0a0a0d] via-[#0e0e14] to-[#050507]",
    card: "bg-[#101014] border border-[#303036]",
    textPrimary: "text-white",
    textSecondary: "text-[#a0a0a9]",
    accent: "text-[#A359FF]",
    hover: "hover:bg-[#1c1c22]",
  };


  const navLinkClasses ="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1";
  return (
    <div className={`${theme.bg} min-h-screen px-6 py-20`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}

    
        <header className="flex justify-between items-center pb-8 border-b border-[#303036] mb-10">
            <Link href="/" className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                <span className={`text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500`}>ImmutableHub</span>
                <span className={`text-xl font-medium ${theme.textSecondary}`}>— Folders</span>
            </Link>
            
            <nav className="flex items-center space-x-6">
                 <a className={navLinkClasses}>Token</a>
                 <a className={navLinkClasses}>Docs</a>
            </nav>
        </header>









        <div className="mb-12">

  
                    
                
                <Link href="/dashboard" className="text-cyan-500 font-mono text-sm" >Dash</Link>

          
        </div>

        {/* Folder Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {uploads.map((f) => (
            <Link
              key={f.folder}
              href={`/folders/${encodeURIComponent(f.folder)}`}
              className={`
                ${theme.card}
                ${theme.hover}
                rounded-xl p-6 transition-all duration-200
                group
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2
                    className={`text-lg font-semibold ${theme.textPrimary} group-hover:${theme.accent}`}
                  >
                    {f.folder}
                  </h2>
                  <p className={`text-sm ${theme.textSecondary} mt-1`}>
                    {f.data?.length || 0} objects
                  </p>
                </div>

                <div
                  className={`text-2xl ${theme.accent} opacity-70 group-hover:opacity-100`}
                >
                  ⟶
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {uploads.length === 0 && (
          <div className={`mt-20 text-center ${theme.textSecondary}`}>
            Loading ....
          </div>
        )}
      </div>
    </div>
  );
}
