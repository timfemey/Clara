module.exports = {
    name: `Transfer Credits`,
    aliases: `[transfer]`,
    category: `fun`,
    description: `Transfer of Credits to Other Users `,
    usage: `!transfer.js [user] [amount]`,
    example: `!transfer.js @Felix 200`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        let ecoBot = require(`discord-economy`)
        let user = message.mentions.users.first()
        let amount = messageArray[2]
        if(!user) return message.reply(`Specify the User you want to transfer to`)
        if(!amount) return message.reply(`Provide Amount e.g. !transfer.js @Femi 100`)
        let debit = await ecoBot.FetchBalance(message.author.id)
        if(amount > debit.balance) return message.reply(`You Dont have that amount of credits to transfer :atm:`)
        let transfer = await ecoBot.Transfer(message.author.id, user.id, amount)
        message.channel.send(`:atm: Transfer Successful`);

       
    }
}