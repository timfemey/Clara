module.exports = {
    name: `Invite Bot`,
    aliases: `[invite]`,
    category: `info`,
    description: `Sends Invite Link of Clara Bot to DM`,
    usage: `!invite.js`,
    example: `!invite.js`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        try {
            let link = await bot.generateInvite(["ADMINISTRATOR"]);
            message.author.send(link);
        } catch (e) {
            message.channel.send(`Error Getting Link`)      
            console.log(e.stack);  
        }

    }
}