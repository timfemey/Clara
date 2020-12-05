module.exports = {
    name: `Channel Info`,
    aliases: `[channel]`,
    category: `info`,
    usage: `!channel.js`,
    example: `!channel.js`,
    description: `Gets the Info of the Current Channel or Given Channel`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
       let name = message.channel.name;
       let date = message.channel.createdAt;
       let id = message.channel.id;
       let type = message.channel.type;
       if(type === `dm`) return message.channel.send(`This is not a Channel`)
       let embed = new Discord.RichEmbed()
        .setColor('#92A8D1')
        .addField("Name", `${name}`)
        .addField("Date Created At", `${date}`)
        .addField("ID", `${id}`)
        .addField("Channel Type", `${type}`) 
        .addField(`Category`, message.channel.parent)   
       message.channel.send(embed);


    }
}