import React from 'react';
import { Palette, Check } from 'lucide-react';

export const THEMES = [
  { id: 'carbon', name: 'carbon', colors: { bg: '#2f343f', main: '#e2b714', text: '#d1d0c5' } },
  { id: 'terminal', name: 'terminal', colors: { bg: '#111111', main: '#15ff00', text: '#e0ffe0' } },
  { id: 'sakura', name: 'sakura', colors: { bg: '#f5e6e8', main: '#e86f88', text: '#5e4b50' } },
  { id: 'nord', name: 'nord', colors: { bg: '#2e3440', main: '#88c0d0', text: '#d8dee9' } },
  { id: 'cyberpunk', name: 'cyberpunk', colors: { bg: '#181824', main: '#ff2a74', text: '#00f0ff' } },
  { id: 'laserwave', name: 'laserwave', colors: { bg: '#1b103c', main: '#ffe261', text: '#b388ff' } }
];

export default function ThemeSelector({ activeTheme, setTheme, inline = false }) {
  if (inline) {
    return (
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all duration-200 border cursor-pointer ${
              activeTheme === theme.id
                ? 'border-main text-main bg-main/10 font-semibold shadow-xs'
                : 'border-transparent text-sub hover:text-txt hover:bg-sub/10'
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
              style={{ backgroundColor: theme.colors.main }}
            />
            <span>{theme.name}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs text-sub hover:text-txt hover:bg-sub/10 transition-all border border-sub/20 cursor-pointer">
        <Palette size={14} />
        <span className="capitalize">Theme: {activeTheme}</span>
      </button>
      
      {/* Dropdown panel */}
      <div className="absolute bottom-full right-0 mb-2 w-48 glass rounded-lg shadow-xl border border-sub/20 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 p-2 flex flex-col gap-1">
        <div className="text-[10px] uppercase font-bold text-sub px-2 py-1 mb-1 tracking-wider border-b border-sub/10">Select Theme</div>
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={`flex items-center justify-between w-full px-2 py-1.5 rounded text-xs text-left transition-all cursor-pointer ${
              activeTheme === theme.id
                ? 'bg-main/15 text-main font-semibold'
                : 'text-sub hover:text-txt hover:bg-sub/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: theme.colors.bg }} />
                <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: theme.colors.main }} />
                <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: theme.colors.text }} />
              </div>
              <span className="capitalize">{theme.name}</span>
            </div>
            {activeTheme === theme.id && <Check size={12} />}
          </button>
        ))}
      </div>
    </div>
  );
}
