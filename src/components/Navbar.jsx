import React from 'react';
import { Keyboard, History, Globe, Clock, Type, ShieldAlert } from 'lucide-react';

export default function Navbar({ config, setConfig, activeView, setActiveView, historyCount, isTesting }) {
  const { modeType, modeValue, language } = config;

  const handleModeTypeChange = (type) => {
    const defaultValue = type === 'time' ? 30 : 25;
    setConfig(prev => ({
      ...prev,
      modeType: type,
      modeValue: defaultValue
    }));
  };

  const handleModeValueChange = (val) => {
    setConfig(prev => ({
      ...prev,
      modeValue: val
    }));
  };

  const handleLanguageChange = (lang) => {
    setConfig(prev => ({
      ...prev,
      language: lang
    }));
  };

  // Values arrays depending on mode
  const timeValues = [15, 30, 60, 120];
  const wordValues = [10, 25, 50, 100];
  const currentValues = modeType === 'time' ? timeValues : wordValues;

  return (
    <header className="w-full max-w-5xl mx-auto py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
      
      {/* Brand Logo */}
      <div 
        onClick={() => {
          setActiveView('test');
        }}
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <div className="w-8 h-8 rounded-lg bg-main/15 text-main flex items-center justify-center border border-main/20 group-hover:scale-105 transition-transform duration-200">
          <Keyboard size={18} className="group-hover:rotate-6 transition-transform" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono font-black text-xl tracking-tight text-txt">
            mengetixs<span className="text-main">.</span>
          </span>
        </div>
      </div>

      {/* Middle: Test Config Options (Only show in test view, hide when typing is in progress to avoid distraction) */}
      {activeView === 'test' && !isTesting && (
        <div className="glass flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-sub/10 text-xs text-sub font-mono animate-fadeIn">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 pr-2.5 border-r border-sub/20">
            <Globe size={13} className="text-sub/70" />
            <button 
              onClick={() => handleLanguageChange('english')} 
              className={`hover:text-txt transition-colors cursor-pointer ${language === 'english' ? 'text-main font-bold' : ''}`}
            >
              english
            </button>
            <span className="text-sub/30">/</span>
            <button 
              onClick={() => handleLanguageChange('indonesian')} 
              className={`hover:text-txt transition-colors cursor-pointer ${language === 'indonesian' ? 'text-main font-bold' : ''}`}
            >
              indonesia
            </button>
          </div>

          {/* Test Type Selector */}
          <div className="flex items-center gap-1.5 px-2 border-r border-sub/20">
            <button 
              onClick={() => handleModeTypeChange('time')}
              className={`flex items-center gap-1 hover:text-txt transition-colors cursor-pointer ${modeType === 'time' ? 'text-main font-bold' : ''}`}
            >
              <Clock size={12} />
              <span>waktu</span>
            </button>
            <span className="text-sub/30">/</span>
            <button 
              onClick={() => handleModeTypeChange('words')}
              className={`flex items-center gap-1 hover:text-txt transition-colors cursor-pointer ${modeType === 'words' ? 'text-main font-bold' : ''}`}
            >
              <Type size={12} />
              <span>kata</span>
            </button>
          </div>

          {/* Value Config Selectors */}
          <div className="flex items-center gap-2 pl-2">
            {currentValues.map((val) => (
              <button
                key={val}
                onClick={() => handleModeValueChange(val)}
                className={`hover:text-txt transition-all cursor-pointer ${modeValue === val ? 'text-main font-bold scale-105' : ''}`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Right: Navigation Controls */}
      <div className="flex items-center gap-1.5 font-mono text-xs">
        <button
          onClick={() => setActiveView('test')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
            activeView === 'test'
              ? 'border-main bg-main/5 text-main font-semibold'
              : 'border-transparent text-sub hover:text-txt hover:bg-sub/5'
          }`}
        >
          <Keyboard size={14} />
          <span>Mulai Tes</span>
        </button>

        <button
          onClick={() => setActiveView('history')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer relative ${
            activeView === 'history'
              ? 'border-main bg-main/5 text-main font-semibold'
              : 'border-transparent text-sub hover:text-txt hover:bg-sub/5'
          }`}
        >
          <History size={14} />
          <span>Riwayat</span>
          {historyCount > 0 && (
            <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 text-[8px] font-bold bg-main text-bg rounded-full border border-bg">
              {historyCount}
            </span>
          )}
        </button>
      </div>

    </header>
  );
}
