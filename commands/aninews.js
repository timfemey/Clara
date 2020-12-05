module.exports = {
    name: `Anime News`,
    aliases: `[aninews]`,
    category: `fun`,
    usage: `!aninews.js`,
    example: `!aninews.js`,
    description: `Gets the Latest Anime News`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        const malScraper = require('mal-scraper');
        if(messageArray[1]) return message.reply("Invalid");   
        const nbNews = 32;
        
        malScraper.getNewsNoDetails(nbNews)
        .then((data) => {
            let rand = data[Math.floor(Math.random()*data.length)]; 
            let embed = new Discord.RichEmbed()
            .setColor('#92A8D1')
            .setTitle(rand.title)
            .setURL(rand.link)
            .setThumbnail(rand.image)
            .setDescription(rand.text);
            message.channel.send(embed);
        })
        .catch((err) => console.log(err));

    }
}
