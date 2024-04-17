const { writeDatabase, readDatabase } = require("../utils/database");

exports.checkUserPoint = async (m) => {
  // Pengecekan apakah pengguna telah terdaftar
  const sender = m.sender.replace("@s.whatsapp.net", ""); // user WA number
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  const userData = updatedDbUserData.find((user) => user.number === sender);

  if (!userData) {
    m.reply(
      "Anda harus terdaftar sebelum dapat menggunakan perintah ini. Silahkan ketik *.daftar*",
    );
    return false;
  } else {
    if (userData.member) {
      if (userData.points > 0) {
        // Fungsi disetujui di sini
        return true;
      } else {
        m.reply(
          "Maaf, Anda telah mencapai batas penggunaan. Silahkan hubungi *.owner* untuk penambahan poin. Atau tunggu sampai besok untuk reset poin secara otomatis.",
        );
        return false;
      }
    } else {
      m.reply(
        "Maaf, Anda belum terkonfirmasi menjadi member. Silahkan hubungi admin",
      );
      return false;
    }
  }
};

exports.checkUserMember = async (m) => {
  // Pengecekan apakah pengguna telah terdaftar
  const sender = m.sender.replace("@s.whatsapp.net", ""); // user WA number
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  const userData = updatedDbUserData.find((user) => user.number === sender);

  if (!userData) {
    m.reply(
      "Anda harus terdaftar sebelum dapat menggunakan perintah ini. Silahkan ketik *.daftar*",
    );
    return false;
  } else {
    if (userData.member) {
      return true;
    } else {
      m.reply(
        "Maaf, Anda belum terkonfirmasi menjadi member. Silahkan hubungi admin",
      );
      return false;
    }
  }
};

exports.checkUserPremium = async (m) => {
  // Pengecekan apakah pengguna telah terdaftar
  const sender = m.sender.replace("@s.whatsapp.net", ""); // user WA number
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  const userData = updatedDbUserData.find((user) => user.number === sender);

  if (!userData) {
    m.reply(
      "Anda harus terdaftar sebelum dapat menggunakan perintah ini. Silahkan ketik `.daftar`",
    );
    return false;
  } else {
    if (userData.premium) {
      return true;
    } else {
      m.reply(
        "Maaf, Menu ini hanya untuk pengguna `PREMIUM`. Silahkan hubungi admin",
      );
      return false;
    }
  }
};

exports.checkUserLeaderOrTeacher = async (m) => {
  // Pengecekan apakah pengguna telah terdaftar
  const sender = m.sender.replace("@s.whatsapp.net", ""); // user WA number
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  const userData = updatedDbUserData.find((user) => user.number === sender);

  if (!userData) {
    return false;
  } else {
    if ((userData.role = "SISWA-KETUA")) {
      return true;
    } else if ((userData.role = "GURU")) {
      return true;
    } else {
      m.reply(
        "Maaf, Menu ini hanya untuk Ketua Kelas atau Guru",
      );
      return false;
    }
  }
};

exports.usedPoint = async (m) => {
  // Pengecekan apakah pengguna telah terdaftar
  const sender = m.sender.replace("@s.whatsapp.net", ""); // user WA number
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  const userData = updatedDbUserData.find((user) => user.number === sender);

  if (userData) {
    userData.points--;
    const userIndex = updatedDbUserData.findIndex(
      (user) => user.number === sender,
    );
    updatedDbUserData[userIndex] = userData;
    await writeDatabase("users", updatedDbUserData);
    m.reply("poin anda dikurangi 1");
  }
};
