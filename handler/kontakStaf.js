const { writeDatabase, readDatabase } = require("../utils/database");

exports.kontakStaf = async (m, client, text) => {
  const dbStafData = await readDatabase("kontakstaf");
  let updatedDbStafData = dbStafData ? [...dbStafData] : [];
  if (text == "") {
    if (updatedDbStafData.length === 0) {
      m.reply(`Data staf guru dan pegawai masih kosong`);
    } else {
      let listStaf = "╭───「 *Daftar Staf SMKN 01 Barru* 」\n";
      listStaf += updatedDbStafData
        .map((staf) => {
          const { code, name } = staf;
          return `│\n├ • *${name}*\n│   Kode Staf : ${code}\n`;
        })
        .join("");
      await m.reply(`${listStaf}│\n╰───「 Kyowa Bot 」`);
      await m.reply(
        "Anda bisa menghubungi staf dengan cara:\n`.kontak_staf kode_staf#pesan`\n\nGunakan fitur ini dengan bijak :)",
      );
      return;
    }
  } else {
    const args = text.split("#");
    if (args.length !== 2) {
      m.reply(
        "Format perintah salah. Gunakan format *.kontak_staf [Kode Staf]#[Maksud dan Tujuan]*.\nContoh : *.kontak_staf XYZ#Saya ingin konsultasi lebih lanjut mengenai pembelajaran instalasi linux di virtual box*",
      );
    } else {
      const [kode, tujuan] = args;
      //DB kontakstaf : kode, nama, number, jabatan
      const stafData = updatedDbStafData.find((staf) => staf.code === kode);

      //DB users : nama, nis, kelas, number
      const sender = m.sender.replace("@s.whatsapp.net", ""); // user WA number
      const dbStafData = await readDatabase("users");
      const userData = dbStafData.find((user) => user.number === sender);

      if (!stafData) {
        return m.reply("Kode staf yang anda berikan tidak ada dalam data");
      } else {
        let pesan = `📩 Pesan Siswa 📩\n
Permisi pak/ibu ${stafData.name}\n
Siswa SMKN 01 Barru, dengan data :
Nama  : *${userData.name}*
NIS      : *${userData.regnumber}*
Kelas  : *${userData.group}*\n
ingin menghubungi anda dengan tujuan :
=> ${tujuan}\n
Siswa terkait bisa dihubungi melalui
[ wa.me/${userData.number} ]`;
        await client.sendText(stafData.number + "@s.whatsapp.net", pesan);
        m.reply("Pesan berhasil dikirim");
        return;
      }
    }
  }
};

exports.addStaf = async (m, text) => {
  const dbStafData = await readDatabase("kontakstaf");
  let updatedDbStafData = dbStafData ? [...dbStafData] : [];
  const args = text.split("#");
  if (args.length !== 3) {
    m.reply(
      "Format perintah salah. Gunakan format `.addstaf [kode]#[nama_staf]#[number]`",
    );
  } else {
    const [kode, nama, number] = args;
    const newStaf = {
      code: kode,
      name: nama,
      number: number,
    };
    updatedDbStafData.push(newStaf);
    await writeDatabase("kontakstaf", updatedDbStafData);
    m.reply(`Data staf ${nama} dengan kode ${kode} berhasil ditambahkan`);
    return;
  }
};

exports.delStaf = async (m, text) => {
  const dbStafData = await readDatabase("kontakstaf");
  let updatedDbStafData = dbStafData ? [...dbStafData] : [];
  if (text == "") {
    m.reply(
      "Maaf anda harus sertakan kode Staf.\nContoh : `.delStaf [kode_staf]`",
    );
  } else {
    const stafData = updatedDbStafData.find((staf) => staf.code === text);
    if (!stafData) {
      return m.reply("Kode staf yang anda berikan tidak ada dalam data");
    } else {
      const index = updatedDbStafData.indexOf(stafData);
      dbStafData.splice(index, 1);
      await writeDatabase("kontakstaf", dbStafData);
      m.reply(`Data staf dengan kode ${text} telah dihapus dari daftar.`);
    }
  }
};
