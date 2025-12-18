"use client";

import { use } from "react";
import Link from "next/link";
import { useRepoData } from "@/lib/useRepoData";

export default function FolderDetail({ params }) {
  const { folder } = use(params);
  const { uploads, loading } = useRepoData();

  const decodedFolder = decodeURIComponent(folder);

 

   if (loading) return  ( <div className="flex items-center justify-center h-screen bg-black">
      <div className="animate-spin h-8 w-8 rounded-full border-4 border-white border-t-transparent" />
      <span className="ml-3 text-white">Loading repository…</span>
    </div>
  )

  const found = uploads.find(f => f.folder === decodedFolder);
  const files = found?.data || [];

  const theme = {
    bg: "bg-gradient-to-br from-[#0a0a0d] via-[#0e0e14] to-[#050507]",
    card: "bg-[#101014] border border-[#303036]",
    textPrimary: "text-white",
    textSecondary: "text-[#a0a0a9]",
    accent: "text-[#A359FF]",
    hover: "hover:border-[#A359FF] hover:shadow-lg hover:shadow-[#A359FF]/10",
  };
const navLinkClasses ="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1";
  return (
    <div className={`${theme.bg} min-h-screen px-4 py-16`}>
      <div className="max-w-6xl mx-auto">

         <div className="mb-10">
        
        
          <header className="flex justify-between items-center pb-8 border-b border-[#303036] mb-10">
            <Link href="/" className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                <span className={`text-white bg-clip-text`}>ImmutableHub</span>
                
                <span className={`text-xl font-medium ${theme.textSecondary}`}>{decodedFolder}</span>
            </Link>
            
            <nav className="flex items-center space-x-6">
                 <a href={process.env.NEXT_PUBLIC_TOKEN_LINK} className={navLinkClasses}>Token</a>
                 <a className={navLinkClasses}>Docs</a>
                  <Link href="/dashboard" className="text-cyan-500 font-mono text-sm" >Dash</Link>
            </nav>

        </header>

         


          <p className={`mt-2 text-sm ${theme.textSecondary}`}>
             {files.length}
          </p>
        </div>





        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {files.length > 0 ? (
            files.map(file => (
              <Link
                key={file.cid}
                href={`/folders/${encodeURIComponent(folder)}/${file.cid}`}
                className={`${theme.card} rounded-xl p-4 ${theme.hover}`}
              >
                <h2 className="text-white font-semibold">
                  {file.name}
                </h2>
                <p className="text-xs text-gray-400 font-mono mt-2">
                  {file.cid.slice(0, 8)}…
                </p>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              Repo is empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
