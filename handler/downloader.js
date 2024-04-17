exports.tiktokDL = async (m, client, text, mek) => {
    const { tikdown } = require("nayan-media-downloader");
    client.sendEmoticon(m.chat, "⏳", mek);
    await tikdown(text)
        .then( async (response) => {
            title = "📽️ Tiktok Downloader :\n" + response.data.title;
            data = response.data.video;
            await client.sendVideo(m.chat, data, title, mek);
            client.sendEmoticon(m.chat, "✅", mek);
            return;
        })
        .catch( (error) => {
            m.reply("Ada yang error : \n"+ error );
            client.sendEmoticon(m.chat, "❌", mek);
            return;
        })
}

exports.tiktokMusicDL = async (m, client, text, mek) => {
    const { tikdown } = require("nayan-media-downloader");
    client.sendEmoticon(m.chat, "⏳", mek);
    await tikdown(text)
        .then( async (response) => {
            title = "📽️ Tiktok Music Downloader :\n" + response.data.title;
            data = response.data.audio;
            await m.reply(title)
            await client.sendAudio(m.chat, data, title, mek);
            client.sendEmoticon(m.chat, "✅", mek);
            return;
        })
        .catch( (error) => {
            m.reply("Ada yang error : \n"+ error );
            client.sendEmoticon(m.chat, "❌", mek);
            return;
        })
}

// exports.youtubeDL = async (m, client, text, mek) => {
//     const { ytdown } = require("nayan-media-downloader");
//     client.sendEmoticon(m.chat, "⏳", mek);
//     await ytdown(text)
//         .then( async (response) => {
//             title = "📽 Youtube Downloader :\n" + response.data.author + " : " + response.data.title;
//             data = response.data.video;
//             console.log(response)
//             await m.reply(title)
//             await client.sendVideo(m.chat, data, title, mek);
//             client.sendEmoticon(m.chat, "✅", mek);
//             return;
//         })
//         .catch( (error) => {
//             m.reply("Ada yang error : \n"+ error );
//             client.sendEmoticon(m.chat, "❌", mek);
//             return;
//         })
// }