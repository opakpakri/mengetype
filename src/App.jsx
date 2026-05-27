import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TypingTest from './components/TypingTest';
import Results from './components/Results';
import StatsHistory from './components/StatsHistory';

import ClickSpark from './components/ClickSpark';
import { Monitor } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('mengetype-theme') || 'carbon';
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('mengetype-sound');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('mengetype-config');
    return saved ? JSON.parse(saved) : { modeType: 'time', modeValue: 30, language: 'indonesian' };
  });

  const [activeView, setActiveView] = useState('test');

  const [testStats, setTestStats] = useState(null);

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('mengetype-history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mengetype-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('mengetype-sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('mengetype-config', JSON.stringify(config));
  }, [config]);

  const handleTestComplete = (stats) => {
    setTestStats(stats);

    const newRecord = {
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      wpm: stats.wpm,
      rawWpm: stats.rawWpm,
      accuracy: stats.accuracy,
      modeType: config.modeType,
      modeValue: config.modeValue,
      language: config.language
    };

    const nextHistory = [...history, newRecord];
    setHistory(nextHistory);
    localStorage.setItem('mengetype-history', JSON.stringify(nextHistory));
    setActiveView('results');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('mengetype-history');
  };

  const handleRestart = () => {
    setTestStats(null);
    setActiveView('test');
  };

  return (
    <ClickSpark
      sparkColor="var(--main-color)"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={8}
      duration={400}
    >
      {/* Mobile Blocker Screen */}
      <div className="md:hidden flex flex-col items-center justify-center p-6 text-center select-none font-mono flex-1 my-auto animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-main/10 text-main flex items-center justify-center border border-main/20 mb-6 animate-bounce">
          <Monitor size={32} />
        </div>
        <h1 className="font-bold text-2xl text-txt mb-3">
          {config.language === 'indonesian' ? 'Akses Mobile Ditutup' : 'Mobile Access Unavailable'}
        </h1>
        <p className="text-sm text-sub max-w-xs leading-relaxed mb-6">
          {config.language === 'indonesian' 
            ? 'Mohon maaf atas ketidaknyamanannya. Untuk saat ini Mengetype hanya dapat diakses melalui komputer atau laptop agar Anda mendapatkan pengalaman mengetik yang maksimal.' 
            : 'We apologize for the inconvenience. For now, Mengetype can only be accessed using a computer or laptop to ensure you get the best typing experience.'}
        </p>
        <div className="text-[11px] tracking-wider text-main/80 border border-main/20 px-3.5 py-2 rounded-lg bg-main/5 font-semibold uppercase">
          {config.language === 'indonesian' ? 'Gunakan PC / Laptop' : 'Use PC / Laptop'}
        </div>
      </div>

      {/* Main Desktop Layout */}
      <div className="hidden md:flex flex-col flex-1">
        <Navbar
          config={config}
          setConfig={setConfig}
          activeView={activeView}
          setActiveView={(view) => {
            setActiveView(view);
            if (view === 'test') handleRestart();
          }}
          historyCount={history.length}
          isTesting={activeView === 'test' && testStats === null && false}
        />

        <main className="flex-1 flex items-center justify-center py-8 md:py-12">
          {activeView === 'test' && (
            <TypingTest
              config={config}
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
              onTestComplete={handleTestComplete}
            />
          )}

          {activeView === 'results' && testStats && (
            <Results
              stats={testStats}
              onRestart={handleRestart}
              activeTheme={theme}
              language={config.language}
            />
          )}

          {activeView === 'history' && (
            <StatsHistory
              history={history}
              clearHistory={clearHistory}
              onClose={handleRestart}
              language={config.language}
            />
          )}
        </main>

        <Footer activeTheme={theme} setTheme={setTheme} language={config.language} />
      </div>
    </ClickSpark>
  );
}

export default App;
