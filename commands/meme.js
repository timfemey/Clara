module.exports = {
    name: `Meme`,
    aliases: `[meme]`,
    category: `fun`,
    usage: `!meme.js`,
    description: `Sends a Random Meme`,
    example: `!meme.js`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        const randomPuppy = require('random-puppy');
        const subReddits = ["meme", "me_irl", "darkmeme", "Animemes", "gamingmemes"];
        let random = subReddits[Math.floor(Math.random()*subReddits.length)];
        let load = 'https://media.giphy.com/media/131tNuGktpXGhy/giphy.gif';
        let embed = new Discord.RichEmbed()
        .setColor('#92A8D1')
        .setImage(load);
        message.channel.send(embed)
           .then(msg => {msg.delete(6000)});
        let img = await randomPuppy(random);
        embed = new Discord.RichEmbed()
        .setColor('#92A8D1')
         .setImage(img)
         .setTitle(`From /r/${random}`);
         message.channel.send(embed);   


    }
}