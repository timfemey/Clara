module.exports = {
    name: `Daily Credits`,
    aliases: `[dailycredits]`,
    category: `fun`,
    description: `Gives you your daily credits`,
    usage: `!daily.js`,
    example: `!daily.js`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        let ecoBot = require(`discord-economy`)
        let daily = await ecoBot.Daily(message.author.id)
        if(daily.updated === true) {
            message.channel.send(`:atm: ${message.author.username} you recieved your daily credits(100)`)
            await ecoBot.AddToBalance(message.author.id, 100)
        } else {
            message.reply(`Next daily in ${daily.timetowait}`)
        } 

    }
}