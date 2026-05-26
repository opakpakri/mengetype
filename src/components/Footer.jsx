import React from 'react';
import ThemeSelector from './ThemeSelector';
import { Globe, Code, Shield } from 'lucide-react';

export default function Footer({ activeTheme, setTheme }) {
  return (
    <footer className="w-full max-w-5xl mx-auto py-8 px-4 mt-auto border-t border-sub/10 flex flex-col md:flex-row items-center justify-between gap-6 select-none text-xs text-sub font-mono">
      
      {/* Credits / Info */}
      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-txt transition-colors"
        >
          <Globe size={14} />
          <span>github</span>
        </a>
        <span className="hidden sm:inline text-sub/20">|</span>
        <div className="flex items-center gap-1.5">
          <Code size={14} />
          <span>dibuat dengan React & Tailwind v4</span>
        </div>
      </div>

      {/* Theme Selection Inline */}
      <div className="flex items-center gap-3">
        <ThemeSelector activeTheme={activeTheme} setTheme={setTheme} inline={true} />
      </div>

    </footer>
  );
}
