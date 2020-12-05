module.exports = {
    name: `Twitter`,
    aliases: `[twitter]`,
    category: `fun`,
    usage: `!twitter.js [user]`,
    description: `Gets the Info of a Twitter User`,
    example: `!twitter.js Davido`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }



       if(messageArray[1]) {
        const twitter = "https://twitter.com/";
        let word = message.content.slice(12);
        if(word.match(/\s/)) {
            word = word.replace(/\s/g, "");
        }
        let search = `${twitter}`+`${word}`;
        message.channel.send(search);
       } else {
           return message.reply(`Invalid Request ${message.author.username}`);
       }

       return;
    }
}