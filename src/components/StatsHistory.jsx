import React from 'react';
import { Trash2, Calendar, Award, Zap, Percent, Clock, X } from 'lucide-react';
import { useTranslation } from '../utils/i18n';

export default function StatsHistory({ history = [], clearHistory, onClose, language = 'english' }) {
  const t = useTranslation(language);

  const formatDate = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch (e) {
      return 'Unknown date';
    }
  };

  const getBestWpm = () => {
    if (history.length === 0) return 0;
    return Math.max(...history.map(item => item.wpm || 0));
  };

  const getAverageWpm = () => {
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, curr) => acc + (curr.wpm || 0), 0);
    return Math.round(sum / history.length);
  };

  const getAverageAccuracy = () => {
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, curr) => acc + (curr.accuracy || 0), 0);
    return Math.round(sum / history.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 animate-fadeIn">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-txt flex items-center gap-2">
            <Award className="text-main" />
            <span>{t.historyTitle}</span>
          </h2>
          <p className="text-sm text-sub mt-1">{t.historySub}</p>
        </div>
        
        <div className="flex gap-2">
          {history.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Apakah Anda yakin ingin menghapus semua riwayat tes?")) {
                  clearHistory();
                }
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs text-err bg-err/10 hover:bg-err/20 border border-err/20 transition-all cursor-pointer font-medium"
            >
              <Trash2 size={14} />
              <span>{t.clearHistory}</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs text-sub hover:text-txt hover:bg-sub/10 border border-sub/20 transition-all cursor-pointer font-medium"
          >
            <X size={14} />
            <span>{t.backToTest}</span>
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center border border-sub/10 max-w-lg mx-auto">
          <Clock size={48} className="mx-auto text-sub mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-txt mb-2">{t.noHistory}</h3>
          <p className="text-sm text-sub leading-relaxed mb-6">
            {t.noHistorySub}
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-main text-bg font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            {t.startTest}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass rounded-xl p-4 border border-sub/10 flex items-center justify-between">
              <div>
                <div className="text-xs text-sub uppercase tracking-wider font-semibold">{t.highestWpm}</div>
                <div className="text-3xl font-bold text-main mt-1 font-mono">{getBestWpm()}</div>
              </div>
              <div className="p-3 bg-main/10 rounded-lg text-main">
                <Award size={24} />
              </div>
            </div>
            
            <div className="glass rounded-xl p-4 border border-sub/10 flex items-center justify-between">
              <div>
                <div className="text-xs text-sub uppercase tracking-wider font-semibold">{t.avgWpm}</div>
                <div className="text-3xl font-bold text-txt mt-1 font-mono">{getAverageWpm()}</div>
              </div>
              <div className="p-3 bg-sub/10 rounded-lg text-sub">
                <Zap size={24} />
              </div>
            </div>

            <div className="glass rounded-xl p-4 border border-sub/10 flex items-center justify-between">
              <div>
                <div className="text-xs text-sub uppercase tracking-wider font-semibold">{t.avgAccuracy}</div>
                <div className="text-3xl font-bold text-txt mt-1 font-mono">{getAverageAccuracy()}%</div>
              </div>
              <div className="p-3 bg-sub/10 rounded-lg text-sub">
                <Percent size={24} />
              </div>
            </div>
          </div>

          {/* History List */}
          <div className="glass rounded-xl border border-sub/10 overflow-hidden">
            <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-bg z-10 border-b border-sub/10">
                  <tr className="text-sub text-xs uppercase tracking-wider font-semibold bg-black/20">
                    <th className="py-3.5 px-4 sm:px-6">{t.dateLabel}</th>
                    <th className="py-3.5 px-4 text-center">{t.wpm}</th>
                    <th className="py-3.5 px-4 text-center">{t.accuracy}</th>
                    <th className="py-3.5 px-4 text-center">{t.rawWpm}</th>
                    <th className="py-3.5 px-4 text-center">{t.modeLabel}</th>
                    <th className="py-3.5 px-4 text-center">{t.languageLabel}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sub/10 font-mono text-sm">
                  {history.slice().reverse().map((item, index) => (
                    <tr 
                      key={item.id || index} 
                      className="hover:bg-sub/5 transition-colors text-txt"
                    >
                      <td className="py-3.5 px-4 sm:px-6 text-sub font-sans flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{formatDate(item.timestamp)}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-main">{item.wpm}</td>
                      <td className="py-3.5 px-4 text-center">{item.accuracy}%</td>
                      <td className="py-3.5 px-4 text-center text-sub">{item.rawWpm || item.wpm}</td>
                      <td className="py-3.5 px-4 text-center text-sub capitalize font-sans text-xs">
                        {item.modeType === 'time' ? `Waktu (${item.modeValue}s)` : `Kata (${item.modeValue})`}
                      </td>
                      <td className="py-3.5 px-4 text-center text-sub capitalize font-sans text-xs">
                        {item.language === 'indonesian' ? 'Indonesia' : 'English'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
