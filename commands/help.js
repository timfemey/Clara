module.exports = {
    name: `Help`,
    aliases: `[help]`,
    category: `info`,
    description: `Shows Info of how to use the bot Commands`,
    usage: `!help.js / !help.js [command]`,
    example: `!help.js \n !help emojify`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        message.channel.send(`Check the #help channel to know what I can do`);
        /*let pages = [];
        let page = 1;

        function getAll(bot, message) {
            let each = bot.commands;
            each.forEach((x, y) => {
                //console.log(x);
                //console.log(y)
                let embed = new Discord.RichEmbed()
                .setColor(color)
                .setTitle(y.slice(0, -3))
                .addField(`Usage: ${x.usage}`)  
                .addField(`Category: ${x.category}`)
                .setDescription(`Description: ${x.description}`)
                .setFooter(`Use !help.js [command] for Info on a Specific Command`)
             message.channel.send(embed)
            
              /*  if(x.category === `fun`) {
                   pages.push(`**${y.slice(0, -3)}**: \n \n Usage: ${x.usage} \n \n Description: ${x.description}`)
                }
                if(x.category === `info`) {
                   pages.push(`**${y.slice(0, -3)}**: \n \n Usage: ${x.usage} \n \n Description: ${x.description}`)
                }
                if(x.category === `mod`) {
                    pages.push(`**${y.slice(0, -3)}**: \n \n Usage: ${x.usage} \n \n Description: ${x.description}`)
                }*/
            /*})

               
        }

        function getCMD(bot, message, input) {
            let embed = new Discord.RichEmbed()
            const cmd = bot.commands.get(input.toLowerCase()+`.js`);
            if(!cmd) return message.channel.send(embed.setColor(`RED`).setDescription(`Command not Found!`));

            let info = `Nothing Yet`
            if(cmd.name) info = `**Command Name:** ${cmd.name}`;
            if(cmd.aliases) info += `\n \n **Aliases:** ${cmd.aliases}`;
            if(cmd.description) info += `\n \n **Description:** ${cmd.description}`;
            if(cmd.category) info += `\n \n **Category:** ${cmd.category} `
            if(cmd.usage) {
                info += `\n \n **Usage:** ${cmd.usage}`
            }
            if(cmd.example) {
                info += `\n \n **Example:** ${cmd.example}`
            }
            return message.channel.send(embed.setDescription(info).setColor(color));
        }

        if(messageArray[1]) return getCMD(bot, message, messageArray[1])
        else {getAll(bot, message)}*/
    }
}