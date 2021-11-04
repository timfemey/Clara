module.exports = {
    name: `Stop Poll`,
    aliases: `[stoppoll]`,
    category: `fun`,
    description: `Stops Poll Started by User`,
    usage: `!stoppoll.js`,
    example: `stoppoll.js`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        const poll = require(`./poll.js`);
        if(poll.stopright.has(message.author.id)) {
            poll.stopright.get(message.author.id).stop()
            poll.stopright.delete(message.author.id)
            poll.stopright.delete(message.channel.id)
            message.reply(`*Poll has been stopped successfully*`)
        } else {
            message.reply(`You dont have a Poll Going on`)
        }

        
    }
}