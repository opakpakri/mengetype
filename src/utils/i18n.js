export const TRANSLATIONS = {
  english: {
    // Navbar
    navStartTest: 'Start Test',
    navHistory: 'History',
    navTimeMode: 'time',
    navWordMode: 'words',
    
    // Footer
    footerCredits: 'made with React & Tailwind v4',
    selectTheme: 'Select Theme',

    // TypingTest
    wordsLabel: 'words',
    muteSound: 'Mute Sound',
    unmuteSound: 'Unmute Sound',
    resetTest: 'Reset Test',
    clickToFocus: 'Click or press any key to focus',
    focusLost: 'Keyboard focus lost',
    tabKey: 'Tab',
    restartTip: 'to restart the typing test',

    // Results
    wpm: 'wpm',
    accuracy: 'accuracy',
    time: 'time',
    characters: 'characters',
    rawWpmLabel: 'Raw WPM:',
    errorsLabel: 'Errors:',
    duration: 'test duration',
    correct: 'Correct',
    incorrect: 'Incorrect',
    extra: 'Extra',
    missed: 'Missed',
    resultsSubtitle: 'typing breakdown',
    consistency: 'Consistency',
    chartTitle: 'Speed (WPM) & Error Chart',
    actualWpm: 'Actual WPM',
    rawWpm: 'Raw WPM',
    errors: 'Typing Errors',
    repeatAction: 'Restart Test',
    tooltipSec: 'Sec',
    tooltipRaw: 'Raw',
    tooltipError: 'Error',

    // StatsHistory
    historyTitle: 'Typing Test History',
    historySub: 'Track your typing progression over time',
    clearHistory: 'Clear History',
    backToTest: 'Back to Test',
    noHistory: 'No history found',
    noHistorySub: 'Complete your first typing test to see statistics here.',
    startTest: 'Start Test Now',
    highestWpm: 'Highest WPM',
    avgWpm: 'Average WPM',
    avgAccuracy: 'Average Accuracy',
    dateLabel: 'Date',
    modeLabel: 'Mode',
    languageLabel: 'Language',
    confirmClear: 'Are you sure you want to delete all test history?',
    timeModeName: 'Time',
    wordModeName: 'Words',
    langEnglish: 'English',
    langIndonesian: 'Indonesian',

    // Coach Feedback
    bestWpmMsg: 'Typing God!',
    bestWpmSub: 'Outstanding! Your speed is equivalent to a professional typist.',
    goodWpmMsg: 'Great Job!',
    goodWpmSub: 'Very fast typing. You are well above average speed.',
    okWpmMsg: 'Nice!',
    okWpmSub: 'Solid performance. Keep practicing to push new boundaries.',
    tryAgainMsg: 'Keep Trying!',
    tryAgainSub: 'Focus on accuracy first, speed will follow naturally.'
  },
  indonesian: {
    // Navbar
    navStartTest: 'Mulai Tes',
    navHistory: 'Riwayat',
    navTimeMode: 'waktu',
    navWordMode: 'kata',

    // Footer
    footerCredits: 'dibuat dengan React & Tailwind v4',
    selectTheme: 'Pilih Tema',

    // TypingTest
    wordsLabel: 'kata',
    muteSound: 'Matikan Suara',
    unmuteSound: 'Aktifkan Suara',
    resetTest: 'Reset Tes',
    clickToFocus: 'Tekan di sini untuk mulai mengetik',
    focusLost: 'Fokus keyboard terputus',
    tabKey: 'Tab',
    restartTip: 'untuk merestart tes mengetik',

    // Results
    wpm: 'wpm',
    accuracy: 'akurasi',
    time: 'waktu',
    characters: 'karakter',
    rawWpmLabel: 'Raw WPM:',
    errorsLabel: 'Kesalahan:',
    duration: 'durasi tes',
    correct: 'Benar',
    incorrect: 'Salah',
    extra: 'Lebih',
    missed: 'Terlewat',
    resultsSubtitle: 'breakdown ketikan',
    consistency: 'Konsistensi',
    chartTitle: 'Grafik Kecepatan (WPM) & Kesalahan',
    actualWpm: 'WPM Aktual',
    rawWpm: 'WPM Mentah (Raw)',
    errors: 'Kesalahan Ketik',
    repeatAction: 'Ulangi Tes Baru',
    tooltipSec: 'Detik',
    tooltipRaw: 'Mentah',
    tooltipError: 'Error',

    // StatsHistory
    historyTitle: 'Riwayat Hasil Mengetik',
    historySub: 'Pantau perkembangan performa Anda seiring waktu',
    clearHistory: 'Hapus Riwayat',
    backToTest: 'Kembali ke Tes',
    noHistory: 'Belum Ada Riwayat Tes',
    noHistorySub: 'Selesaikan tes mengetik pertama Anda untuk mulai menyimpan statistik kecepatan (WPM) dan akurasi di sini.',
    startTest: 'Mulai Tes Sekarang',
    highestWpm: 'WPM Tertinggi',
    avgWpm: 'Rata-Rata WPM',
    avgAccuracy: 'Rata-Rata Akurasi',
    dateLabel: 'Tanggal',
    modeLabel: 'Mode',
    languageLabel: 'Bahasa',
    confirmClear: 'Apakah Anda yakin ingin menghapus semua riwayat tes?',
    timeModeName: 'Waktu',
    wordModeName: 'Kata',
    langEnglish: 'English',
    langIndonesian: 'Indonesia',

    // Coach Feedback
    bestWpmMsg: 'Dewa Mengetik!',
    bestWpmSub: 'Luar biasa! Kecepatan Anda setara dengan profesional papan atas.',
    goodWpmMsg: 'Luar Biasa!',
    goodWpmSub: 'Kecepatan yang sangat bagus. Anda jauh di atas rata-rata orang umum.',
    okWpmMsg: 'Kerja Bagus!',
    okWpmSub: 'Performa yang solid. Terus berlatih untuk menembus batas baru.',
    tryAgainMsg: 'Terus Mencoba!',
    tryAgainSub: 'Fokus pada akurasi terlebih dahulu, kecepatan akan menyusul secara alami.'
  }
};

export const useTranslation = (language = 'english') => {
  return TRANSLATIONS[language] || TRANSLATIONS.english;
};
