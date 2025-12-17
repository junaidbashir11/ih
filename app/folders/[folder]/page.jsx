"use client";

import { use } from "react";
import Link from "next/link";
import { useRepoData } from "@/lib/useRepoData";

export default function FolderDetail({ params }) {
  const { folder } = use(params);
  const { uploads, loading } = useRepoData();

  const decodedFolder = decodeURIComponent(folder);

  if (loading) {
    return <div className="bg-black-500">Loading…</div>;
  }

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

  return (
    <div className={`${theme.bg} min-h-screen px-4 py-16`}>
      <div className="max-w-6xl mx-auto">

        <header className="mb-10 border-b border-[#303036] pb-6">
          <h1 className="text-3xl font-bold text-white">
            {decodedFolder}
          </h1>
          <p className={theme.textSecondary}>
            {files.length} objects
          </p>
        </header>

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
              Folder is empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
