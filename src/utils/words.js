export const ENGLISH_WORDS = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "tell", "very", "every", "find", "here", "think", "place", "show", "life", "know",
  "child", "many", "young", "work", "school", "system", "before", "right", "world", "local",
  "under", "social", "national", "state", "point", "government", "water", "home", "number", "group",
  "company", "woman", "business", "friend", "money", "study", "general", "game", "book", "hand",
  "different", "area", "family", "house", "room", "point", "end", "member", "law", "car",
  "city", "community", "name", "sentence", "line", "cause", "much", "mean", "before", "move",
  "right", "boy", "old", "too", "same", "she", "all", "there", "when", "up",
  "use", "your", "way", "about", "many", "then", "them", "write", "would", "like",
  "so", "these", "her", "long", "make", "thing", "see", "him", "two", "has",
  "look", "more", "day", "could", "go", "come", "did", "number", "sound", "no",
  "most", "people", "my", "over", "know", "water", "than", "call", "first", "who",
  "may", "down", "side", "been", "now", "find", "any", "new", "work", "part",
  "take", "get", "place", "made", "live", "where", "after", "back", "little", "only",
  "round", "man", "year", "came", "show", "every", "good", "me", "give", "our",
  "under", "name", "very", "through", "just", "form", "sentence", "great", "think", "say"
];

export const INDONESIAN_WORDS = [
  "dan", "yang", "untuk", "dengan", "saya", "dia", "mereka", "kita", "anda", "tidak",
  "bisa", "ada", "pada", "dari", "ke", "dalam", "akan", "telah", "ini", "itu",
  "oleh", "sebagai", "karena", "atau", "tetapi", "juga", "sudah", "dapat", "sekarang", "hanya",
  "banyak", "orang", "hari", "tahun", "tahu", "baru", "satu", "dua", "tiga", "jalan",
  "kerja", "masuk", "keluar", "rumah", "anak", "ibu", "ayah", "teman", "waktu", "tempat",
  "buku", "tulis", "baca", "belajar", "sekolah", "negara", "pemerintah", "masyarakat", "kota", "desa",
  "air", "makan", "minum", "tidur", "bangun", "pagi", "siang", "sore", "malam", "bulan",
  "minggu", "jam", "menit", "detik", "cepat", "lambat", "bagus", "buruk", "besar", "kecil",
  "panjang", "pendek", "tinggi", "rendah", "jauh", "dekat", "luar", "dalam", "atas", "bawah",
  "tengah", "depan", "belakang", "kiri", "kanan", "tangan", "kaki", "kepala", "mata", "telinga",
  "hidung", "mulut", "gigi", "rambut", "hati", "jiwa", "hidup", "mati", "lahir", "tumbuh",
  "selalu", "sering", "kadang", "jarang", "pernah", "belum", "sedang", "akan", "telah", "selesai",
  "mulai", "berhenti", "kembali", "pergi", "datang", "tiba", "tinggal", "menjadi", "membuat", "melakukan",
  "melihat", "mendengar", "merasa", "memikirkan", "membawa", "mengambil", "memberi", "menerima", "mencari", "menemukan",
  "membantu", "menolong", "mengajar", "menulis", "membaca", "berbicara", "berkata", "bertanya", "menjawab", "memahami",
  "mengerti", "tahu", "ingat", "lupa", "suka", "benci", "cinta", "takut", "berani", "marah",
  "senang", "sedih", "bahagia", "kecewa", "lelah", "capek", "sakit", "sehat", "kuat", "lemah",
  "bersih", "kotor", "mudah", "sulit", "susah", "murah", "mahal", "kaya", "miskin", "baru",
  "lama", "tua", "muda", "benar", "salah", "betul", "mungkin", "pasti", "tentu", "harus",
  "boleh", "perlu", "biasa", "luar", "biasa", "semua", "setiap", "beberapa", "sebagian", "seluruh"
];

// Helper to generate a list of randomized words
export const generateWords = (count, language = 'english') => {
  const wordList = language === 'indonesian' ? INDONESIAN_WORDS : ENGLISH_WORDS;
  const result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    result.push(wordList[randomIndex]);
  }
  return result;
};
