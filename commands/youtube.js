module.exports = {
    name: `Youtube`,
    aliases: `[youtube]`,
    category: `fun`,
    usage: `!youtube.js [search]`,
    description: `Gets Youtube Video of Search`,
    example: `!youtube.js Drake Nice for What`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        const settings = require(`../botsettings.json`)
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        if(messageArray[1]) {            
            const YouTube = require("discord-youtube-api");

            var youTube = new YouTube(settings.youtubekey);

            let word = message.content.slice(11);

             let get = await youTube.searchVideos(word);

            message.channel.send(get.url)
            
             
;
 
             

        } else {
            return message.reply(`Invalid Request, provide a search term `);
        }

       

        return;
    }
}