import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TypingTest from './components/TypingTest';
import Results from './components/Results';
import StatsHistory from './components/StatsHistory';

import ClickSpark from './components/ClickSpark';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('mengetixs-theme') || 'carbon';
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('mengetixs-sound');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('mengetixs-config');
    return saved ? JSON.parse(saved) : { modeType: 'time', modeValue: 30, language: 'indonesian' };
  });

  const [activeView, setActiveView] = useState('test');

  const [testStats, setTestStats] = useState(null);

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('mengetixs-history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mengetixs-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('mengetixs-sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('mengetixs-config', JSON.stringify(config));
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
    localStorage.setItem('mengetixs-history', JSON.stringify(nextHistory));
    setActiveView('results');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('mengetixs-history');
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
    </ClickSpark>
  );
}

export default App;
