import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TypingTest from './components/TypingTest';
import Results from './components/Results';
import StatsHistory from './components/StatsHistory';

function App() {
  // 1. Theme configuration state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('mengetixs-theme') || 'carbon';
  });

  // 2. Sound state (mechanical key clicks)
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('mengetixs-sound');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // 3. Test parameter config
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('mengetixs-config');
    return saved ? JSON.parse(saved) : { modeType: 'time', modeValue: 30, language: 'indonesian' };
  });

  // 4. View states: 'test', 'results', 'history'
  const [activeView, setActiveView] = useState('test');
  
  // 5. Active test stats
  const [testStats, setTestStats] = useState(null);

  // 6. Running logs history
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('mengetixs-history');
    return saved ? JSON.parse(saved) : [];
  });

  // Apply theme class attributes on HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mengetixs-theme', theme);
  }, [theme]);

  // Sync sound settings
  useEffect(() => {
    localStorage.setItem('mengetixs-sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Sync config parameters
  useEffect(() => {
    localStorage.setItem('mengetixs-config', JSON.stringify(config));
  }, [config]);

  // Save typing test records and swap viewport to Results
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

  // Clear history database
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('mengetixs-history');
  };

  // Trigger test reboot
  const handleRestart = () => {
    setTestStats(null);
    setActiveView('test');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 px-4 md:px-8">
      {/* Navigation Header */}
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

      {/* Main Content Router */}
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

      {/* Footer Branding & Quick Palette Toggles */}
      <Footer activeTheme={theme} setTheme={setTheme} language={config.language} />
    </div>
  );
}

export default App;
