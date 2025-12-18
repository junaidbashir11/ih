"use client";

import {use } from "react";
import Link from "next/link";
import { useRepoData } from "@/lib/useRepoData";

export default function FilePage({ params }) {

  const { folder, cid } = use(params);
  const decoded = decodeURIComponent(folder);
  const { uploads, loading } = useRepoData();

  if (loading) return  ( <div className="flex items-center justify-center h-screen bg-black">
      <div className="animate-spin h-8 w-8 rounded-full border-4 border-white border-t-transparent" />
      <span className="ml-3 text-white">Loading repository…</span>
    </div>
  )

  const file =
    uploads
      .find(f => f.folder === decoded)
      ?.data.find(d => d.cid === cid);

  if (!file) return <div>Not found</div>;

  const navLinkClasses ="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1";




  const theme = {
    bg: "bg-gradient-to-br from-[#0a0a0d] via-[#0e0e14] to-[#050507]",
    card: "bg-[#101014] border border-[#303036]",
    textPrimary: "text-white",
    textSecondary: "text-[#a0a0a9]",
    accent: "text-[#A359FF]",
  };

  if (!file) {
    return (
      <div className={`${theme.bg} min-h-screen flex items-center justify-center`}>
        <div className={theme.textSecondary}>Loading immutable content…</div>
      </div>
    );
  }

  return (
    <div className={`${theme.bg} min-h-screen px-6 py-20`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
        
        
          <header className="flex justify-between items-center pb-8 border-b border-[#303036] mb-10">
            <Link href="/" className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                <span className={`text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500`}>ImmutableHub</span>
                <span className={`text-xl font-medium ${theme.textSecondary}`}>— </span>
            </Link>
            
            <nav className="flex items-center space-x-6">
                 <a  href={process.env.NEXT_PUBLIC_TOKEN_LINK} className={navLinkClasses}>Token</a>
                 <a className={navLinkClasses}>Docs</a>
                  <Link href="/dashboard" className="text-cyan-500 font-mono text-sm" >Dash</Link>
            </nav>

        </header>

         


          <p className={`mt-2 text-sm ${theme.textSecondary}`}>
          
          </p>
        </div>

        {/* Content */}
        <div
          className={`
            ${theme.card}
            rounded-xl p-6 overflow-x-auto
          `}
        >
          <pre
            className={`
              text-sm leading-relaxed
              ${theme.textPrimary}
              whitespace-pre-wrap
              font-mono
            `}
          >
            {file.content}
          </pre>
        </div>
      </div>
    </div>
  );
}
