const fs = require("fs");
const util = require("util");
const chalk = require("chalk");

require("dotenv").config();
const owner = process.env.OWNER_NUMBER;

const {
  // Lihat tentangku
  introOwner,

  // Lihat List Menu
  help,
  ownerMenu,
  jadwal_pelajaran,
  runtimeCheck,
} = require("./utils/message.js");

// Check User Data
const {
  checkUserPoint,
  checkUserMember,
  checkUserPremium,
  usedPoint,
  checkUserLeaderOrTeacher,
} = require("./utils/checkUser.js");

// Main Code
module.exports = kyowa = async (client, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
          ? m.message.imageMessage.caption
          : m.mtype == "videoMessage"
            ? m.message.videoMessage.caption
            : m.mtype == "extendedTextMessage"
              ? m.message.extendedTextMessage.text
              : m.mtype == "buttonsResponseMessage"
                ? m.message.buttonsResponseMessage.selectedButtonId
                : m.mtype == "listResponseMessage"
                  ? m.message.listResponseMessage.singleSelectReply
                      .selectedRowId
                  : m.mtype == "templateButtonReplyMessage"
                    ? m.message.templateButtonReplyMessage.selectedId
                    : m.mtype === "messageContextInfo"
                      ? m.message.buttonsResponseMessage?.selectedButtonId ||
                        m.message.listResponseMessage?.singleSelectReply
                          .selectedRowId ||
                        m.text
                      : "";

    var budy = typeof m.text == "string" ? m.text : "";
    // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
    const isCmd2 = body.startsWith(prefix);
    const command = body
      .replace(prefix, "")
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await client.decodeJid(client.user.id);
    const itsMe = m.sender == botNumber ? true : false;
    const itsOwner = m.sender == owner + "@s.whatsapp.net" ? true : false;

    // Rekam teks seseorang
    let text = (q = args.join(" "));

    const from = m.chat; // Pesan teks masuk
    const reply = m.reply; // Balas pesan
    const sender = m.sender.replace("@s.whatsapp.net", ""); // nomor Whatsapp
    const mek = chatUpdate.messages[0];

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };

    // Group
    const groupMetadata = m.isGroup
      ? await client.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";

    // Push Message To Console
    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;
    if (isCmd2 && !m.isGroup) {
      console.log(
        chalk.black(chalk.bgWhite("[ LOGS ]")),
        color(argsLog, "turquoise"),
        chalk.magenta("From"),
        chalk.green(pushname),
        chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`),
      );
    } else if (isCmd2 && m.isGroup) {
      console.log(
        chalk.black(chalk.bgWhite("[ LOGS ]")),
        color(argsLog, "turquoise"),
        chalk.magenta("From"),
        chalk.green(pushname),
        chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`),
        chalk.blueBright("IN"),
        chalk.green(groupName),
      );
    }

    if (isCmd2) {
      switch (command) {
        // untuk testing random =============================
        case "test":
            client.sendText(from, "Data anda telah terbaca", mek);
            // client.sendContact(from);
            console.log(m);
            break;
            
        //====================================================
        case "tiktok":
        case "tt":
            if (await checkUserMember(m)) {
                const { tiktokDL } = require("./handler/downloader")
                tiktokDL(m, client, text, mek)
                break;
            }
            
            
        case "tiktokmusic":
        case "ttm":
            if (await checkUserMember(m)) {
                const { tiktokMusicDL } = require("./handler/downloader")
                tiktokMusicDL(m, client, text, mek)
                break;
            }
        //====================================================

        // ABOUT ME
        case "about":
          // m.reply(introOwner());
          const photoPath = "./files/media/my_profile.jpg";
          const intro = introOwner();
          client.sendImage(from, photoPath, intro, mek);
          break;

        //USERS COMMAND
        case "daftar":
          // Membuat objek data pengguna baru
            const { register } = require("./handler/users");
            register(prefix, command, m, client, owner, sender, text);
          break;

        case "keluar":
          if (m.isGroup) {
            m.reply("Maaf, command ini hanya untuk chat pribadi");
          } else {
            const { logout } = require("./handler/users");
            logout(m, sender);
          }
          break;

        case "profilsaya":
          const { myProfile } = require("./handler/users");
          myProfile(m, sender);
          break;

        //LIHAT LIST MENU
        case "help":
        case "menu":
          m.reply(help(prefix));
          break;
          
        case "runtime":
          m.reply(runtimeCheck());
          break;

        // FITUR INFORMASI
        case "tanya":
        case "ai":
        case "openai":
        case "gpt":
          if (await checkUserPoint(m)) {
            const { gptiSearch } = require("./handler/searcher.js");
            gptiSearch(client, prefix, m, command, text, mek);
          }

          break;

        case "gptplus":
          if (await checkUserPremium(m)) {
              if (await checkUserPoint(m)) {
                  const { gptiPlusSearch } = require("./handler/searcher.js");
            gptiPlusSearch(client, prefix, m, command, text, mek);
            }
          }

          break;
          
        case "bing":
          if (await checkUserPremium(m)) {
              if (await checkUserPoint(m)) {
                const { bingSearch } = require("./handler/searcher.js");
                bingSearch(client, prefix, m, command, text, mek);
            }
          }

          break;

        case "g4f":
          if (await checkUserPremium(m)) {
              if (await checkUserPoint(m)) {
                  const { g4fSearch } = require("./handler/searcher.js");
              g4fSearch(client, prefix, m, command, text, mek);
              }
          }
          break;

        case "gemini":
          if (await checkUserPoint(m)) {
            const { geminiSearch } = require("./handler/searcher.js");
            geminiSearch(client, prefix, m, command, text, mek);
          }

          break;

        case "bardie":
          if (await checkUserPremium(m)) {
              if (await checkUserPoint(m)) {
                            const { bardieSearch } = require("./handler/searcher.js");
            bardieSearch(client, prefix, m, command, text, mek);  
              }
          }

          break;

        case "hercai":
          if (await checkUserPremium(m)) {
              if (await checkUserPoint(m)) {
                const { hercaiSearch } = require("./handler/searcher.js");
                hercaiSearch(client, prefix, m, command, text, mek);  
              };
          };

          break;

        case "openchat":
          if (await checkUserPremium(m)) {
              if (await checkUserPoint(m)) {
                const { openchatSearch } = require("./handler/searcher.js");
                openchatSearch(client, prefix, m, command, text, mek);
              }
          }

          break;

        case "llama":
          if (await checkUserPremium(m)) {
              if (await checkUserPoint(m)) {
                 const { llamaSearch } = require("./handler/searcher.js");
                llamaSearch(client, prefix, m, command, text, mek);
              }
          }

          break;

        case "codellama":
          if (await checkUserPremium(m)) {
              if (await checkUserPoint(m)) {
                  const { codellamaSearch } = require("./handler/searcher.js");
            codellamaSearch(client, prefix, m, command, text, mek);
              }
          }

          break;

        case "mixtral":
          if (await checkUserPremium(m)) {
              if (await checkUserPoint(m)) {
                  const { mixtralSearch } = require("./handler/searcher.js");
            mixtralSearch(client, prefix, m, command, text, mek);
              }
          }

          break;

        case "carigambar":
          if (await checkUserPremium(m)) {
            const { googleImageSearch } = require("./handler/searcher.js");
            googleImageSearch(client, prefix, m, command, text, mek);
          }

          break;

        case "wikipedia":
          if (await checkUserPremium(m)) {
            const { wikipediaSearch } = require("./handler/searcher.js");
            wikipediaSearch(client, prefix, m, command, text, mek);
          }

          break;

        case "brainly":
          if (await checkUserPremium(m)) {
            const { brainlySearch } = require("./handler/searcher.js");
            brainlySearch(client, prefix, m, command, text, mek);
          }

          break;

        case "kbbi":
          if (await checkUserPremium(m)) {
            const { kbbiSearch } = require("./handler/searcher.js");
            kbbiSearch(client, prefix, m, command, text, mek);
          }

          break;

        case "idtranslate":
          if (await checkUserPremium(m)) {
            const { translateID } = require("./handler/searcher.js");
            translateID(client, prefix, m, command, text, mek);
          }

          break;

        case "entranslate":
          if (await checkUserPremium(m)) {
            const { translateEN } = require("./handler/searcher.js");
            translateEN(client, prefix, m, command, text, mek);
          }

          break;

        // BUAT PENGINGAT TUGAS
        case "buattugas":
          if (await checkUserMember(m)) {
            if (m.isGroup) {
              m.reply("Maaf, command ini hanya untuk chat pribadi");
            } else {
              const { createTask } = require("./handler/studentTasks");
              createTask(prefix, command, m, sender, text);
            }
          }
          break;

        case "cektugas":
          if (await checkUserMember(m)) {
            if (m.isGroup) {
              m.reply("Maaf, command ini hanya untuk chat pribadi");
            } else {
              const { showTask } = require("./handler/studentTasks");
              showTask(m, sender);
            }
          }
          break;

        // BUAT PENGINGAT TUGAS GROUP
        case "buattugasgrup":
          if (await checkUserMember(m)) {
            if (m.isGroup) {
              if (await checkUserLeaderOrTeacher(m)) {
                const { createGroupTask } = require("./handler/studentTasks");
                createGroupTask(prefix, command, m, from, text);
              }
            } else {
              m.reply("Maaf, command ini hanya bisa dilakukan dalam grup");
            }
          }
          break;

        case "cektugasgrup":
          if (await checkUserMember(m)) {
            if (m.isGroup) {
              const { showGroupTask } = require("./handler/studentTasks");
              showGroupTask(m, from);
            } else {
              m.reply("Maaf, command ini hanya bisa dilakukan dalam grup");
            }
          }
          break;

        // KONTAK STAF SEKOLAH
        case "kontakstaf":
          if (await checkUserMember(m)) {
            // input : m, client, text
            const { kontakStaf } = require("./handler/kontakStaf");
            kontakStaf(m, client, text);
          }
          break;

        // JADWAL PELAJARAN SEKOLAH
        case "jadwalpelajaran":
          if (await checkUserMember(m)) {
            try {
              const filePath = "./files/jadwal_pelajaran.pdf";
              await client.sendDoc(
                from,
                filePath,
                jadwal_pelajaran(),
                "Jadwal Pelajaran.pdf",
                mek,
              );
            } catch (error) {
              console.error(error);
              m.reply("Maaf, terjadi kesalahan saat mengirim file.\n\nerror:\n"+error);
            }
          }
          break;

        //TEACHERS COMMAND
        case "mulaiabsen":
          if (await checkUserMember(m)) {
            if (m.isGroup) {
              if (await checkUserLeaderOrTeacher(m)) {
                // Membuat objek data pengguna baru
                const { processAbsenCommand } = require("./handler/absen");
                processAbsenCommand(m, sender, text);
              }
            } else {
              m.reply("Maaf, command ini hanya bisa dilakukan dalam grup");
            }
          }
          break;

        case "absen":
          if (await checkUserMember(m)) {
            if (m.isGroup) {
              // Membuat objek data pengguna baru
              const { processAbsenSiswa } = require("./handler/absen");
              processAbsenSiswa(m, sender, text);
            } else {
              m.reply("Maaf, command ini hanya bisa dilakukan dalam grup");
            }
          }
          break;

        // QUIZ
        case "quiz":
          if (await checkUserMember(m)) {
            if (m.isGroup) {
              // Membuat objek data pengguna baru
              const { quizMatematika } = require("./handler/quiz");
              quizMatematika(m, sender, client, mek);
            } else {
              m.reply("Maaf, command ini hanya bisa dilakukan dalam grup");
            }
          }
          break;

        case "jawab":
          if (await checkUserMember(m)) {
            if (m.isGroup) {
              // Membuat objek data pengguna baru
              const { answerQuizMatematika } = require("./handler/quiz");
              answerQuizMatematika(m, sender, text);
            } else {
              m.reply("Maaf, command ini hanya bisa dilakukan dalam grup");
            }
          }
          break;

        //=============================================================================
        //ONLY OWNER COMMAND
        case "ownermenu":
          if (itsOwner) {
            m.reply(ownerMenu(prefix));
          } else {
            m.reply(`Maaf, command ini hanya untuk owner.`);
          }
          break;
        case "msgmember":
          if (itsOwner) {
            const { msgMember } = require("./handler/users");
            msgMember(m, client, text);
          } else {
            m.reply(`Maaf, command ini hanya untuk owner.`);
          }
          break;
        case "cekprofile":
          if (itsOwner) {
            const { checkProfile } = require("./handler/users");
            checkProfile(prefix, command, m, text);
          } else {
            m.reply(`Maaf, command ini hanya untuk owner.`);
          }
          break;

        case "cekallmember":
          if (itsOwner) {
            const { checkAllMember } = require("./handler/users");
            checkAllMember(m);
          } else {
            m.reply(`Maaf, command ini hanya untuk owner.`);
          }
          break;
        case "setmember":
          if (itsOwner) {
            const { setMember } = require("./handler/users");
            setMember(prefix, command, m, text, client);
          } else {
            m.reply(`Maaf, command ini hanya untuk owner.`);
          }
          break;
        case "setpremium":
          if (itsOwner) {
            const { setPremium } = require("./handler/users");
            setPremium(prefix, command, m, text, client);
          } else {
            m.reply(`Maaf, command ini hanya untuk owner.`);
          }
          break;
        case "setleader":
          if (itsOwner) {
            const { setClassLeader } = require("./handler/users");
            setClassLeader(prefix, command, m, text, client);
          } else {
            m.reply(`Maaf, command ini hanya untuk owner.`);
          }
          break;
        case "addmembermanual":
          if (itsOwner) {
            const { addMemberManual } = require("./handler/users");
            addMemberManual(prefix, command, m, text, client);
          } else {
            m.reply(`Maaf, command ini hanya untuk owner.`);
          }
          break;
        case "setmemberall":
          if (itsOwner) {
            const { setMemberAll } = require("./handler/users");
            setMemberAll(prefix, command, m, text, client);
          } else {
            m.reply(`Maaf, command ini hanya untuk owner.`);
          }
          break;
        case "addpoint":
          if (itsOwner) {
            const { addPoint } = require("./handler/users");
            addPoint(prefix, command, m, text, client);
          } else {
            m.reply(`Maaf, command ini hanya untuk owner.`);
          }
          break;
        case "resetpoint":
          if (itsOwner) {
            const { resetPointManual } = require("./handler/users");
            resetPointManual(m);
          } else {
            m.reply(`Maaf, command ini hanya untuk owner.`);
          }
          break;
        case "kick":
          if (itsOwner) {
            const { kick } = require("./handler/users");
            kick(prefix, command, m, text, client);
          } else {
            m.reply(`Maaf, command ini hanya untuk owner.`);
          }
          break;
        case "addstaf":
          if (itsOwner) {
            // input : m, text
            const { addStaf } = require("./handler/kontakStaf");
            addStaf(m, text);
          } else {
            m.reply(`Maaf, command ini hanya untuk owner.`);
          }
          break;
        case "delstaf":
          if (itsOwner) {
            // input : m, text
            const { delStaf } = require("./handler/kontakStaf");
            delStaf(m, text);
          } else {
            m.reply(`Maaf, command ini hanya untuk owner.`);
          }
          break;
        case "savedata":
          if (itsOwner) {
            // input : m, text
            const Database = require("@replit/database")
            const db = new Database();
            const dbUserData = await db.get("users");
            let updatedDbUserData = dbUserData ? [...dbUserData] : [];
            if (updatedDbUserData) {
              console.log(updatedDbUserData)
              const { 
                  oldWriteDatabase, oldReadDatabase,
              } = require("./utils/database");
              await oldWriteDatabase("users", updatedDbUserData);
              m.reply("Data berhasil disimpan")
            }else{
              m.reply("Data kosong")
            }
          }
          break;
        //=============================================================================

        default: {
          if (isCmd2 && budy.toLowerCase() != undefined) {
            if (m.chat.endsWith("broadcast")) return;
            if (m.isBaileys) return;
            if (!budy.toLowerCase()) return;
            if (argsLog || (isCmd2 && !m.isGroup)) {
              m.reply(`Maaf, command *${prefix}${command}* tidak tersedia`);
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(
                chalk.black(chalk.bgRed("[ ERROR ]")),
                color("command", "turquoise"),
                color(`${prefix}${command}`, "turquoise"),
                color("tidak tersedia", "turquoise"),
              );
            } else if (argsLog || (isCmd2 && m.isGroup)) {
              m.reply(`Maaf, command *${prefix}${command}* tidak tersedia`);
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(
                chalk.black(chalk.bgRed("[ ERROR ]")),
                color("command", "turquoise"),
                color(`${prefix}${command}`, "turquoise"),
                color("tidak tersedia", "turquoise"),
              );
            }
          }
        }
      }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
