const { writeDatabase, readDatabase } = require("../utils/database");

let absentData = [];
let isAbsentRunning = false;
let saveNameClass = "";

// Fungsi untuk memproses perintah absen dari guru
exports.processAbsenCommand = async (m, sender, text) => {
  //cek guru terdaftar
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  const user = updatedDbUserData.find((user) => user.number === sender);
  if (user.role !== "GURU") {
    return m.reply(
      "Maaf, perintah ini hanya bisa dilakukan oleh guru yang telah terdaftar",
    );
  } else if (isAbsentRunning) {
    return m.reply(
      "Maaf, perintah absen sudah sedang berjalan, mohon tunggu absen selesai",
    );
  }

  //cek argument
  const args = text.split("#");
  if (args.length !== 2) {
    return m.reply(
      "Maaf, format yang anda berikan harusnya\n`.mulai_absen [nama_kelas]#[waktu(menit)]`",
    );
  }
  const [nameClass, timeMinute] = args;
  const isGroupClass = updatedDbUserData.find(
    (user) => user.group === nameClass,
  );
  if (!isGroupClass) {
    return m.reply("Maaf, kelas yang anda berikan belum terdaftar");
  } else if (isNaN(timeMinute) || timeMinute > 30) {
    return m.reply(
      "Pastikan waktu yang anda berikan adalah angka dan tidak lebih dari 30 menit",
    );
  }

  saveNameClass = nameClass;

  // Memberikan arahan kepada siswa untuk absen
  m.reply(
    "Halo siswa `" +
      saveNameClass +
      "` ! Mohon absen dengan mengirimkan perintah `.absen hadir` atau `.absen izin`.\n\nAbsen akan dilakukan selama " +
      timeMinute +
      " menit.",
  );

  // Set variabel isAbsenRunning menjadi true
  isAbsentRunning = true;

  // Set timeout untuk menutup absen setelah 30 menit
  setTimeout(
    async () => {
      // Menampilkan data absen dengan format yang diinginkan
      const formattedAbsen = absentData
        .map((data) => `├ • [${data.status}] - ${data.name}`)
        .join("\n");
      await m.reply(
        "╭───「 *✅ Absensi Siswa - SELESAI ✅* 」\n│\n" +
          formattedAbsen +
          "\n│\n╰───「 kelas : " +
          saveNameClass +
          " 」",
      );

      // Set variabel isAbsenRunning menjadi false setelah selesai
      isAbsentRunning = false;

      //hapus data nama kelas
      saveNameClass = "";

      // Mengosongkan data absen
      absentData = [];
      return;
    },
    timeMinute * 60 * 1000,
  ); // Setelah timeMinute
};

// Fungsi untuk memproses perintah absen dari siswa
exports.processAbsenSiswa = async (m, sender, text) => {
  //cek siswa terdaftar
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  const user = updatedDbUserData.find((user) => user.number === sender);
  // Mengecek apakah waktu absen sudah berjalan
  if (!isAbsentRunning) {
    return m.reply("Absen belum dibuka atau sudah berakhir.");
  }

  if (user.role !== "SISWA") {
    return m.reply(
      "Maaf, perintah ini hanya bisa dilakukan oleh siswa yang telah terdaftar",
    );
  } else if (user.group !== saveNameClass) {
    return m.reply(
      "Maaf, perintah ini sedang berjalan untuk kelas " + saveNameClass,
    );
  }

  if (text !== "hadir" && text !== "izin") {
    m.reply(
      "Perintah absen tidak valid, silahkan gunakan perintah `.absen hadir` atau `.absen izin`.",
    );
  } else {
    // Menyimpan data absen siswa
    const name = user.name;
    const status = text;
    absentData.push({ name, status });

    // Memberi konfirmasi kepada siswa
    m.reply(`Terima kasih, Anda telah melakukan absen dengan status: ${text}`);
  }
};
