module.exports = {
    name: `Purge`,
    aliases: `[purge]`,
    category: `mod`,
    description: `To Delte Bulk Amount of Messages in a Channel`,
    usage: `!purge.js [amount]`,
    example: `!purge.js 70`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }

       

        if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!");
        if(!messageArray[1] || isNaN(messageArray[1])) return message.reply(`Specify Amount in Number e.g. !purge.js 30`)
        if(messageArray[1] > 100) return message.channel.send(`**Amount should not be more than 100**`)
        message.channel.bulkDelete(messageArray[1])
          .then(msg => message.channel.send(new Discord.RichEmbed().setColor(`RED`).setDescription(`Deleted ${msg.size} messages`)))
          .catch(console.error)
    }
}