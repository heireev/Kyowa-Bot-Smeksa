const chalk = require("chalk");

const { writeDatabase, readDatabase } = require("../utils/database");

// Buat Tugas Siswa
exports.taskReminder = async (client) => {
  const dbTaskData = await readDatabase("usertask");
  let updatedDbTaskData = dbTaskData ? [...dbTaskData] : [];
  // console.log(chalk.white(chalk.bgGreen("[ TASK REMINDER ]")), chalk.magenta("Melakukan pemeriksaan task"));
  if (updatedDbTaskData.length === 0) {
    // console.log(chalk.white(chalk.bgGreen("[ TASK REMINDER ]")), chalk.green("Tidak ada task yang perlu diperiksa"));
  } else {
    // console.log(chalk.white(chalk.bgGreen("[ TASK REMINDER ]")), chalk.yellow("Task siswa terdeteksi"));
    updatedDbTaskData.forEach(async (task, index) => {
      const { number, taskName, deadline, timeDeadline, info } = task;
      const currentTime = new Date().getTime();
      const timeRemaining = timeDeadline - currentTime;
      let hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      // Mengurangkan 8 jam
      hours -= 8;
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
      );

      if (hours === 0 && minutes === 59) {
        console.log(
          chalk.white(chalk.bgGreen("[ TASK REMINDER ]")),
          chalk.magenta("Sedang memberikan reminder ke "),
          chalk.yellow(`[ ${number} ]`),
        );
        client.sendText(
          number + "@s.whatsapp.net",
          `⚠️Pesan Pengingat⚠️\n\ntugas : *${taskName}*\ntenggat : *${deadline}*\nKeterangan : *${info}*\n\nakan berakhir 1 jam lagi ⏳`,
        );
      }
      if (hours <= -1 && minutes <= 59) {
        console.log(
          chalk.white(chalk.bgGreen("[ TASK REMINDER ]")),
          chalk.magenta("mencoba menghapus task terkait"),
        );
        client.sendText(
          number + "@s.whatsapp.net",
          `⚠️Pesan Pengingat⚠️\n\ntugas : *${taskName}*\ntenggat : *${deadline}*\nKeterangan : *${info}*\n\nsudah berakhir sekarang ✅`,
        );
        // Menghapus data dari array
        updatedDbTaskData.splice(index, 1);
        await writeDatabase("usertask", updatedDbTaskData); // Simpan kembali data yang sudah dihapus
      }
    });
  }
};

exports.createTask = async (prefix, command, m, sender, text) => {
  if (!text) {
    return m.reply(`Berikut contoh menambahkan pengingat tugas di Kyowa-Bot.\n\n${prefix}${command} Upload video tutorial di youtube#2024-06-21 09:00`);
  }
  const args = text.split("#");
  
  const dbTaskData = await readDatabase("usertask");
  let updatedDbTaskData = dbTaskData ? [...dbTaskData] : [];
  if (updatedDbTaskData) {
    if (args.length !== 2) {
      return m.reply(`Cara anda salah. Berikut contoh menambahkan pengingat tugas di Kyowa-Bot.\n\n${prefix}${command} Upload video tutorial di youtube#2024-06-21 09:00`);
    }
    const [taskName, deadline] = args;
    const timeDeadline = new Date(deadline).getTime();
    if (isNaN(timeDeadline)) {
      m.reply("Format deadline salah. Gunakan format tanggal yang valid.");
    } else {
      const newTask = {
        number: sender,
        taskName: taskName,
        deadline: deadline,
        timeDeadline: timeDeadline,
      };
      updatedDbTaskData.push(newTask);
      await writeDatabase("usertask", updatedDbTaskData);
      m.reply(
        `Tugas "${taskName}" dengan deadline ${deadline} telah ditambahkan.`,
      );
    }
  } else {
    return m.reply(`Database masih kosong`);
  }
};

exports.showTask = async (m, sender) => {
  const dbTaskData = await readDatabase("usertask");
  let updatedDbTaskData = dbTaskData ? [...dbTaskData] : [];
  if (updatedDbTaskData.length === 0) {
    console.log(
      chalk.white(chalk.bgGreen("[ TASK REMINDER ]")),
      chalk.magenta("Tidak ada tugas yang perlu diperiksa"),
    );
    m.reply(`Tidak ada tugas yang perlu diperiksa`);
  } else {
    let listTask = "╭───「 *List Tugas Anda* 」\n";
    const currentTime = new Date().getTime();
    listTask += updatedDbTaskData
      .filter((task) => task.number === sender)
      .map((task) => {
        const { taskName, timeDeadline, deadline } = task;
        const timeRemaining = timeDeadline - currentTime;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        hours -= 8;
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
        );

        const timeRemainingString = `${days}hari ${hours}jam ${minutes}menit`;

        return `│\n├ • *${taskName}* || ${deadline}\n│   berakhir dalam : ${timeRemainingString}\n`;
      })
      .join("");
    m.reply(`${listTask}│\n╰───「 Kyowa Bot 」`);
  }
};

// Buat Tugas Group
exports.groupTaskReminder = async (client) => {
  const dbTaskData = await readDatabase("grouptask");
  let updatedDbTaskData = dbTaskData ? [...dbTaskData] : [];
  // console.log(chalk.white(chalk.bgGreen("[ TASK REMINDER ]")), chalk.magenta("Melakukan pemeriksaan task"));
  if (updatedDbTaskData.length === 0) {
    // console.log(chalk.white(chalk.bgGreen("[ TASK REMINDER ]")), chalk.green("Tidak ada task yang perlu diperiksa"));
  } else {
    // console.log(chalk.white(chalk.bgGreen("[ TASK REMINDER ]")), chalk.yellow("Task siswa terdeteksi"));
    updatedDbTaskData.forEach(async (task, index) => {
      const { groupID, taskName, deadline, timeDeadline, info } = task;
      const currentTime = new Date().getTime();
      const timeRemaining = timeDeadline - currentTime;
      let hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      // Mengurangkan 8 jam
      hours -= 8;
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
      );

      if (hours === 0 && minutes === 59) {
        console.log(
          chalk.white(chalk.bgGreen("[ TASK REMINDER ]")),
          chalk.magenta("Sedang memberikan reminder ke "),
          chalk.yellow(`[ ${groupID} ]`),
        );
        client.sendText(
          groupID + "@s.whatsapp.net",
          `⚠️Pesan Pengingat⚠️\n\ntugas group : *${taskName}*\ntenggat : *${deadline}**\n\nakan berakhir 1 jam lagi ⏳`,
        );
      }
      if (hours <= -1 && minutes <= 59) {
        console.log(
          chalk.white(chalk.bgGreen("[ TASK REMINDER ]")),
          chalk.magenta("mencoba menghapus task terkait"),
        );
        client.sendText(
          groupID + "@s.whatsapp.net",
          `⚠️Pesan Pengingat⚠️\n\ntugas group : *${taskName}*\ntenggat : *${deadline}*\n\nsudah berakhir sekarang ✅`,
        );
        // Menghapus data dari array
        updatedDbTaskData.splice(index, 1);
        await writeDatabase("grouptask", updatedDbTaskData); // Simpan kembali data yang sudah dihapus
      }
    });
  }
};

exports.createGroupTask = async (prefix, command, m, groupID, text) => {
  if (!text) {
    return m.reply(`Berikut contoh menambahkan pengingat tugas di Kyowa-Bot.\n\n${prefix}${command} Upload video tutorial di youtube#2024-06-21 09:00`);
  }
  const args = text.split("#");

  const dbTaskData = await readDatabase("grouptask");
  let updatedDbTaskData = dbTaskData ? [...dbTaskData] : [];
  if (updatedDbTaskData) {
    if (args.length !== 2) {
      return m.reply(`Cara anda salah. Berikut contoh menambahkan pengingat tugas di Kyowa-Bot.\n\n${prefix}${command} Upload video tutorial di youtube#2024-06-21 09:00`);
    }
    const [taskName, deadline] = args;
    const timeDeadline = new Date(deadline).getTime();
    if (isNaN(timeDeadline)) {
      m.reply("Format deadline salah. Gunakan format tanggal yang valid.");
    } else {
      const newGroupTask = {
        groupID: groupID,
        taskName: taskName,
        deadline: deadline,
        timeDeadline: timeDeadline,
      };
      updatedDbTaskData.push(newGroupTask);
      await writeDatabase("grouptask", updatedDbTaskData);
      m.reply(
        `Tugas "${taskName}" dengan deadline ${deadline} telah ditambahkan ke grup.`,
      );
    }
  } else {
    return m.reply(`Database masih kosong`);
  }
};

exports.showGroupTask = async (m, groupId) => {
  const dbTaskData = await readDatabase("grouptask");
  let updatedDbTaskData = dbTaskData ? [...dbTaskData] : [];
  if (updatedDbTaskData.length === 0) {
    console.log(
      chalk.white(chalk.bgGreen("[ TASK REMINDER ]")),
      chalk.magenta("Tidak ada tugas grup yang perlu diperiksa"),
    );
    m.reply(`Tidak ada tugas grup yang perlu diperiksa`);
  } else {
    let listGroupTask = "╭───「 *List Tugas Grup Anda* 」\n";
    const currentTime = new Date().getTime();
    listGroupTask += updatedDbTaskData
      .filter((task) => task.groupID === groupId)
      .map((task) => {
        const { taskName, timeDeadline, deadline } = task;
        const timeRemaining = timeDeadline - currentTime;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        hours -= 8;
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
        );

        const timeRemainingString = `${days}hari ${hours}jam ${minutes}menit`;

        return `│\n├ • *${taskName}* || ${deadline}\n│   berakhir dalam : ${timeRemainingString}\n`;
      })
      .join("");
    m.reply(`${listGroupTask}│\n╰───「 Kyowa Bot 」`);
  }
};
