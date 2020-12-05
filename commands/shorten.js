module.exports = {
    name: `Shorten Link`,
    aliases: `[linkshortener]`,
    category: `fun`,
    description: `Shortens any Given Link`,
    usage: `!shorten.js [link]`,
    example: `!shorten.js https://en.wikipedia.org/wiki/Sister`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
       
        const shorten = require(`isgd`)
        const url = message.content.slice(11);
        if(!messageArray[1] || messageArray[2]) return message.reply(`Syntax: !shorten.js [link]`);
        shorten.shorten(url, (data) => {
            if(data.startsWith(`Error:`)) return message.reply(`Provide a Valid URL`)
            message.channel.send(`Processing....`).then(msg => msg.delete(5000))
            message.channel.send(`**${data}**`)
        })
    }
}