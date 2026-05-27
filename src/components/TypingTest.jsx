import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Keyboard, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { generateWords } from '../utils/words';
import { useSound } from '../hooks/useSound';
import { useTranslation } from '../utils/i18n';

export default function TypingTest({ config, onTestComplete, soundEnabled, setSoundEnabled }) {
  const { modeType, modeValue, language } = config;
  const t = useTranslation(language);

  const { playClick, playError } = useSound(soundEnabled);

  const [activeWordsList, setActiveWordsList] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [typedWords, setTypedWords] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(modeType === 'time' ? modeValue : 0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isFocused, setIsFocused] = useState(true);

  const [correctKeyStrokes, setCorrectKeyStrokes] = useState(0);
  const [incorrectKeyStrokes, setIncorrectKeyStrokes] = useState(0);
  const [extraCharsCount, setExtraCharsCount] = useState(0);
  const [missedCharsCount, setMissedCharsCount] = useState(0);
  const [wpmHistory, setWpmHistory] = useState([]);
  const [errorsThisSecond, setErrorsThisSecond] = useState(0);

  const containerRef = useRef(null);
  const wordsRef = useRef(null);
  const caretRef = useRef(null);
  const inputRef = useRef(null);
  const letterRefs = useRef({});
  const wordRefs = useRef({});

  const initializeTest = () => {
    const wordCount = modeType === 'words' ? modeValue : 120;
    const words = generateWords(wordCount, language);
    setActiveWordsList(words);
    setCurrentWordIndex(0);
    setCurrentInput('');
    setTypedWords([]);
    setIsActive(false);
    setTimeLeft(modeType === 'time' ? modeValue : 0);
    timeLeftRef.current = modeType === 'time' ? modeValue : 0;
    setTimeSpent(0);
    timeSpentRef.current = 0;
    setCorrectKeyStrokes(0);
    setIncorrectKeyStrokes(0);
    setExtraCharsCount(0);
    setMissedCharsCount(0);
    setWpmHistory([]);
    setErrorsThisSecond(0);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    setIsFocused(true);

    if (wordsRef.current) {
      wordsRef.current.style.transform = 'translate3d(0, 0, 0)';
    }
  };

  useEffect(() => {
    initializeTest();
  }, [modeType, modeValue, language]);

  const updateCaretPosition = () => {
    if (!caretRef.current || !containerRef.current || activeWordsList.length === 0) return;

    const wordEl = wordRefs.current[currentWordIndex];
    if (!wordEl) return;

    let x = 0;
    let y = 0;
    let h = 24;
    const currentWordText = activeWordsList[currentWordIndex] || '';
    const inputLen = currentInput.length;

    if (inputLen === 0) {
      const firstLetterEl = letterRefs.current[`${currentWordIndex}-0`];
      if (firstLetterEl) {
        x = firstLetterEl.offsetLeft;
        y = firstLetterEl.offsetTop;
        h = firstLetterEl.offsetHeight;
      } else {
        x = wordEl.offsetLeft;
        y = wordEl.offsetTop;
        h = wordEl.offsetHeight;
      }
    } else if (inputLen <= currentWordText.length) {
      const activeLetterEl = letterRefs.current[`${currentWordIndex}-${inputLen}`];
      if (activeLetterEl) {
        x = activeLetterEl.offsetLeft;
        y = activeLetterEl.offsetTop;
        h = activeLetterEl.offsetHeight;
      } else {
        const lastLetterEl = letterRefs.current[`${currentWordIndex}-${currentWordText.length - 1}`];
        if (lastLetterEl) {
          x = lastLetterEl.offsetLeft + lastLetterEl.offsetWidth;
          y = lastLetterEl.offsetTop;
          h = lastLetterEl.offsetHeight;
        }
      }
    } else {
      const lastExtraEl = letterRefs.current[`${currentWordIndex}-extra-${inputLen - 1}`];
      if (lastExtraEl) {
        x = lastExtraEl.offsetLeft + lastExtraEl.offsetWidth;
        y = lastExtraEl.offsetTop;
        h = lastExtraEl.offsetHeight;
      } else {
        const lastLetterEl = letterRefs.current[`${currentWordIndex}-${currentWordText.length - 1}`];
        if (lastLetterEl) {
          x = lastLetterEl.offsetLeft + lastLetterEl.offsetWidth;
          y = lastLetterEl.offsetTop;
          h = lastLetterEl.offsetHeight;
        }
      }
    }

    caretRef.current.style.transform = `translate3d(${x}px, ${y + 2}px, 0)`;
    caretRef.current.style.height = `${h - 4}px`;

    if (wordsRef.current) {
      const activeWordOffsetTop = wordEl.offsetTop;
      if (activeWordOffsetTop > 55) {
        wordsRef.current.style.transform = `translate3d(0, -${activeWordOffsetTop - 50}px, 0)`;
      } else {
        wordsRef.current.style.transform = `translate3d(0, 0, 0)`;
      }
    }
  };

  useEffect(() => {
    updateCaretPosition();
  }, [currentWordIndex, currentInput, activeWordsList]);

  useEffect(() => {
    const handleResize = () => {
      updateCaretPosition();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentWordIndex, currentInput, activeWordsList]);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  };

  const handleInputFocus = () => setIsFocused(true);
  const handleInputBlur = () => setIsFocused(false);



  const finalizeStats = (finalTimeSpent, lastWordInput) => {
    setIsActive(false);

    const currentInputVal = lastWordInput !== undefined ? lastWordInput : currentInputRef.current;
    const currentWordIdx = currentWordIndexRef.current;
    const typedWordsArr = typedWordsRef.current;
    const activeWords = activeWordsListRef.current;
    const correctKeys = correctKeyStrokesRef.current;
    const incorrectKeys = incorrectKeyStrokesRef.current;
    const extraKeys = extraCharsCountRef.current;
    const missedKeys = missedCharsCountRef.current;

    let totalCorrectChars = 0;
    let totalIncorrectChars = incorrectKeys;
    let totalExtraChars = extraKeys;
    let totalMissedChars = missedKeys;

    activeWords.forEach((word, wordIdx) => {
      const typed = typedWordsArr[wordIdx] !== undefined
        ? typedWordsArr[wordIdx]
        : (wordIdx === currentWordIdx ? currentInputVal : '');
      if (typed === '') return;

      for (let i = 0; i < Math.max(word.length, typed.length); i++) {
        if (i < word.length && i < typed.length) {
          if (typed[i] === word[i]) {
            totalCorrectChars++;
          }
        }
      }
    });

    const timeInMins = finalTimeSpent / 60 || 0.01;
    const rawWPM = (correctKeys + incorrectKeys + extraKeys) / 5 / timeInMins;
    const finalWPM = totalCorrectChars / 5 / timeInMins;

    const calculatedWpm = Math.max(0, Math.round(finalWPM));
    const calculatedRawWpm = Math.max(0, Math.round(rawWPM));

    const totalKeyStrokes = correctKeys + incorrectKeys + extraKeys;
    const accuracy = totalKeyStrokes > 0 ? (correctKeys / totalKeyStrokes) * 100 : 0;

    onTestComplete({
      wpm: calculatedWpm,
      rawWpm: calculatedRawWpm,
      accuracy: Math.round(accuracy),
      correctChars: totalCorrectChars,
      incorrectChars: totalIncorrectChars,
      extraChars: totalExtraChars,
      missedChars: totalMissedChars,
      timeSpent: finalTimeSpent,
      wpmOverTime: wpmHistory
    });
  };

  const typedWordsRef = useRef(typedWords);
  const currentWordIndexRef = useRef(currentWordIndex);
  const currentInputRef = useRef(currentInput);
  const correctKeyStrokesRef = useRef(correctKeyStrokes);
  const incorrectKeyStrokesRef = useRef(incorrectKeyStrokes);
  const extraCharsCountRef = useRef(extraCharsCount);
  const missedCharsCountRef = useRef(missedCharsCount);
  const errorsThisSecondRef = useRef(errorsThisSecond);
  const modeTypeRef = useRef(modeType);
  const activeWordsListRef = useRef(activeWordsList);
  const finalizeStatsRef = useRef(finalizeStats);

  const timeLeftRef = useRef(modeType === 'time' ? modeValue : 0);
  const timeSpentRef = useRef(0);

  useEffect(() => { typedWordsRef.current = typedWords; }, [typedWords]);
  useEffect(() => { currentWordIndexRef.current = currentWordIndex; }, [currentWordIndex]);
  useEffect(() => { currentInputRef.current = currentInput; }, [currentInput]);
  useEffect(() => {
    correctKeyStrokesRef.current = correctKeyStrokes;
    incorrectKeyStrokesRef.current = incorrectKeyStrokes;
    extraCharsCountRef.current = extraCharsCount;
  }, [correctKeyStrokes, incorrectKeyStrokes, extraCharsCount]);
  useEffect(() => { missedCharsCountRef.current = missedCharsCount; }, [missedCharsCount]);
  useEffect(() => { errorsThisSecondRef.current = errorsThisSecond; }, [errorsThisSecond]);
  useEffect(() => { modeTypeRef.current = modeType; }, [modeType]);
  useEffect(() => { activeWordsListRef.current = activeWordsList; }, [activeWordsList]);
  useEffect(() => { finalizeStatsRef.current = finalizeStats; });
  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        const currentInputVal = currentInputRef.current;
        const currentWordIdx = currentWordIndexRef.current;
        const typedWordsArr = typedWordsRef.current;
        const activeWords = activeWordsListRef.current;
        const correctKeys = correctKeyStrokesRef.current;
        const incorrectKeys = incorrectKeyStrokesRef.current;
        const extraKeys = extraCharsCountRef.current;
        const errorsSec = errorsThisSecondRef.current;
        const mode = modeTypeRef.current;

        timeSpentRef.current += 1;
        const nextTime = timeSpentRef.current;
        setTimeSpent(nextTime);

        let currentCorrect = 0;
        activeWords.forEach((word, wordIdx) => {
          const typed = typedWordsArr[wordIdx] !== undefined ? typedWordsArr[wordIdx] : (wordIdx === currentWordIdx ? currentInputVal : '');
          if (typed === '') return;
          for (let i = 0; i < Math.min(word.length, typed.length); i++) {
            if (typed[i] === word[i]) currentCorrect++;
          }
        });

        const timeInMins = nextTime / 60;
        const currentWpm = Math.round((currentCorrect / 5) / timeInMins);
        const currentRawWpm = Math.round(((correctKeys + incorrectKeys + extraKeys) / 5) / timeInMins);

        setWpmHistory(hist => [...hist, {
          second: nextTime,
          wpm: currentWpm,
          rawWpm: currentRawWpm,
          errors: errorsSec
        }]);

        setErrorsThisSecond(0);

        if (mode === 'time') {
          timeLeftRef.current -= 1;
          const nextLeft = timeLeftRef.current;
          setTimeLeft(nextLeft);
          if (nextLeft <= 0) {
            clearInterval(timer);
            finalizeStatsRef.current(nextTime);
          }
        }
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive]);



  const handleInputChange = (e) => {
    const val = e.target.value;

    if (!isActive) {
      setIsActive(true);
    }

    const currentWord = activeWordsList[currentWordIndex] || '';

    if (val.length > currentInput.length) {
      const typedChar = val[val.length - 1];
      const targetChar = currentWord[val.length - 1];

      if (typedChar === targetChar) {
        const nextCorrect = correctKeyStrokes + 1;
        setCorrectKeyStrokes(nextCorrect);
        correctKeyStrokesRef.current = nextCorrect;
        playClick();
      } else {
        const nextIncorrect = incorrectKeyStrokes + 1;
        setIncorrectKeyStrokes(nextIncorrect);
        incorrectKeyStrokesRef.current = nextIncorrect;

        setErrorsThisSecond(prev => {
          const nextErrors = prev + 1;
          errorsThisSecondRef.current = nextErrors;
          return nextErrors;
        });
        playError();

        if (val.length > currentWord.length) {
          const nextExtra = extraCharsCount + 1;
          setExtraCharsCount(nextExtra);
          extraCharsCountRef.current = nextExtra;
        }
      }
    }

    setCurrentInput(val);
    currentInputRef.current = val;

    if (modeType === 'words' && currentWordIndex === modeValue - 1) {
      if (val.length === currentWord.length) {
        setIsActive(false);
        const finalTime = timeSpentRef.current || 1;
        finalizeStats(finalTime, val);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      initializeTest();
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      if (currentInput.trim() === '') return;

      const currentWordText = activeWordsList[currentWordIndex] || '';

      if (currentInput.length < currentWordText.length) {
        const missed = currentWordText.length - currentInput.length;
        setMissedCharsCount(prev => prev + missed);
      }

      const nextTypedWords = [...typedWords, currentInput];
      setTypedWords(nextTypedWords);

      const nextWordIndex = currentWordIndex + 1;

      if (modeType === 'words' && nextWordIndex >= modeValue) {
        const finalTime = timeSpent || 1;
        finalizeStats(finalTime);
      } else {
        setCurrentWordIndex(nextWordIndex);
        setCurrentInput('');
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
      return;
    }

    if (e.key === 'Backspace' && currentInput === '' && currentWordIndex > 0) {
      e.preventDefault();
      const prevWordIndex = currentWordIndex - 1;

      const prevTypedWordText = typedWords[prevWordIndex] || '';
      const prevWordText = activeWordsList[prevWordIndex] || '';

      setCurrentWordIndex(prevWordIndex);
      setCurrentInput(prevTypedWordText);
      setTypedWords(prev => prev.slice(0, -1));

      if (inputRef.current) {
        inputRef.current.value = prevTypedWordText;
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">

      <input
        ref={inputRef}
        type="text"
        className="opacity-0 absolute -z-50 pointer-events-none w-0 h-0"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
      />

      <div className="w-full flex justify-between items-center mb-6 px-2 text-sm font-mono font-bold text-main">
        <div className="flex items-center gap-4">
          {modeType === 'time' ? (
            <div className="text-2xl tracking-wider select-none">{timeLeft}s</div>
          ) : (
            <div className="text-2xl tracking-wider select-none">
              {currentWordIndex}/{modeValue} <span className="text-xs text-sub">{t.wordsLabel}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded hover:bg-sub/10 text-sub hover:text-txt cursor-pointer transition-colors"
            title={soundEnabled ? t.muteSound : t.unmuteSound}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            onClick={initializeTest}
            className="p-1.5 rounded hover:bg-sub/10 text-sub hover:text-txt cursor-pointer transition-colors"
            title={t.resetTest}
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className="w-full relative h-[140px] md:h-[170px] overflow-hidden cursor-text select-none text-2xl md:text-3xl leading-relaxed py-1"
      >
        {!isFocused && (
          <div className="absolute inset-0 z-30 glass backdrop-blur-xs flex flex-col justify-center items-center rounded-xl border border-sub/10 transition-all duration-200">
            <div className="flex items-center gap-2 text-main font-semibold mb-1 text-sm md:text-base">
              <Keyboard size={18} className="animate-bounce" />
              <span>{t.clickToFocus}</span>
            </div>
            <span className="text-xs text-sub">{t.focusLost}</span>
          </div>
        )}

        <div
          ref={wordsRef}
          className="word-container relative pl-1 text-sub/50 transition-transform duration-300 ease-out"
        >
          <div
            ref={caretRef}
            className={`absolute w-[2px] bg-main rounded transition-all duration-75 z-10 ${currentInput.length === 0 ? 'caret-blink' : ''
              }`}
            style={{
              transform: 'translate3d(0, 2px, 0)',
              width: '2px',
              backgroundColor: 'var(--caret-color)',
              transition: 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), height 0.1s'
            }}
          />

          {activeWordsList.map((word, wordIdx) => {
            const isCurrent = wordIdx === currentWordIndex;
            const isCompleted = wordIdx < currentWordIndex;
            const typedText = typedWords[wordIdx] || (isCurrent ? currentInput : '');

            const isWordIncorrect = isCompleted && typedText !== word;

            return (
              <div
                key={wordIdx}
                ref={el => { wordRefs.current[wordIdx] = el; }}
                className={`flex mr-4 mb-2 flex-wrap rounded-xs ${isCurrent ? 'text-txt border-b border-sub/10' : ''
                  } ${isWordIncorrect ? 'border-b border-err/30 bg-err-bg px-0.5' : ''}`}
              >
                {word.split('').map((char, charIdx) => {
                  let letterClass = 'untyped';
                  if (charIdx < typedText.length) {
                    letterClass = typedText[charIdx] === char ? 'correct' : 'incorrect';
                  }

                  return (
                    <span
                      key={charIdx}
                      ref={el => { letterRefs.current[`${wordIdx}-${charIdx}`] = el; }}
                      className={`letter ${letterClass}`}
                    >
                      {char}
                    </span>
                  );
                })}

                {typedText.length > word.length &&
                  typedText.slice(word.length).split('').map((char, charIdx) => {
                    const extraIdx = word.length + charIdx;
                    return (
                      <span
                        key={`extra-${extraIdx}`}
                        ref={el => { letterRefs.current[`${wordIdx}-extra-${extraIdx}`] = el; }}
                        className="letter extra incorrect"
                      >
                        {char}
                      </span>
                    );
                  })
                }
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full flex items-center justify-center gap-2 mt-6 text-xs text-sub select-none font-mono">
        <kbd className="px-1.5 py-0.5 rounded bg-sub/10 border border-sub/20 font-bold">{t.tabKey}</kbd>
        <span>{t.restartTip}</span>
      </div>
    </div>
  );
}
