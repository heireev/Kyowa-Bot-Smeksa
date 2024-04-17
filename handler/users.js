const { writeDatabase, readDatabase } = require("../utils/database");
require("dotenv").config();
const owner = process.env.OWNER_NUMBER;

exports.resetPoint = async (client) => {
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];

  const currentDate = new Date(); // Mendapatkan tanggal dan waktu saat ini

  // Periksa apakah sudah pukul 12 malam (00:00:00)
  if (
    currentDate.getHours() === 0 &&
    currentDate.getMinutes() === 0 &&
    currentDate.getSeconds() === 0
  ) {
    if (updatedDbUserData.length === 0) {
      // Tidak perlu melakukan apa-apa jika tidak ada pengguna terdaftar
    } else {
      updatedDbUserData.forEach((user) => {
        if ((user.premium === true)) {
          user.points = 30;
        } else {
          user.points = 10;
        }
      });

      // Simpan perubahan ke database
      await writeDatabase("users", updatedDbUserData);

      // Tambahkan pesan bahwa poin pengguna telah direset
      console.log("Poin pengguna telah direset.");
      client.sendText(
          owner + "@s.whatsapp.net",
          `Poin pengguna telah direset otomatis. ✅`,
        );
    }
  }
};

exports.resetPointManual = async (m) => {
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];

  if (updatedDbUserData.length === 0) {
    // Tidak perlu melakukan apa-apa jika tidak ada pengguna terdaftar
  } else {
    updatedDbUserData.forEach((user) => {
      if ((user.premium === true)) {
        user.points = 30;
      } else {
        user.points = 10;
      }
    });

    // Simpan perubahan ke database
    await writeDatabase("users", updatedDbUserData);

    // Tambahkan pesan bahwa poin pengguna telah direset
    console.log("Poin pengguna telah direset.");
    m.reply("Poin pengguna telah direset.");
  }
};

exports.register = async (prefix, command, m, client, owner, sender, text) => {
  if (!text)
    return m.reply(`Berikut mendaftar di Kyowa-Bot.\n
Contoh _(SISWA)_ :\n${prefix}${command} HAQSUCI MULIANI#2201013#XI TKJ\n\n
Contoh _(GURU)_ :\n${prefix}${command} JUMRIATI, S.Pd#198007112005022005`);

  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  if (updatedDbUserData) {
    const user = updatedDbUserData.find((user) => (user.number === sender));
    if (user) {
      m.reply("Anda sudah pernah mendaftar. Silahkan cek profil anda");
    } else {
      const args = text.split("#");
      if (args.length === 3) {
        const [name, regnumber, group] = args;
        if (isNaN(regnumber) || regnumber.length !== 7) {
          return m.reply(
            "Yah, kamu harus isi NIS kamu dengan benar (7 digit). silahkan cek *.daftar* untuk panduannya.",
          );
        }
        const newUser = {
          role: "SISWA",
          member: false,
          premium: false,
          points: 10,
          number: sender,
          name: name,
          regnumber: regnumber,
          group: group,
        };
        updatedDbUserData.push(newUser);
        await writeDatabase("users", updatedDbUserData);
        client.sendText(
          owner + "@s.whatsapp.net",
          `⚠️Peserta Baru⚠️\n\nHalo, kyo.\n\nNama : ${name}\nNIS : ${regnumber}\nKelas : ${group}\nPeran : SISWA\nno.WA : ${sender}\n\ntelah mendaftar sebagai calon anggota. mohon diterima dengan perintah\n\n*.setmember [nomor]*`,
        );
        m.reply(
          `Anda telah berhasil terdaftar dengan data berikut:\n\nNama : ${name}\nNIS : ${regnumber}\nKelas : ${group}\nPeran : SISWA\nno.WA : ${sender}\n\nAkun Anda sedang menunggu persetujuan dari owner.`,
        );
      } else if (args.length === 2) {
        const [name, regnumber] = args;
        if (isNaN(regnumber) || regnumber.length !== 18) {
          return m.reply(
            "Bapak/Ibu silahkan isi NIP dengan benar (18 digit). silahkan cek .daftar untuk panduannya.",
          );
        }
        const newUser = {
          role: "GURU",
          member: false,
          premium: false,
          points: 10,
          number: sender,
          name: name,
          regnumber: regnumber,
          group: "",
        };
        await updatedDbUserData.push(newUser);
        await writeDatabase("users", updatedDbUserData);
        client.sendText(
          owner + "@s.whatsapp.net",
          `⚠️Peserta Baru⚠️\n\nHalo, kyo.\n\nNama : ${name}\nNIP : ${regnumber}\nPeran : GURU\nno.WA : ${sender}\n\ntelah mendaftar sebagai calon anggota. mohon diterima dengan perintah\n\n*.setmember [nomor]*`,
        );
        m.reply(
          `Anda telah berhasil terdaftar dengan data berikut:\n\nNama : ${name}\nNIP : ${regnumber}\nPeran : GURU\nno.WA : ${sender}\n\nAkun Anda sedang menunggu persetujuan dari owner.`,
        );
      } else {
        m.reply(
          "Format pendaftaran salah. silahkan cek *.daftar* untuk panduannya",
        );
      }
    }
  } else {
    return m.reply(`Database masih kosong`);
  }
};

exports.kick = async (prefix, command, m, text, client) => {
  if (!text) {
    return m.reply(
      `Berikut cara Kick Member di Kyowa-Bot.\n\n${prefix}${command} 628XXXXXXXXXX`,
    );
  } else if (isNaN(text) || !text.startsWith("62")) {
    return m.reply("format nomor salah. nomor harus angka berawalan *62...*");
  }
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  if (updatedDbUserData) {
    const user = updatedDbUserData.findIndex((user) => (user.number === text));
    if (user !== -1) {
      updatedDbUserData.splice(user, 1);
      await writeDatabase("users", updatedDbUserData);
      m.reply(`User dengan nomor ${text} telah di kick.`);
      client.sendText(
        text + "@s.whatsapp.net",
        `⚠️Info⚠️\n\nAnda telah dikeluarkan oleh owner`,
      );
    } else {
      m.reply("Nomor terkait belum pernah mendaftar");
    }
  } else {
    return m.reply(`Database masih kosong`);
  }
};

exports.logout = async (m, sender) => {
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  if (updatedDbUserData) {
    const user = updatedDbUserData.findIndex((user) => (user.number === sender));
    if (user !== -1) {
      updatedDbUserData.splice(user, 1);
      await writeDatabase("users", updatedDbUserData);
      m.reply(`Anda berhasil keluar.`);
    } else {
      m.reply("Anda memang belum pernah mendaftar -_-");
    }
  } else {
    return m.reply(`Database masih kosong`);
  }
};

exports.setMember = async (prefix, command, m, text, client) => {
  if (!text) {
    return m.reply(
      `Berikut cara Set Member di Kyowa-Bot.\n\n${prefix}${command} 628XXXXXXXXXX`,
    );
  } else if (isNaN(text) || !text.startsWith("62")) {
    return m.reply("format nomor salah. nomor harus angka berawalan *62...*");
  }

  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  if (updatedDbUserData) {
    const user = updatedDbUserData.find((user) => (user.number === text));
    if (user) {
      user.member = true;
      await writeDatabase("users", updatedDbUserData);
      m.reply(`User dengan nomor ${text} telah diubah menjadi member.`);
      client.sendText(
        user.number + "@s.whatsapp.net",
        `Selamat status anda telah menjadi *👤 Member* di Kyowa-Bot`,
      );
    } else {
      return m.reply("Nomor terkait belum pernah mendaftar");
    }
  } else {
    return m.reply(`Database masih kosong`);
  }
};

exports.setPremium = async (prefix, command, m, text, client) => {
  if (!text) {
    return m.reply(
      `Berikut cara Set Premium di Kyowa-Bot.\n\n${prefix}${command} 628XXXXXXXXXX`,
    );
  } else if (isNaN(text) || !text.startsWith("62")) {
    return m.reply("format nomor salah. nomor harus angka berawalan *62...*");
  }

  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  if (updatedDbUserData) {
    const user = updatedDbUserData.find((user) => (user.number === text));
    if (user) {
      user.member = true;
      user.premium = true;
      await writeDatabase("users", updatedDbUserData);
      m.reply(`User dengan nomor ${text} telah ditingkatkan menjadi Premium.`);
      client.sendText(
        user.number + "@s.whatsapp.net",
        `Selamat status anda ditingkatkan menjadi *🥇 Premium* di Kyowa-Bot`,
      );
    } else {
      return m.reply("Nomor terkait belum pernah mendaftar");
    }
  } else {
    return m.reply(`Database masih kosong`);
  }
};

exports.setClassLeader = async (prefix, command, m, text, client) => {
  if (!text) {
    return m.reply(
      `Berikut cara Set Ketua Kelas di Kyowa-Bot.\n\n${prefix}${command} 628XXXXXXXXXX`,
    );
  } else if (isNaN(text) || !text.startsWith("62")) {
    return m.reply("format nomor salah. nomor harus angka berawalan *62...*");
  }

  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  if (updatedDbUserData) {
    const user = updatedDbUserData.find((user) => (user.number === text));
    if (user) {
      if (user.role === "SISWA") {
        user.role = "SISWA-KETUA";
        await writeDatabase("users", updatedDbUserData);
        m.reply(`User dengan nomor ${text} telah ditingkatkan menjadi Ketua Kelas.`);
        client.sendText(
          user.number + "@s.whatsapp.net",
          `Selamat status anda ditingkatkan menjadi *KETUA-KELAS* di Kyowa-Bot`,
        );
      } else if (user.role === "SISWA-KETUA") {
        m.reply("User terkait masih menjadi ketua kelas")
      } else if (user.role === "GURU") {
        m.reply("User terkait adalah guru")
      }
    } else {
      return m.reply("Nomor terkait belum pernah mendaftar");
    }
  } else {
    return m.reply(`Database masih kosong`);
  }
};

exports.setMemberAll = async (prefix, command, m, text, client) => {
  if (!text) {
    return m.reply(
      `Berikut cara Set All memmber di Kyowa-Bot.\n\n${prefix}${command} 628XXXXXXXXXX#628XXXXXXXXXX#dst`,
    );
  }
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  if (updatedDbUserData) {
    const args = text.split("#");
    const count = args.length;
    for (let i = 0; i < count; i++) {
      if (isNaN(args[i]) || !args[i].startsWith("62")) {
        return m.reply(
          "ada format nomor yang salah. nomor harus angka berawalan *62...*",
        );
      }
    }
    for (let i = 0; i < count; i++) {
      const user = updatedDbUserData.find((user) => user.number === args[i]);
      if (user) {
        user.member = true;
        await writeDatabase("users", updatedDbUserData);
        m.reply(`User dengan nomor ${args[i]} telah diubah menjadi member.`);
        client.sendText(
          user.number + "@s.whatsapp.net",
          "Selamat status anda telah menjadi `member` di Kyowa-Bot",
        );
      } else {
        m.reply(`Nomor ${args[i]} belum pernah mendaftar`);
      }
    }
  } else {
    return m.reply(`Database masih kosong`);
  }
};

exports.addMemberManual = async (prefix, command, m, text, client) => {
  if (!text)
    return m.reply(`Berikut Set Member manual di Kyowa-Bot.\n
  Contoh _(SISWA)_ :\n${prefix}${command} 628XXXXXXXXXX#HAQSUCI MULIANI#2201013#XI TKJ\n\n
  Contoh _(GURU)_ :\n${prefix}${command} 628XXXXXXXXXX#JUMRIATI, S.Pd#198007112005022005`);

  const args = text.split("#");
  if (isNaN(args[0]) || !args[0].startsWith("62")) {
    return m.reply(
      "ada format nomor yang salah. nomor harus angka berawalan *62...*",
    );
  }

  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];

  if (updatedDbUserData) {
    const user = updatedDbUserData.find((user) => (user.number === args[0]));
    if (user) {
      m.reply("Anda sudah pernah mendaftar. Silahkan cek profil anda");
    } else {
      const args = text.split("#");
      if (args.length === 4) {
        const [number, name, regnumber, group] = args;
        if (isNaN(regnumber) || regnumber.length !== 7) {
          return m.reply(
            "Yah, kamu harus isi NIS dengan benar (7 digit). silahkan cek *.daftar* untuk panduannya.",
          );
        }
        const newUser = {
          role: "SISWA",
          member: true,
          premium: false,
          points: 10,
          number: number,
          name: name,
          regnumber: regnumber,
          group: group,
        };
        updatedDbUserData.push(newUser);
        await writeDatabase("users", updatedDbUserData);
        await client.sendText(
          number + "@s.whatsapp.net",
          `⚠️Peserta Baru⚠️\n\nHalo...\n\nNama : ${name}\nNIS : ${regnumber}\nKelas : ${group}\nPeran : SISWA\nno.WA : ${number}\n\nAnda telah terdaftar sebagai anggota. Selamat...`,
        );
        m.reply(
          `Anda telah berhasil mendaftarkan data berikut menjadi member:\n\nNama : ${name}\nNIS : ${regnumber}\nKelas : ${group}\nPeran : SISWA\nno.WA : ${number}`,
        );
      } else if (args.length === 3) {
        const [number, name, regnumber] = args;
        if (isNaN(regnumber) || regnumber.length !== 18) {
          return m.reply(
            "Bapak/Ibu silahkan isi NIP dengan benar (18 digit). silahkan cek .daftar untuk panduannya.",
          );
        }
        const newUser = {
          role: "GURU",
          member: false,
          premium: false,
          points: 10,
          number: number,
          name: name,
          regnumber: regnumber,
          group: "",
        };
        updatedDbUserData.push(newUser);
        await writeDatabase("users", updatedDbUserData);
        await client.sendText(
          number + "@s.whatsapp.net",
          `⚠️Peserta Baru⚠️\n\nHalo...\n\nNama : ${name}\nNIP : ${regnumber}\nPeran : GURU\nno.WA : ${number}\n\ntelah terdaftar sebagai anggota. Selamat...`,
        );
        m.reply(
          `Anda telah berhasil mendaftarkan dengan data berikut menjadi member:\n\nNama : ${name}\nNIP : ${regnumber}\nPeran : GURU\nno.WA : ${number}`,
        );
      } else {
        return m.reply(
          `Format perintah salah. lihat ${prefix}${command} untuk panduannya`,
        );
      }
    }
  } else {
    return m.reply(`Database masih kosong`);
  }
};

exports.addPoint = async (prefix, command, m, text, client) => {
  if (!text) {
    return m.reply(
      `Berikut cara Add Point di Kyowa-Bot.\n\n${prefix}${command} 628XXXXXXXXXX#5`,
    );
  }
  const args = text.split("#");
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  if (updatedDbUserData) {
    if (args.length === 2) {
      const [number, point] = args;
      if (isNaN(number) || !number.startsWith("62")) {
        return m.reply(
          "format nomor salah. nomor harus angka berawalan *62...*",
        );
      }
      const user = updatedDbUserData.find((user) => user.number === number);
      const pointInt = parseInt(point);
      if (user) {
        if (pointInt) {
          user.points += point;
          await writeDatabase("users", updatedDbUserData);
          m.reply(
            `User dengan nomor ${text} telah mendapatkan penambahan *${point}* point.`,
          );
          client.sendText(
            user.number + "@s.whatsapp.net",
            `Selamat anda mendapatkan penambahan point di Kyowa-Bot sebanyak *${point}*.\ncek *.myprofile* untuk melihat status lengkap anda`,
          );
        } else {
          return m.reply("Point harus angka integer");
        }
      } else {
        return m.reply("Nomor terkait belum pernah mendaftar");
      }
    } else {
      return m.reply(
        `Format perintah salah. lihat ${prefix}${command} untuk panduannya`,
      );
    }
  } else {
    return m.reply(`Database masih kosong`);
  }
};

exports.myProfile = async (m, sender) => {
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  if (updatedDbUserData) {
    const user = updatedDbUserData.find((user) => user.number === sender);
    if (user) {
      let status;
      let myprofil;
      if (user.premium) {
        status = `🥇 Premium`;
      } else if (user.member) {
        status = `👤 Member`;
      } else {
        status = `Tertunda, silahkan hubungi admin`;
      }
      if (user.role === "SISWA" || user.role === "SISWA-KETUA") {
        myprofil = `╭───「 *Profil Saya - ${user.role}* 」* 
│
├ • Nama : *${user.name}*
├ • NIS : *${user.regnumber}*
├ • Kelas : *${user.group}*
├ • No. HP : *${user.number}*
├ • Poin : *${user.points}*
│   
├ • Status : *${status}*
│   
╰───「 Kyowa Bot 」`;
      } else if (user.role === "GURU") {
        myprofil = `╭───「 *Profil Saya - ${user.role}* 」* 
│
├ • Nama : *${user.name}*
├ • NIP : *${user.regnumber}*
├ • No. HP : *${user.number}*
├ • Poin : *${user.points}*
│   
├ • Status : *${status}*
│   
╰───「 Kyowa Bot 」`;
      }
      m.reply(myprofil);
    } else {
      return m.reply(`Anda belum pernah mendaftar -_-`);
    }
  } else {
    return m.reply(`Database masih kosong`);
  }
};

exports.checkProfile = async (prefix, command, m, text) => {
  if (!text) {
    return m.reply(
      `Berikut cara Cek Profil di Kyowa-Bot.\n\n${prefix}${command} 628XXXXXXXXXX#5`,
    );
  } else if (isNaN(text) || !text.startsWith("62")) {
    return m.reply("format nomor salah. nomor harus angka berawalan *62...*");
  }
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  if (updatedDbUserData) {
    const user = updatedDbUserData.find((user) => user.number === text);
    if (user) {
      let status;
      let myprofil;
      if (user.premium) {
        status = `🥇 Premium`;
      } else if (user.member) {
        status = `👤 Member`;
      } else {
        status = `Tertunda, silahkan hubungi admin`;
      }
      if (user.role === "SISWA" || user.role === "SISWA-KETUA") {
        myprofil = `╭───「 *Profil - ${user.role}* 」* 
│
├ • Nama : *${user.name}*
├ • NIS : *${user.regnumber}*
├ • Kelas : *${user.group}*
├ • No. HP : *${user.number}*
├ • Poin : *${user.points}*
│   
├ • Status : *${status}*
│   
╰───「 Kyowa Bot 」`;
      } else if (user.role === "GURU") {
        myprofil = `╭───「 *Profil - ${user.role}* 」* 
│
├ • Nama : *${user.name}*
├ • NIP : *${user.regnumber}*
├ • No. HP : *${user.number}*
├ • Poin : *${user.points}*
│   
├ • Status : *${status}*
│   
╰───「 Kyowa Bot 」`;
      }
      m.reply(myprofil);
    }
  } else {
    return m.reply(`Database masih kosong`);
  }
};

exports.checkAllMember = async (m) => {
  const dbUserData = await readDatabase("users");
  let updatedDbUserData = dbUserData ? [...dbUserData] : [];
  if (updatedDbUserData) {
    if (updatedDbUserData.length === 0) {
      console.log(
        chalk.white(chalk.bgGreen("[ Cek Member ]")),
        chalk.magenta("Tidak member terdaftar"),
      );
      m.reply(`Tidak member terdaftar`);
    } else {
      let listMember = "╭───「 *List Daftar Member* 」\n│\n";
      listMember += updatedDbUserData
        // .filter((member) => member.number === sender)
        .map((user) => {
          let status = "";
          if (user.premium) {
            status = "🥇 Premium";
          } else if (user.member) {
            status = "👤 Member";
          } else {
            status = "⌛ Pending";
          }
          return `├ • *${status}* || ${user.number}\n`;
        })
        .join("");
      m.reply(`${listMember}│\n╰───「 Kyowa Bot 」`);
    }
  } else {
    return m.reply(`Database masih kosong`);
  }
};

exports.msgMember = async (m, client, text) => {
  const args = text.split("#");
  if (args.length !== 2) {
    return m.reply("Format perintah harusnya `.msg_member NOMOR#PESAN`");
  }
  const [number, message] = args;
  if (isNaN(number) || !number.startsWith("62")) {
    return m.reply(
      "format nomor salah. nomor harus angka berawalan *62...*" +
        text +
        number +
        message,
    );
  }
  await client.sendText(number + "@s.whatsapp.net", message);
  m.reply("pesan berhasil dikirim");
};
