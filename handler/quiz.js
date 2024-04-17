const { 
    writeDatabase, readDatabase,
} = require("../utils/database");

let isQuizRunning = false;
let correctChoice = "";
let quizTimer;

exports.quizMatematika = (m, sender, client, mek) => {
    if (isQuizRunning) {
        return m.reply(
            "Maaf, Quiz sementara sedang berjalan, mohon tunggu quiz selesai",
        );
    }

    isQuizRunning = true;

    dbQuizData = readDatabase("quiz_matematika");
    const randomIndex = Math.floor(Math.random() * dbQuizData.length);
    const randomData = dbQuizData[randomIndex];
    const imageFilePath = randomData.imageFilePath;
    correctChoice = randomData.correct_choice;
    client.sendImage(m.chat, imageFilePath, "pilih dengan `.jawab A/B/C/D/E`\n\n\nwaktu quiz : 5 menit", mek)
    
    // Set timeout untuk menutup quiz setelah 5 menit
    quizTimer = setTimeout(
        async () => {                
            //Kirim jawaban yang benar
            await m.reply(`Quiz Berakhir`);

            // Set variabel isQuizRunning menjadi false setelah selesai
            isQuizRunning = false;

            // Reset Correct Choice
            correctChoice = "";

            return;
        },
        5 * 60 * 1000,
    ); // Setelah 5 menit
}

exports.answerQuizMatematika = async (m, sender, text) => {
    // Mengecek apakah waktu quiz sudah berjalan
    if (!isQuizRunning) {
        return m.reply("Quiz belum dibuka atau sudah berakhir.");
    }

    if (text !== correctChoice){
      // Menghentikan quizMatematika jika sedang berjalan
      isQuizRunning = false;
      correctChoice = "";
      clearTimeout(quizTimer);
        return m.reply(`
Quiz Berakhir

jawaban yang anda berikan
❌ *SALAH* ❌
        `)
    } else {
      // Menghentikan quizMatematika jika sedang berjalan
      isQuizRunning = false;
      correctChoice = "";
      clearTimeout(quizTimer);
        return m.reply(`
Quiz Berakhir

jawaban yang anda berikan
✅ *BENAR* ✅
        `)
    }
}