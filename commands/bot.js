module.exports = {
    name: `Bot`,
    aliases: `[bot]`,
    category: `info`,
    usage: `!bot.js`,
    description: `Shows you Bot Info`,
    example: `!bot.js`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
            function duration(ms) {
            const sec = Math.floor((ms / 1000) % 60).toString()
            const min = Math.floor((ms / (1000 * 60)) % 60).toString()
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
            const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
            return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`
        }

        let embed = new Discord.RichEmbed()
           .setTitle('Bot Info')
           .setThumbnail(bot.user.displayAvatarURL)
           .addField('Uptime:', `${duration(bot.uptime)}`)
           .setColor('color')
           .addField('No of Servers using Clara:',bot.guilds.size)
           .addField('Listeners Count:', process.listenerCount())
           .addField('Bot Speed:', `${bot.ping} ms`)
           .addField('RAM Usage:', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}`, true)
           .addField('CPU Usage:', `${(process.cpuUsage().user / 1000 / 1000).toFixed(2)}%`, true);
    
        message.channel.send(embed);

    }
}