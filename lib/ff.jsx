import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';

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

  // Parse the data structure to organize files into folders
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

  const getSyntaxHighlightedContent = (content, filename) => {
    if (!content) return <span className="text-gray-400">No content available</span>;

    // Simple syntax highlighting for common file types
    const lines = content.split('\n');
    
    return lines.map((line, idx) => {
      // Comments
      if (line.trim().startsWith('#') || line.trim().startsWith('//')) {
        return <div key={idx} className="text-green-400">{line}</div>;
      }
      
      // For JSON files, apply JSON-specific highlighting
      if (filename?.endsWith('.json')) {
        // Highlight JSON keys (property names in quotes)
        const parts = [];
        let lastIndex = 0;
        const keyRegex = /"([^"]+)":/g;
        let match;
        
        while ((match = keyRegex.exec(line)) !== null) {
          // Add text before the key
          if (match.index > lastIndex) {
            parts.push(<span key={`${idx}-${lastIndex}`}>{line.substring(lastIndex, match.index)}</span>);
          }
          // Add the key in cyan
          parts.push(<span key={`${idx}-key-${match.index}`} className="text-cyan-400">"{match[1]}"</span>);
          parts.push(<span key={`${idx}-colon-${match.index}`}>:</span>);
          lastIndex = match.index + match[0].length;
        }
        
        // Add remaining text
        if (lastIndex < line.length) {
          const remaining = line.substring(lastIndex);
          // Highlight string values
          if (remaining.includes('"')) {
            const stringRegex = /"([^"]*)"/g;
            const stringParts = [];
            let strLastIndex = 0;
            let strMatch;
            
            while ((strMatch = stringRegex.exec(remaining)) !== null) {
              if (strMatch.index > strLastIndex) {
                stringParts.push(remaining.substring(strLastIndex, strMatch.index));
              }
              stringParts.push(<span key={`${idx}-str-${strMatch.index}`} className="text-amber-300">"{strMatch[1]}"</span>);
              strLastIndex = strMatch.index + strMatch[0].length;
            }
            if (strLastIndex < remaining.length) {
              stringParts.push(remaining.substring(strLastIndex));
            }
            parts.push(<span key={`${idx}-rest`}>{stringParts}</span>);
          } else {
            // Highlight numbers
            const numRegex = /\b(\d+\.?\d*)\b/g;
            parts.push(<span key={`${idx}-rest`}>{remaining.replace(numRegex, (m) => m)}</span>);
          }
        }
        
        return <div key={idx}>{parts.length > 0 ? parts : line}</div>;
      }
      
      // Default: return plain text
      return <div key={idx} className="text-gray-100">{line}</div>;
    });
  };

  if (!data || !data.uploads || data.uploads.length === 0) {
    return (
      <div className="p-4 text-gray-400 bg-gray-900">
        No repository data available
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* File Tree Panel */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <div className="p-4 border-b border-gray-700 bg-gray-900">
          <h2 className="text-lg font-semibold text-gray-100">Repository</h2>
        </div>
        
        <div className="p-2">
          {/* Display folders */}
          {Object.keys(folders).map((folderName) => {
            const isExpanded = expandedFolders[folderName];
            const folderFiles = folders[folderName];
            
            return (
              <div key={folderName} className="mb-1">
                <button
                  onClick={() => toggleFolder(folderName)}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded-md transition-colors text-left"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                  <Folder className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-200 truncate">
                    {folderName}
                  </span>
                </button>
                
                {isExpanded && (
                  <div className="ml-6 mt-1 border-l-2 border-gray-700 pl-2">
                    {folderFiles.length > 0 ? (
                      folderFiles.map((file, fileIdx) => (
                        <button
                          key={fileIdx}
                          onClick={() => handleFileClick(file)}
                          className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded-md transition-colors text-left ${
                            selectedFile?.name === file.name ? 'bg-gray-700' : ''
                          }`}
                        >
                          <File className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-300 truncate">
                            {file.name}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-xs text-gray-500">Empty folder</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Display root files */}
          {rootFiles.map((item, itemIdx) => (
            <button
              key={itemIdx}
              onClick={() => handleFileClick(item)}
              className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded-md transition-colors text-left mb-1 ${
                selectedFile?.name === item.name ? 'bg-gray-700' : ''
              }`}
            >
              <File className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-300 truncate">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Display Panel */}
      <div className="flex-1 overflow-y-auto bg-gray-900">
        {selectedFile ? (
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                {selectedFile.name}
              </h3>
              <p className="text-xs text-gray-500 font-mono">
                CID: {selectedFile.cid}
              </p>
            </div>
            
            <div className="bg-gray-950 rounded-lg p-4 overflow-x-auto border border-gray-800">
              <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">
                {getSyntaxHighlightedContent(selectedFile.content, selectedFile.name)}
              </pre>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <File className="w-16 h-16 mx-auto mb-3 opacity-50" />
              <p>Select a file to view its content</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoExplorer