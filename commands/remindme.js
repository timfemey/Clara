module.exports = {
    name: `Reminder`,
    aliases: `[remindme]`,
    category: `fun`,
    usage: `!remindme.js [time] [Reminder]`,
    description: `Sets a Reminder`,
    example: `!remindme.js 1hr Go Offline`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        const ms = require('ms');
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        let reminderTime = args[0]; 

    if (!reminderTime) {
        let embed = new Discord.RichEmbed() 
        .setColor('#92A8D1')
            .setTitle('Proper Usage') 
            .setDescription(`\`<prefix>remindme 15min any text or code\``);
        return message.channel.send(embed); 
    }
    if(!messageArray[3]) {
        let embed = new Discord.RichEmbed() 
            .setColor('#92A8D1')
            .setTitle('Proper Usage') 
            .setDescription(`\`<prefix>remindme 15min any text or code\``);
        return message.channel.send(embed); 
    }


    let reminder = args.slice(1).join(" "); 

    let remindEmbed = new Discord.RichEmbed() 
        .setColor('0x43f033')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .addField('Reminder', `\`\`\`${reminder}\`\`\``) 
        .addField('Time', `\`\`\`${reminderTime}\`\`\``)
        .setDescription(`I will remind you about ${reminder} in ${reminderTime}`) 
        .setTimestamp();

    message.channel.send(remindEmbed); 

    setTimeout(function() {
        let remindEmbed = new Discord.RichEmbed()
            .setColor('RED')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .setDescription('It is Time!')
            .addField('Reminder', `\`\`\`${reminder}\`\`\``)
            .setTimestamp()

            message.channel.send(remindEmbed);
    }, ms(reminderTime));
    }
}