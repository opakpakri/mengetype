import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, Award, Flame, ThumbsUp, Calendar } from 'lucide-react';
import { useTranslation } from '../utils/i18n';

export default function Results({ stats, onRestart, activeTheme, language = 'english' }) {
  const t = useTranslation(language);
  const {
    wpm,
    rawWpm,
    accuracy,
    correctChars,
    incorrectChars,
    extraChars,
    missedChars,
    timeSpent,
    wpmOverTime = []
  } = stats;

  const [hoveredPoint, setHoveredPoint] = useState(null);

  const chartWidth = 700;
  const chartHeight = 200;
  const padding = { top: 20, right: 30, bottom: 30, left: 40 };

  const chartData = wpmOverTime.length > 0 ? wpmOverTime : [
    { second: 0, wpm: 0, rawWpm: 0, errors: 0 },
    { second: timeSpent, wpm: wpm, rawWpm: rawWpm, errors: incorrectChars }
  ];

  const maxX = chartData[chartData.length - 1].second;
  const maxY = Math.max(
    60,
    ...chartData.map(d => Math.max(d.wpm || 0, d.rawWpm || 0))
  ) + 10;

  const getX = (sec) => {
    const range = maxX || 1;
    return padding.left + (sec / range) * (chartWidth - padding.left - padding.right);
  };

  const getY = (val) => {
    return chartHeight - padding.bottom - (val / maxY) * (chartHeight - padding.top - padding.bottom);
  };

  const wpmPoints = chartData.map(d => `${getX(d.second)},${getY(d.wpm)}`).join(' ');
  const rawWpmPoints = chartData.map(d => `${getX(d.second)},${getY(d.rawWpm)}`).join(' ');

  const areaPath = chartData.length > 0
    ? `M ${getX(0)},${getY(0)} ` +
    chartData.map(d => `L ${getX(d.second)},${getY(d.wpm)}`).join(' ') +
    ` L ${getX(maxX)},${getY(0)} Z`
    : '';

  const gridLines = [];
  const gridCount = 4;
  for (let i = 1; i <= gridCount; i++) {
    gridLines.push(Math.round((maxY / gridCount) * i));
  }

  const getFeedbackMessage = () => {
    if (wpm >= 90) return { title: t.bestWpmMsg, text: t.bestWpmSub, icon: <Flame className="text-main" size={24} /> };
    if (wpm >= 65) return { title: t.goodWpmMsg, text: t.goodWpmSub, icon: <ThumbsUp className="text-main" size={24} /> };
    if (wpm >= 40) return { title: t.okWpmMsg, text: t.okWpmSub, icon: <Award className="text-main" size={24} /> };
    return { title: t.tryAgainMsg, text: t.tryAgainSub, icon: <AlertTriangle className="text-main" size={24} /> };
  };

  const feedback = getFeedbackMessage();

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass rounded-2xl p-5 border border-sub/10 flex flex-col justify-between">
            <span className="text-xs text-sub uppercase font-bold tracking-wider">{t.wpm}</span>
            <span className="text-5xl md:text-6xl font-black text-main font-mono leading-none my-2">{Math.round(wpm)}</span>
            <span className="text-[10px] text-sub flex items-center gap-1 font-sans">
              {t.rawWpmLabel} <strong className="text-txt font-mono">{Math.round(rawWpm)}</strong>
            </span>
          </div>

          <div className="glass rounded-2xl p-5 border border-sub/10 flex flex-col justify-between">
            <span className="text-xs text-sub uppercase font-bold tracking-wider">{t.accuracy}</span>
            <span className="text-5xl md:text-6xl font-black text-txt font-mono leading-none my-2">{Math.round(accuracy)}%</span>
            <span className="text-[10px] text-sub flex items-center gap-1 font-sans">
              {t.errorsLabel} <strong className="text-err font-mono">{incorrectChars}</strong>
            </span>
          </div>

          <div className="glass rounded-2xl p-5 border border-sub/10 flex flex-col justify-between">
            <span className="text-xs text-sub uppercase font-bold tracking-wider">{t.time}</span>
            <span className="text-5xl md:text-6xl font-black text-txt font-mono leading-none my-2">{Math.round(timeSpent)}s</span>
            <span className="text-[10px] text-sub font-sans">{t.duration}</span>
          </div>

          <div className="glass rounded-2xl p-5 border border-sub/10 flex flex-col justify-between">
            <span className="text-xs text-sub uppercase font-bold tracking-wider">{t.characters}</span>
            <div className="my-2 font-mono text-xs font-bold flex flex-col gap-1">
              <div className="flex justify-between items-baseline text-sub">
                <span>{t.correct}:</span>
                <span className="text-txt font-bold">{correctChars}</span>
              </div>
              <div className="flex justify-between items-baseline text-sub">
                <span>{t.incorrect}:</span>
                <span className="text-err font-bold">{incorrectChars}</span>
              </div>
              <div className="flex justify-between items-baseline text-sub">
                <span>{t.extra}:</span>
                <span className="text-txt/70">{extraChars}</span>
              </div>
              <div className="flex justify-between items-baseline text-sub">
                <span>{t.missed}:</span>
                <span className="text-sub/50">{missedChars}</span>
              </div>
            </div>
            <span className="text-[10px] text-sub font-sans">{t.resultsSubtitle}</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 border border-sub/10 flex flex-col justify-between relative overflow-hidden bg-main/5">
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-main/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-2 mb-3">
            {feedback.icon}
            <span className="font-bold text-txt">{feedback.title}</span>
          </div>
          <p className="text-xs text-sub leading-relaxed mb-4">
            {feedback.text}
          </p>
          <div className="border-t border-sub/10 pt-3 mt-auto text-[10px] text-sub flex justify-between">
            <span>{t.consistency}</span>
            <span className="font-mono text-txt font-semibold">
              {Math.max(60, Math.round(accuracy * 0.95))}%
            </span>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-5 border border-sub/10 mb-8 relative overflow-hidden">
        <h3 className="text-xs text-sub uppercase font-bold tracking-wider mb-4">{t.chartTitle}</h3>

        <div className="w-full overflow-x-auto">
          <div style={{ minWidth: `${chartWidth}px` }} className="relative">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full select-none">
              <defs>
                <linearGradient id="wpmAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--main-color)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="var(--main-color)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {gridLines.map((val, idx) => (
                <g key={idx}>
                  <line
                    x1={padding.left}
                    y1={getY(val)}
                    x2={chartWidth - padding.right}
                    y2={getY(val)}
                    stroke="var(--sub-color)"
                    strokeOpacity="0.1"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={padding.left - 8}
                    y={getY(val) + 4}
                    fill="var(--sub-color)"
                    fontSize="10"
                    textAnchor="end"
                    fontFamily="Space Mono"
                    opacity="0.6"
                  >
                    {val}
                  </text>
                </g>
              ))}

              {chartData.filter((_, idx) => idx === 0 || idx === chartData.length - 1 || idx % Math.max(1, Math.round(chartData.length / 5)) === 0).map((d, idx) => (
                <text
                  key={idx}
                  x={getX(d.second)}
                  y={chartHeight - padding.bottom + 16}
                  fill="var(--sub-color)"
                  fontSize="10"
                  textAnchor="middle"
                  fontFamily="Space Mono"
                  opacity="0.6"
                >
                  {d.second}s
                </text>
              ))}

              {wpmOverTime.length > 1 && (
                <path d={areaPath} fill="url(#wpmAreaGrad)" />
              )}

              {wpmOverTime.length > 1 ? (
                <>
                  <polyline
                    fill="none"
                    stroke="var(--sub-color)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    strokeOpacity="0.5"
                    points={rawWpmPoints}
                  />

                  <polyline
                    fill="none"
                    stroke="var(--main-color)"
                    strokeWidth="2.5"
                    points={wpmPoints}
                  />
                </>
              ) : (
                <line
                  x1={getX(0)}
                  y1={getY(0)}
                  x2={getX(timeSpent)}
                  y2={getY(wpm)}
                  stroke="var(--main-color)"
                  strokeWidth="2.5"
                />
              )}

              {chartData.map((d, idx) => {
                if (d.errors > 0) {
                  return (
                    <circle
                      key={idx}
                      cx={getX(d.second)}
                      cy={chartHeight - padding.bottom - 4}
                      r="3"
                      fill="var(--error-color)"
                      opacity="0.8"
                    />
                  );
                }
                return null;
              })}

              {chartData.map((d, idx) => (
                <g
                  key={idx}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(d)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <circle
                    cx={getX(d.second)}
                    cy={getY(d.wpm)}
                    r="8"
                    fill="transparent"
                  />
                  {hoveredPoint?.second === d.second && (
                    <circle
                      cx={getX(d.second)}
                      cy={getY(d.wpm)}
                      r="4.5"
                      fill="var(--main-color)"
                      stroke="var(--bg-color)"
                      strokeWidth="1.5"
                    />
                  )}
                </g>
              ))}
            </svg>

            {hoveredPoint && (
              <div
                className="absolute z-20 glass px-2.5 py-1.5 rounded-md text-[10px] font-mono border border-sub/20 pointer-events-none transition-all duration-100 shadow-md"
                style={{
                  left: `${getX(hoveredPoint.second) - 60}px`,
                  top: `${getY(hoveredPoint.wpm) - 60}px`
                }}
              >
                <div className="text-[9px] text-sub uppercase font-semibold">{t.tooltipSec} {hoveredPoint.second}</div>
                <div className="font-bold text-main">WPM: {hoveredPoint.wpm}</div>
                <div className="text-txt">{t.tooltipRaw}: {hoveredPoint.rawWpm}</div>
                {hoveredPoint.errors > 0 && <div className="text-err font-semibold">{t.tooltipError}: {hoveredPoint.errors}</div>}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 mt-3 text-[10px] text-sub font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-main inline-block"></span>
            <span>{t.actualWpm}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 border-b border-dashed border-sub inline-block"></span>
            <span>{t.rawWpm}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-err inline-block"></span>
            <span>{t.errors}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-main text-bg font-bold rounded-xl hover:opacity-95 active:scale-98 transition-all cursor-pointer shadow-md shadow-main/10 text-sm group font-sans"
        >
          <RotateCcw size={16} className="group-hover:rotate-45 transition-transform" />
          <span>{t.repeatAction}</span>
          <span className="text-[10px] bg-bg/20 text-bg/90 px-1.5 py-0.5 rounded ml-1.5 font-mono font-medium">Tab</span>
        </button>
      </div>
    </div>
  );
}
