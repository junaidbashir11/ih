import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, Code, Hash, X } from 'lucide-react';

// The provided Tailwind theme object
const ImmutableThemeTailwind = {
    bgDark: 'bg-[#0a0a0d]',
    bgSidebar: 'bg-[#101014]',
    bgContent: 'bg-[#18181c]',
    textPrimary: 'text-white',
    textSecondary: 'text-[#a0a0a9]',
    textAccent: 'text-[#A359FF]', // Vibrant Purple
    border: 'border-[#303036]',
    hoverBg: 'hover:bg-[#2a2a33]',
    activeBg: 'bg-[#2a2a33]',
};

// Helper function to get the appropriate text color for file type
const getFileIconColor = (filename) => {
    if (filename.endsWith('.json')) return 'text-amber-400';
    if (filename.endsWith('.js') || filename.endsWith('.ts') || filename.endsWith('.jsx') || filename.endsWith('.tsx')) return 'text-yellow-400';
    if (filename.endsWith('.css') || filename.endsWith('.scss')) return 'text-blue-400';
    if (filename.endsWith('.html') || filename.endsWith('.md')) return 'text-red-400';
    if (filename.endsWith('.txt')) return 'text-gray-400';
    if (filename.endsWith('.py')) return 'text-amber-500';
    return ImmutableThemeTailwind.textSecondary;
};

// Helper function to get the Lucide icon
const getFileIcon = (filename) => {
    if (filename.endsWith('.json')) return Hash;
    if (filename.endsWith('.js') || filename.endsWith('.ts') || filename.endsWith('.jsx') || filename.endsWith('.tsx')) return Code;
    return File;
};


const RepoExplorer = ({ data }) => {
    const [expandedFolders, setExpandedFolders] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    const toggleFolder = (folderName) => {
        setExpandedFolders(prev => ({
            ...prev,
            [folderName]: !prev[folderName]
        }));
    };

    const handleFileClick = (file) => {
        setSelectedFile(file);
    };
    
    // New handler to close the file content
    const handleCloseFile = () => {
        setSelectedFile(null);
    };

    const organizeFiles = () => {
        if (!data || !data.uploads || data.uploads.length === 0) {
            return { rootFiles: [], folders: {} };
        }

        const rootFiles = [];
        const folders = {};

        data.uploads.forEach(upload => {
            if (!upload.data) return;

            // Check if the upload has a folder key
            if (upload.folder) {
                // All files in this upload belong to this folder
                if (!folders[upload.folder]) {
                    folders[upload.folder] = [];
                }
                folders[upload.folder].push(...upload.data);
            } else {
                // Files without a folder go to root
                rootFiles.push(...upload.data);
            }
        });

        return { rootFiles, folders };
    };

    const { rootFiles, folders } = organizeFiles();

    // Enhanced Syntax Highlighting for the ImmutableHub theme (Retained logic)
    const getSyntaxHighlightedContent = (content, filename) => {
        if (!content) return <span className={ImmutableThemeTailwind.textSecondary}>// No content uploaded for this file.</span>;

        const lines = content.split('\n');
        
        return lines.map((line, idx) => {
            const isComment = line.trim().startsWith('#') || line.trim().startsWith('//');
            
            if (isComment) {
                // Comments in Green
                return <div key={idx} className="text-green-400">{line}</div>;
            }
            
            // JSON Highlighting 
            if (filename?.endsWith('.json')) {
                const parts = [];
                let lastIndex = 0;
                const keyRegex = /"([^"]+)":/g; 
                let match;
                
                while ((match = keyRegex.exec(line)) !== null) {
                    // Text before the key
                    if (match.index > lastIndex) {
                        parts.push(<span key={`${idx}-${lastIndex}`} className="text-gray-100">{line.substring(lastIndex, match.index)}</span>);
                    }
                    // Key in Cyan/Teal
                    parts.push(<span key={`${idx}-key-${match.index}`} className="text-cyan-400">"{match[1]}"</span>);
                    parts.push(<span key={`${idx}-colon-${match.index}`} className="text-gray-100">:</span>);
                    lastIndex = match.index + match[0].length;
                }
                
                // Process remaining text (for values)
                if (lastIndex < line.length) {
                    const remaining = line.substring(lastIndex);
                    const stringRegex = /"([^"]*)"/g;
                    const numRegex = /\b(\d+\.?\d*)\b/g;

                    let processedRemaining = remaining;
                    
                    // Highlight string values in Amber
                    processedRemaining = processedRemaining.replace(stringRegex, (m, content) => {
                        // Use a marker class and then replace later or use dangerouslySetInnerHTML
                        // Sticking to basic string replacement for brevity, but note this is fragile without a proper AST/Highlighter
                        return `<span class="text-amber-300">${content}</span>`;
                    });

                    // Highlight numbers in Purple
                    processedRemaining = processedRemaining.replace(numRegex, (m) => {
                        return `<span class="text-purple-400">${m}</span>`;
                    });

                    // General punctuation/literals in White
                    parts.push(<span key={`${idx}-rest`} className="text-gray-100" dangerouslySetInnerHTML={{ __html: processedRemaining }} />);
                }
                
                return <div key={idx} className="text-gray-100">{parts.length > 0 ? parts : line}</div>;
            }
            
            // Default: return plain text in primary color
            return <div key={idx} className="text-gray-100">{line}</div>;
        });
    };

    // Render logic with new styles and close button
    if (!data || !data.uploads || data.uploads.length === 0) {
        return (
            <div className={`p-6 ${ImmutableThemeTailwind.textSecondary} ${ImmutableThemeTailwind.bgContent} rounded-xl shadow-lg ${ImmutableThemeTailwind.border} border`}>
                No files found
            </div>
        );
    }

    return (
        <div className={`flex h-[70vh] border ${ImmutableThemeTailwind.border} rounded-xl overflow-hidden shadow-2xl`}>
            
            {/* 1. File Tree Panel (Sidebar) */}
            <div className={`w-80 ${ImmutableThemeTailwind.bgSidebar} border-r ${ImmutableThemeTailwind.border} overflow-y-auto flex-shrink-0`}>
                <div className={`p-4 border-b ${ImmutableThemeTailwind.border} ${ImmutableThemeTailwind.bgSidebar} sticky top-0 z-10`}>
                    <h2 className={`text-lg font-bold ${ImmutableThemeTailwind.textPrimary} flex items-center gap-2`}>
                        <Folder className="w-5 h-5" style={{ color: ImmutableThemeTailwind.textAccent.replace('text-', '#') }}/> 
                        <span className={ImmutableThemeTailwind.textAccent}>ihub clone</span> [reponame]
                    </h2>
                </div>
                
                <div className="p-3">
                    {/* Folders */}
                    {Object.keys(folders).map((folderName) => {
                        const isExpanded = expandedFolders[folderName];
                        const folderFiles = folders[folderName];
                        
                        return (
                            <div key={folderName} className="mb-1">
                                <button
                                    onClick={() => toggleFolder(folderName)}
                                    className={`w-full flex items-center gap-2 px-3 py-2 ${ImmutableThemeTailwind.hoverBg} rounded-lg transition-colors text-left`}
                                >
                                    {isExpanded ? (
                                        <ChevronDown className={`w-4 h-4 ${ImmutableThemeTailwind.textAccent} flex-shrink-0`} />
                                    ) : (
                                        <ChevronRight className={`w-4 h-4 ${ImmutableThemeTailwind.textSecondary} flex-shrink-0`} />
                                    )}
                                    <Folder className={`w-4 h-4 ${ImmutableThemeTailwind.textAccent} flex-shrink-0`} />
                                    <span className={`text-sm font-medium ${ImmutableThemeTailwind.textPrimary} truncate`}>
                                        {folderName}
                                    </span>
                                </button>
                                
                                {isExpanded && (
                                    <div className={`ml-6 mt-1 border-l-2 border-dashed ${ImmutableThemeTailwind.border} pl-2`}>
                                        {folderFiles.length > 0 ? (
                                            folderFiles.map((file, fileIdx) => {
                                                const FileIcon = getFileIcon(file.name);
                                                const isSelected = selectedFile?.name === file.name;
                                                return (
                                                    <button
                                                        key={fileIdx}
                                                        onClick={() => handleFileClick(file)}
                                                        className={`w-full flex items-center gap-2 px-3 py-2 ${ImmutableThemeTailwind.hoverBg} rounded-lg transition-colors text-left mb-0.5
                                                          ${isSelected ? `${ImmutableThemeTailwind.activeBg} ring-1 ring-offset-2 ring-offset-[#101014] ring-[#A359FF] text-white` : ''}
                                                        `}
                                                    >
                                                        <FileIcon className={`w-4 h-4 ${getFileIconColor(file.name)} flex-shrink-0`} />
                                                        <span className={`text-sm ${isSelected ? 'text-white font-medium' : ImmutableThemeTailwind.textSecondary} truncate`}>
                                                            {file.name}
                                                        </span>
                                                    </button>
                                                );
                                            })
                                        ) : (
                                            <div className="px-3 py-2 text-xs text-gray-500">Empty folder</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Root files */}
                    {rootFiles.map((item, itemIdx) => {
                        const FileIcon = getFileIcon(item.name);
                        const isSelected = selectedFile?.name === item.name;
                        return (
                            <button
                                key={itemIdx}
                                onClick={() => handleFileClick(item)}
                                className={`w-full flex items-center gap-2 px-3 py-2 ${ImmutableThemeTailwind.hoverBg} rounded-lg transition-colors text-left mb-1 
                                  ${isSelected ? `${ImmutableThemeTailwind.activeBg} ring-1 ring-offset-2 ring-offset-[#101014] ring-[#A359FF] text-white` : ''}
                                `}
                            >
                                <FileIcon className={`w-4 h-4 ${getFileIconColor(item.name)} flex-shrink-0`} />
                                <span className={`text-sm ${isSelected ? 'text-white font-medium' : ImmutableThemeTailwind.textSecondary} truncate`}>
                                    {item.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 2. Content Display Panel (Editor Area) */}
            <div className={`flex-1 overflow-y-auto ${ImmutableThemeTailwind.bgContent}`}>
                {selectedFile ? (
                    <div className="flex flex-col h-full">
                        {/* Header/Tab Bar with Close Button */}
                        <div className={`flex justify-between items-center px-6 py-3 border-b ${ImmutableThemeTailwind.border} ${ImmutableThemeTailwind.bgContent} sticky top-0 z-20`}>
                            <h3 className={`text-lg font-semibold ${ImmutableThemeTailwind.textPrimary} flex items-center gap-3`}>
                                <File className={`w-5 h-5 ${getFileIconColor(selectedFile.name)}`} />
                                {selectedFile.name}
                            </h3>
                            <button 
                                onClick={handleCloseFile}
                                className={`p-1 rounded-full ${ImmutableThemeTailwind.hoverBg} transition-colors`}
                            >
                                <X className={`w-5 h-5 ${ImmutableThemeTailwind.textSecondary}`} />
                            </button>
                        </div>
                        
                        {/* File Details and Content */}
                        <div className="p-6 flex-1 overflow-y-auto">
                           

                            {/* Code Block with Elevated Border/Glow */}
                            <div className={`bg-black/40 rounded-xl p-5 overflow-x-auto border-2 border-transparent transition-all duration-300 hover:border-[#A359FF]/50 shadow-inner shadow-[#A359FF]/10`}>
                                <pre className="text-sm font-mono whitespace-pre-wrap">
                                    {getSyntaxHighlightedContent(selectedFile.content, selectedFile.name)}
                                </pre>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`flex items-center justify-center h-full ${ImmutableThemeTailwind.textSecondary} p-6`}>
                    <h1 className="text-2xl md:text-2xl font-bold tracking-tight leading-none mb-6">
                    
                    <span className="text-purple-400 opacity-70">// █ </span> 
                    <p className="text-white">Immutable  &  Decentralized  </p>
                    <span className="text-fuchsia-400 opacity-70">::</span>
                    <span className="block mt-2">
                        <span className="text-fuchsia-400 opacity-70">{'{'}</span>
                        <span className="ml-4 text-white">Code</span>
                        <span className="text-fuchsia-400 opacity-70">{'}'}</span>
                        <span className="text-purple-400 opacity-70 ml-2">▒</span>
                    </span>
                </h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RepoExplorer;