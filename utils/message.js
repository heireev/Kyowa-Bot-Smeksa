let startTime = Date.now(); // Simpan waktu saat chatbot dimulai

// Fungsi untuk menghitung durasi berjalan
function getUptime() {
  let currentTime = Date.now();
  let uptimeInSeconds = (currentTime - startTime) / 1000; // Konversi ke detik
  let uptimeInMinutes = uptimeInSeconds / 60; // Konversi ke menit
  let uptimeInHours = uptimeInMinutes / 60; // Konversi ke jam
  return {
    hours: Math.floor(uptimeInHours),
    minutes: Math.floor(uptimeInMinutes % 60),
    seconds: Math.floor(uptimeInSeconds % 60),
  };
}

// Fungsi untuk mendapatkan teks durasi berjalan
function getUptimeText() {
  let uptime = getUptime();
  return `${uptime.hours}j:${uptime.minutes}m:${uptime.seconds}d`;
}

exports.runtimeCheck = () => {
    let uptimeText = getUptimeText(); // Mendapatkan teks durasi berjalan
    return `Bot ini sudah berjalan selama:\n\n${uptimeText}\n`
}

exports.intro = () => {
    return `Kamu adalah Kyowa-Bot yang ditugaskan untuk membantu siswa SMKN 01 Barru dalam menjawab pertanyaan apapun tentang pengetahuan umum.
Ada pertanyaan untukmu :
=> `;
};

exports.introOwner = () => {
    return `Halo. Saya M. Rifqi Irawan.
Mahasiswa Universitas Negeri Makassar
Jurusan Teknik Informatika dan Komputer

Sebagai pemilik dari *Kyowa-Bot SMEKSA*
Jangan sungkan untuk menghubungi saya untuk informasi lebih lanjut

email : mrifqiirawan.unm@gmail.com
wa : wa.me/6289502976892`;
};

exports.ownerMenu = (prefix) => {
    let uptimeText = getUptimeText(); // Mendapatkan teks durasi berjalan
  return `╭───「 *Kyowa-Bot Command* 」* 
│
├ • *${prefix}msgmember*
├ • *${prefix}cekprofile*
├ • *${prefix}cekallmember*
├ • *${prefix}setmember*
├ • *${prefix}setpremium*
├ • *${prefix}setleader*
├ • *${prefix}addmembermanual*
├ • *${prefix}setmemberall*
├ • *${prefix}addpoint*
├ • *${prefix}resetpoint*
├ • *${prefix}kick*
├ • *${prefix}addstaf*
├ • *${prefix}delstaf*
│
╰───「 Uptime : ${uptimeText}  」`;
};

exports.help = (prefix) => {
    let uptimeText = getUptimeText(); // Mendapatkan teks durasi berjalan
    return `╭───「 *Kyowa-Bot Command* 」* 
│
├ • *${prefix}about* -> lihat tentang ku
│
├──「 Tanya Kyowa-Bot AI 」
├ • *${prefix}gpt* _(⏳ Limit)_
├ • *${prefix}gemini* _(⏳ Limit)_
├ • *${prefix}gptplus* _(🥇 Premium)_
├ • *${prefix}bing* _(🥇 Premium)_
├ • *${prefix}g4f* _(🥇 Premium)_
├ • *${prefix}bardie* _(🥇 Premium)_
├ • *${prefix}hercai* _(🥇 Premium)_
├ • *${prefix}llama* _(🥇 Premium)_
├ • *${prefix}mixtral* _(🥇 Premium)_
│
├──「 Edukasi 」
├ • *${prefix}quiz* (untuk Matematika)
├ • *${prefix}wikipedia* _(🥇 Premium)_
├ • *${prefix}brainly* _(🥇 Premium)_
├ • *${prefix}carigambar* _(🥇 Premium)_
├ • *${prefix}kbbi* _(🥇 Premium)_
├ • *${prefix}idtranslate* _(🥇 Premium)_
├ • *${prefix}entranslate* _(🥇 Premium)_
│
├──「 Pengingat Tugas 」
├ • *${prefix}buattugas*
├ • *${prefix}cektugas*
├ • *${prefix}buattugasgrup* _(ketua/guru kelas)_
├ • *${prefix}cektugasgrup*
│
├──「 Fitur Lainnya 」
├ • *${prefix}kontakstaf*
├ • *${prefix}jadwalpelajaran*
│
├──「 Uji Coba - Fitur Baru ⚠️ 」
├ • *${prefix}mulaiabsen* _(oleh guru)_
├ • *${prefix}absen* _(oleh siswa)_
│
├──「 Pengaturan Akun 」
├ • *${prefix}daftar*
├ • *${prefix}profilsaya*
├ • *${prefix}keluar*
│
╰───「 Uptime : ${uptimeText}  」`;
};

exports.jadwal_pelajaran = () => {
    return `📅 Jadwal Pelajaran SMKN 01 BARRU, update untuk
Tahun Akademik  : 2023/2024
Semester        : Ganjil

[file terlampir]

Jika Anda memiliki pertanyaan lebih lanjut tentang jadwal pelajaran atau kegiatan sekolah lainnya, jangan ragu untuk bertanya kepada staf atau guru kami.

Terima kasih.

- Kyowa Bot`;
};
