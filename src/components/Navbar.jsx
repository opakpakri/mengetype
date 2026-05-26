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

  // Nav buttons markup to reuse for desktop & mobile
  const renderNavControls = (isMobile = false) => (
    <div className={`flex items-center gap-1.5 sm:gap-2 font-mono ${isMobile ? 'text-[11px] sm:text-xs' : 'text-sm'}`}>
      <button
        onClick={() => setActiveView('test')}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg border transition-all cursor-pointer ${
          activeView === 'test'
            ? 'border-main bg-main/5 text-main font-semibold'
            : 'border-transparent text-sub hover:text-txt hover:bg-sub/5'
        }`}
      >
        <Keyboard size={isMobile ? 14 : 16} />
        <span>{t.navStartTest}</span>
      </button>

      <button
        onClick={() => setActiveView('history')}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg border transition-all cursor-pointer relative ${
          activeView === 'history'
            ? 'border-main bg-main/5 text-main font-semibold'
            : 'border-transparent text-sub hover:text-txt hover:bg-sub/5'
        }`}
      >
        <History size={isMobile ? 14 : 16} />
        <span>{t.navHistory}</span>
        {historyCount > 0 && (
          <span className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[8px] sm:text-[9px] font-bold bg-main text-bg rounded-full border border-bg">
            {historyCount}
          </span>
        )}
      </button>
    </div>
  );

  return (
    <header className="w-full max-w-6xl mx-auto py-5 md:py-7 px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-4 select-none">
      
      {/* Top Row: Brand & Mobile Nav Controls */}
      <div className="flex w-full md:w-auto items-center justify-between">
        <div 
          onClick={() => setActiveView('test')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-main/15 text-main flex items-center justify-center border border-main/20 group-hover:scale-105 transition-transform duration-200">
            <Keyboard size={20} className="group-hover:rotate-6 transition-transform" />
          </div>
          <span className="font-mono font-black text-xl sm:text-2xl tracking-tight text-txt">
            mengetixs<span className="text-main">.</span>
          </span>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden">
          {renderNavControls(true)}
        </div>
      </div>

      {/* Middle: Test Config Options (Only show in test view, hide when typing is in progress to avoid distraction) */}
      {activeView === 'test' && !isTesting && (
        <div className="w-full md:w-auto flex justify-center animate-fadeIn">
          <div className="glass flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-sub/10 text-xs sm:text-sm text-sub font-mono">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 sm:gap-2 pr-2 sm:pr-3.5 border-r border-sub/20">
              <Globe size={14} className="hidden sm:inline text-sub/70" />
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
            <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2.5 border-r border-sub/20">
              <button 
                onClick={() => handleModeTypeChange('time')}
                className={`flex items-center gap-1 hover:text-txt transition-colors cursor-pointer ${modeType === 'time' ? 'text-main font-bold' : ''}`}
              >
                <Clock size={13} className="hidden xs:inline" />
                <span>{t.navTimeMode}</span>
              </button>
              <span className="text-sub/30">/</span>
              <button 
                onClick={() => handleModeTypeChange('words')}
                className={`flex items-center gap-1 hover:text-txt transition-colors cursor-pointer ${modeType === 'words' ? 'text-main font-bold' : ''}`}
              >
                <Type size={13} className="hidden xs:inline" />
                <span>{t.navWordMode}</span>
              </button>
            </div>

            {/* Value Config Selectors */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 pl-1.5 sm:pl-2.5">
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
        </div>
      )}

      {/* Right: Navigation Controls (Desktop) */}
      <div className="hidden md:flex">
        {renderNavControls(false)}
      </div>

    </header>
  );
}
