const { intro } = require("../utils/message.js");
require("dotenv").config();
const owner = process.env.OWNER_NUMBER;
const { usedPoint } = require("../utils/checkUser.js");

//=================================================================================================================
// Translate from https://www.npmjs.com/package/bing-translate-api
// Translate
exports.translateEN = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan Translate.\n\nContoh ID->EN:\n${prefix}${command} EN#Aku suka belajar bahasa Inggris\n\nContoh EN->ID:\n${prefix}${command} ID#I like learning English`,
    );
  client.sendEmoticon(m.chat, "⏳", mek);
  const { translate } = require("bing-translate-api");

  translate(text, null, "en")
    .then(async (res) => {
      // console.log(res.translation);
      await m.reply(
        `📖 *Translate Kyowa-Bot* 📖\n\n*Indonesia* :\n${text}\n\n*English* :\n_${res.translation}_`,
      );
      client.sendEmoticon(m.chat, "✅", mek);
      return;
    })
    .catch((err) => {
      console.error(err);
      m.reply("Maaf, Translate sedang bermasalah.");
      client.sendEmoticon(m.chat, "❌", mek);
      client.sendText(
        owner + "@s.whatsapp.net",
        "Maaf, translateEn sepertinya ada yang error: " + err, mek,
      );
      return;
    });
};

exports.translateID = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan Translate.\n\nContoh ID->EN:\n${prefix}${command} EN#Aku suka belajar bahasa Inggris\n\nContoh EN->ID:\n${prefix}${command} ID#I like learning English`,
    );
  client.sendEmoticon(m.chat, "⏳", mek);
  const { translate } = require("bing-translate-api");

  translate(text, null, "id")
    .then(async (res) => {
      // console.log(res.translation);
      await m.reply(
        `📖 *Translate Kyowa-Bot* 📖\n\n*English* :\n_${text}_\n\n*Indonesia* :\n${res.translation}`,
      );
      client.sendEmoticon(m.chat, "✅", mek);
      return;
    })
    .catch((err) => {
      console.error(err);
      m.reply("Maaf, Translate sedang bermasalah.");
      client.sendEmoticon(m.chat, "❌", mek);
      client.sendText(
        owner + "@s.whatsapp.net",
        "Maaf, translateId sepertinya ada yang error: " + err, mek,
      );
      return;
    });
};

// //=================================================================================================================
// // Chat AI from https://www.npmjs.com/package/chatgpt-unlimited
// // ChatGPT Unlimited
// exports.chatgptSearch = async (client, prefix, m, command, text, mek) => {
//     if (!text)
//         return m.reply(
//             `Untuk menggunakan Kyowa-Bot.\n\nContoh:\n${prefix}${command} Apa itu AI?`,
//         )
//     client.sendEmoticon(m.chat, "⏳", mek);
//     const message = intro() + text;
    
//     const Chat = require("chatgpt-unlimited");
    
//     const chatGpt = await Chat.create(message);
    
//     chatGpt
//         .then(async (response) => {
//             // console.log(response);
//             await m.reply(response);
//             await usedPoint(m);
//             client.sendEmoticon(m.chat, "✅", mek);
//             return;
//         })
//         .catch((error) => {
//             // Tangani kesalahan saat permintaan ke server
//             console.error("Error:", error);
//             m.reply("Maaf, G4F sedang bermasalah.");
//             client.sendEmoticon(m.chat, "❌", mek);
//             client.sendText(
//             owner + "@s.whatsapp.net",
//             "Maaf, hercaiSearch sepertinya ada yang error: " + error, mek,
//             );
//             return;
//         });
        
// }

//=================================================================================================================
// Chat AI from https://www.npmjs.com/package/gpti
// GPTI

exports.gptiSearch = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan Kyowa-Bot.\n\nContoh:\n${prefix}${command} Apa itu AI?`,
    );
  client.sendEmoticon(m.chat, "⏳", mek);
  const message = intro() + text;

  // import { gptweb } from "gpti";
  const { gpt } = require("gpti");

  gpt(
    {
      // prompt: message,
      // markdown: false
      prompt: message,
      model: "GPT-4",
      markdown: false,
    },
    async (err, data) => {
      if (err != null) {
        console.error("Error:", err);
        m.reply("Maaf, GPTI sedang bermasalah.");
        client.sendEmoticon(m.chat, "❌", mek);
        client.sendText(
          owner + "@s.whatsapp.net",
          "Maaf, gptiSearch sepertinya ada yang error: " + err, mek,
        );
        return;
      } else {
        // console.log(data);
        // console.log(response.message);
        await m.reply(data.gpt);
        await usedPoint(m);
        client.sendEmoticon(m.chat, "✅", mek);
        return;
      }
    },
  );
};

exports.gptiPlusSearch = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan Kyowa-Bot.\n\nContoh:\n${prefix}${command} Apa itu AI?`,
    );
  client.sendEmoticon(m.chat, "⏳", mek);
  const message = intro() + text;

  // import { gptweb } from "gpti";
  const { gptweb } = require("gpti");

  gptweb(
    {
      prompt: message,
      markdown: false,
    },
    async (err, data) => {
      if (err != null) {
        console.error("Error:", err);
        m.reply("Maaf, GPTI Plus sedang bermasalah.");
        client.sendEmoticon(m.chat, "❌", mek);
        client.sendText(
          owner + "@s.whatsapp.net",
          "Maaf, gptiPlusSearch sepertinya ada yang error: " + err, mek,
        );
        return;
      } else {
        // console.log(data);
        // console.log(response.message);
        await m.reply(data.gpt);
        await usedPoint(m);
        client.sendEmoticon(m.chat, "✅", mek);
        return;
      }
    },
  );
};

exports.bingSearch = async (client, prefix, m, command, text, mek) => {
    if (!text)
    return m.reply(
      `Untuk menggunakan Kyowa-Bot.\n\nContoh:\n${prefix}${command} Apa itu AI?`,
    );
    
    client.sendEmoticon(m.chat, "⏳", mek);
    const message = intro() + text;
    
    const { bing } = require("gpti");
    
    bing({
        messages: [
            {
                role: "user",
                content: message,
            }
        ],
        conversation_style: "Balanced",
        markdown: false,
        stream: false,
    }, async (err, data) => {
        if (err != null) {
        console.error("Error:", err);
        m.reply("Maaf, Bing sedang bermasalah.");
        client.sendEmoticon(m.chat, "❌", mek);
        client.sendText(
          owner + "@s.whatsapp.net",
          "Maaf, bingSearch sepertinya ada yang error: " + err, mek,
        );
        return;
      } else {
        console.log(data);
        await m.reply(data.message);
        await usedPoint(m);
        client.sendEmoticon(m.chat, "✅", mek);
        return;
      }
    });
}

//=================================================================================================================
// Chat AI https://www.npmjs.com/package/hercai
// HERCAI
exports.hercaiSearch = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan Kyowa-Bot.\n\nContoh:\n${prefix}${command} Apa itu AI?`,
    );
  client.sendEmoticon(m.chat, "⏳", mek);
  const message = intro() + text;

  const { Hercai } = require("hercai");
  const herc = new Hercai();
  herc
    .question({ model: "v3", content: message })
    .then(async (response) => {
      // console.log(response);
      await m.reply(response.reply);
      await usedPoint(m);
      client.sendEmoticon(m.chat, "✅", mek);
      return;
    })
    .catch((error) => {
      // Tangani kesalahan saat permintaan ke server
      console.error("Error:", error);
      m.reply("Maaf, G4F sedang bermasalah.");
      client.sendEmoticon(m.chat, "❌", mek);
      client.sendText(
        owner + "@s.whatsapp.net",
        "Maaf, hercaiSearch sepertinya ada yang error: " + error, mek,
      );
      return;
    });
};

//=================================================================================================================
// Chat AI https://www.npmjs.com/package/g4f
// G4F
exports.g4fSearch = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan Kyowa-Bot.\n\nContoh:\n${prefix}${command} Apa itu AI?`,
    );
  client.sendEmoticon(m.chat, "⏳", mek);
  const message = intro() + text;
  const { G4F } = require("g4f");
  const g4f = new G4F();
  const messages = [{ role: "user", content: message }];
  g4f
    .chatCompletion(messages)
    .then(async (response) => {
      // console.log(response);
      await m.reply(response);
      await usedPoint(m);
      client.sendEmoticon(m.chat, "✅", mek);
      return;
    })
    .catch((error) => {
      // Tangani kesalahan saat permintaan ke server
      console.error("Error:", error);
      m.reply("Maaf, G4F sedang bermasalah.");
      client.sendEmoticon(m.chat, "❌", mek);
      client.sendText(
        owner + "@s.whatsapp.net",
        "Maaf, g4fSearch sepertinya ada yang error: " + error, mek,
      );
      return;
    });
};

//=================================================================================================================
// Chat AI from https://www.npmjs.com/package/bardie-ts
// Bardie-ts
exports.bardieSearch = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan Kyowa-Bot.\n\nContoh:\n${prefix}${command} Apa itu AI?`,
    );
  client.sendEmoticon(m.chat, "⏳", mek);
  const message = intro() + text;

  const BardieTS = require("bardie-ts");
  const bard = new BardieTS();
  // console.log(bard);
  const options = {
    ask: message,
  };

  await bard
    .question(options)
    .then(async (response) => {
      // console.log(response.message);
      await m.reply(response.content);
      await usedPoint(m);
      client.sendEmoticon(m.chat, "✅", mek);
      return;
    })
    .catch((error) => {
      // Tangani kesalahan saat permintaan ke server
      console.error("Error:", error);
      m.reply("Maaf, Bardie sedang bermasalah.");
      client.sendEmoticon(m.chat, "❌", mek);
      client.sendText(
        owner + "@s.whatsapp.net",
        "Maaf, bardieSearch sepertinya ada yang error: " + error, mek,
      );
      return;
    });
};

//=================================================================================================================
// AI ChatGPT https://www.npmjs.com/package/nextchat
// opennchat
exports.openchatSearch = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan Kyowa-Bot.\n\nContoh:\n${prefix}${command} Apa itu AI?`,
    );
  client.sendEmoticon(m.chat, "⏳", mek);
  const { NextChat } = require("nextchat");

  const next = new NextChat();
  const message = intro() + text;
  next
    .openchat(message)
    .then(async (response) => {
      // console.log(response.message);
      await m.reply(response.message);
      await usedPoint(m);
      client.sendEmoticon(m.chat, "✅", mek);
      return;
    })
    .catch((error) => {
      // Tangani kesalahan saat permintaan ke server
      console.error("Error:", error);
      m.reply("Maaf, Open Chat sedang bermasalah.");
      client.sendEmoticon(m.chat, "❌", mek);
      client.sendText(
        owner + "@s.whatsapp.net",
        "Maaf, openchatSearch sepertinya ada yang error: " + error, mek,
      );
      return;
    });
};

// Bard Gemini
exports.geminiSearch = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan Kyowa-Bot.\n\nContoh:\n${prefix}${command} Apa itu AI?`,
    );
  client.sendEmoticon(m.chat, "⏳", mek);
  const { NextChat } = require("nextchat");

  const next = new NextChat();
  const message = intro() + text;
  next
    .gemini(message)
    .then(async (response) => {
      // console.log(response.message);
      await m.reply(response.message);
      await usedPoint(m);
      client.sendEmoticon(m.chat, "✅", mek);
      return;
    })
    .catch((error) => {
      // Tangani kesalahan saat permintaan ke server
      console.error("Error:", error);
      m.reply("Maaf, Gemini sedang bermasalah.");
      client.sendEmoticon(m.chat, "❌", mek);
      client.sendText(
        owner + "@s.whatsapp.net",
        "Maaf, geminiSearch sepertinya ada yang error: " + error, mek,
      );
      return;
    });
};

// Llama
exports.llamaSearch = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan Kyowa-Bot.\n\nContoh:\n${prefix}${command} Apa itu AI?`,
    );
  client.sendEmoticon(m.chat, "⏳", mek);
  const { NextChat } = require("nextchat");

  const next = new NextChat();
  const message = intro() + text;
  next
    .llama(message)
    .then(async (response) => {
      // console.log(response.message);
      await m.reply(response.message);
      await usedPoint(m);
      client.sendEmoticon(m.chat, "✅", mek);
      return;
    })
    .catch((error) => {
      // Tangani kesalahan saat permintaan ke server
      console.error("Error:", error);
      m.reply("Maaf, Llama sedang bermasalah.");
      client.sendEmoticon(m.chat, "❌", mek);
      client.sendText(
        owner + "@s.whatsapp.net",
        "Maaf, llamaSearch sepertinya ada yang error: " + error, mek,
      );
      return;
    });
};

// Codellama
exports.codellamaSearch = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan Kyowa-Bot.\n\nContoh:\n${prefix}${command} Apa itu AI?`,
    );
  client.sendEmoticon(m.chat, "⏳", mek);
  const { NextChat } = require("nextchat");

  const next = new NextChat();
  const message = intro() + text;
  next
    .codellama(message)
    .then(async (response) => {
      // console.log(response.message);
      await m.reply(response.message);
      await usedPoint(m);
      client.sendEmoticon(m.chat, "✅", mek);
      return;
    })
    .catch((error) => {
      // Tangani kesalahan saat permintaan ke server
      console.error("Error:", error);
      m.reply("Maaf, CodeLlama sedang bermasalah.");
      client.sendEmoticon(m.chat, "❌", mek);
      client.sendText(
        owner + "@s.whatsapp.net",
        "Maaf, codellamaSearch sepertinya ada yang error: " + error, mek,
      );
      return;
    });
};

// Mixtrall
exports.mixtralSearch = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan Kyowa-Bot.\n\nContoh:\n${prefix}${command} Apa itu AI?`,
    );
  client.sendEmoticon(m.chat, "⏳", mek);
  const { NextChat } = require("nextchat");

  const next = new NextChat();
  const message = intro() + text;
  next
    .mixtral(message)
    .then(async (response) => {
      // console.log(response.message);
      await m.reply(response.message);
      await usedPoint(m);
      client.sendEmoticon(m.chat, "✅", mek);
      return;
    })
    .catch((error) => {
      // Tangani kesalahan saat permintaan ke server
      console.error("Error:", error);
      m.reply("Maaf, Mixtal sedang bermasalah.");
      client.sendEmoticon(m.chat, "❌", mek);
      client.sendText(
        owner + "@s.whatsapp.net",
        "Maaf, mixtralSearch sepertinya ada yang error: " + error, mek,
      );
      return;
    });
};

//=================================================================================================================
// KBBI search
exports.kbbiSearch = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan KBBI.\n\nContoh:\n${prefix}${command} rumus`,
    );
  client.sendEmoticon(m.chat, "⏳", mek);
  const kbbi = require("kbbi-scraper");
  await kbbi(text)
    .then(async (res) => {
      console.log(res);
      await m.reply(`🔍KBBI :\n
*Kosakata :*\n${res.data.title}\n
*Artinya :*\n${res.data.arti}`);
      client.sendEmoticon(m.chat, "✅", mek);
    })
    .catch((error) => {
      // Tangani kesalahan saat permintaan ke server
      console.error("Error:", error);
      m.reply("Maaf, KBBI sedang bermasalah.");
      client.sendEmoticon(m.chat, "❌", mek);
      client.sendText(
        owner + "@s.whatsapp.net",
        "Maaf, kbbiSearch sepertinya ada yang error: " + error, mek,
      );
      return;
    });
};

//=================================================================================================================
//Google Image Search
exports.googleImageSearch = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan Google Gambar.\n\nContoh:\n${prefix}${command} bentuk prisma segitiga`,
    );
  client.sendEmoticon(m.chat, "⏳", mek);
  const gis = require('googlethis');
  await gis.image(text, { safe: false })
    .then(async (res) => {
      console.log(res);
      console.log(res.slice(0, 10));
      await client.sendImage(
        m.chat,
        res[0].url,
        `🔍Google Image : ${text}`,
        mek,
      );
      client.sendEmoticon(m.chat, "✅", mek);
      return;
    })
    .catch( async (error) => {
      // Tangani kesalahan saat permintaan ke server
      console.error("Error:", error);
      await m.reply("Maaf, Google Image Searcher sedang bermasalah.");
      await client.sendEmoticon(m.chat, "❌", mek);
      await client.sendText(
        owner + "@s.whatsapp.net",
        "Maaf, googleImageSearch sepertinya ada yang error: " + error, mek,
      );
      return;
    });
};

//=================================================================================================================
//Wikipedia search
exports.wikipediaSearch = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan Wikipedia.\n\nContoh:\n${prefix}${command} matematika`,
    );
  client.sendEmoticon(m.chat, "⏳", mek);

  const wiki = require("wikipedia");
  await wiki.setLang("id");
  await wiki
    .page(text)
    .then(async (res) => {
      // console.log(res)
      const summary = await res.summary();
      // console.log(summary)
      const text = `*🔍Wikipedia : ${summary.title}*\n
*info singkat:*\n${summary.description}\n
*deskripsi:*\n${summary.extract}\n
*link:*\n_${summary.content_urls.desktop.page}_`;
      await client.sendImage(m.chat, summary.originalimage.source, text, mek);
      client.sendEmoticon(m.chat, "✅", mek);
      return;
    })
    .catch( async (error) => {
      // Tangani kesalahan saat permintaan ke server
      console.error("Error:", error);
      await m.reply("Maaf, Wikipedia Searcher sedang bermasalah.");
      client.sendText(
        owner + "@s.whatsapp.net",
        "Maaf, wikipediaSearch sepertinya ada yang error: " + error, mek,
      );
      client.sendEmoticon(m.chat, "❌", mek);
      return;
    });
};

//=================================================================================================================
//brainly search
exports.brainlySearch = async (client, prefix, m, command, text, mek) => {
  if (!text)
    return m.reply(
      `Untuk menggunakan Brainly.\n\nContoh:\n${prefix}${command} apa rumus untuk menghitung luas lingkaran`,
    );
  const brainly = require("brainly.co.id");

  client.sendEmoticon(m.chat, "⏳", mek);

  await brainly(text)
    .then(async (res) => {
      console.log(res.data[0].questionMedia);
      const answer = `*🔍Brainly*\n
*pertanyaan:*\n${res.data[0].pertanyaan}\n
*jawaban:*\n${res.data[0].jawaban[0].text}`;
      await m.reply(answer);
      client.sendEmoticon(m.chat, "✅", mek);
      return;
    })
    .catch((error) => {
      // Tangani kesalahan saat permintaan ke server
      console.error("Error:", error);
      m.reply("Maaf, Brainly Searcher sedang bermasalah.");
      client.sendEmoticon(m.chat, "❌", mek);
      client.sendText(
        owner + "@s.whatsapp.net",
        "Maaf, brainlySearch sepertinya ada yang error: " + error, mek,
      );
      return;
    });
};
