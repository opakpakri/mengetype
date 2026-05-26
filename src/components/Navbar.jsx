import React from 'react';
import { Keyboard, History, Globe, Clock, Type, ShieldAlert } from 'lucide-react';
import { useTranslation } from '../utils/i18n';

export default function Navbar({ config, setConfig, activeView, setActiveView, historyCount, isTesting }) {
  const { modeType, modeValue, language } = config;
  const t = useTranslation(language);

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
    <header className="w-full max-w-6xl mx-auto py-7 px-4 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
      
      {/* Brand Logo */}
      <div 
        onClick={() => {
          setActiveView('test');
        }}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-lg bg-main/15 text-main flex items-center justify-center border border-main/20 group-hover:scale-105 transition-transform duration-200">
          <Keyboard size={22} className="group-hover:rotate-6 transition-transform" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono font-black text-2xl tracking-tight text-txt">
            mengetixs<span className="text-main">.</span>
          </span>
        </div>
      </div>

      {/* Middle: Test Config Options (Only show in test view, hide when typing is in progress to avoid distraction) */}
      {activeView === 'test' && !isTesting && (
        <div className="glass flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-sub/10 text-sm text-sub font-mono animate-fadeIn">
          {/* Language Selector */}
          <div className="flex items-center gap-2 pr-3.5 border-r border-sub/20">
            <Globe size={15} className="text-sub/70" />
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
          <div className="flex items-center gap-2 px-2.5 border-r border-sub/20">
            <button 
              onClick={() => handleModeTypeChange('time')}
              className={`flex items-center gap-1.5 hover:text-txt transition-colors cursor-pointer ${modeType === 'time' ? 'text-main font-bold' : ''}`}
            >
              <Clock size={14} />
              <span>{t.navTimeMode}</span>
            </button>
            <span className="text-sub/30">/</span>
            <button 
              onClick={() => handleModeTypeChange('words')}
              className={`flex items-center gap-1.5 hover:text-txt transition-colors cursor-pointer ${modeType === 'words' ? 'text-main font-bold' : ''}`}
            >
              <Type size={14} />
              <span>{t.navWordMode}</span>
            </button>
          </div>

          {/* Value Config Selectors */}
          <div className="flex items-center gap-2.5 pl-2.5">
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
      <div className="flex items-center gap-2 font-mono text-sm">
        <button
          onClick={() => setActiveView('test')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${
            activeView === 'test'
              ? 'border-main bg-main/5 text-main font-semibold'
              : 'border-transparent text-sub hover:text-txt hover:bg-sub/5'
          }`}
        >
          <Keyboard size={16} />
          <span>{t.navStartTest}</span>
        </button>

        <button
          onClick={() => setActiveView('history')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border transition-all cursor-pointer relative ${
            activeView === 'history'
              ? 'border-main bg-main/5 text-main font-semibold'
              : 'border-transparent text-sub hover:text-txt hover:bg-sub/5'
          }`}
        >
          <History size={16} />
          <span>{t.navHistory}</span>
          {historyCount > 0 && (
            <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 text-[9px] font-bold bg-main text-bg rounded-full border border-bg">
              {historyCount}
            </span>
          )}
        </button>
      </div>

    </header>
  );
}
