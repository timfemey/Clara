module.exports = {
    name: 'UserInfo',
    aliases: ['userinfo'],
    category: `info`,
    usage: `!userinfo.js / !userinfo.js [user]`,
    description: 'Display A User or Mentioned User Information',
    example: `!userinfo.js \n !userinfo.js @Clara`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        function getUserFromMention(mention) {
        	
            let matches = mention.match(/^<@!?(\d+)>$/);
        
            // If supplied variable was not a mention, matches will be null instead of an array.
            if (!matches) return message.reply("Not a Mention");
        
            // However the first element in the matches array will be the entire mention, not just the ID,
            // so use index 1.
            const id = matches[1];
        
            return bot.users.get(id);   
            }

        let embed = new Discord.RichEmbed();

        if (bargs[0]) {
            
            const user = getUserFromMention(bargs[0]);
            if (!user) {
                return message.reply('Please use a proper mention if you want to see someone else\'s info.');
            } else {
                 embed = new Discord.RichEmbed()
                .setAuthor(user.username)
                .setColor(color)
                .setDescription(`This is ${user} info`)
                .addField("Username", `${user.username}#${user.discriminator}`)
                .addField("ID", `${user.id}`)
                .addField("Status", `${user.presence.status}`)
                .setThumbnail(`${user.displayAvatarURL}`)
                .addField("Roles:", message.member.roles.map(roles => `${roles}`).join(', '), true)
                .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`);
            }
    
           
        } else {
             embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setColor(color)
            .setDescription("This is your user info")
            .addField("Username", `${message.author.username}#${message.author.discriminator}`)
            .addField("ID", `${message.author.id}`)
            .addField("Status", `${message.author.presence.status}`)
            .addField("Roles:", message.member.roles.map(roles => `${roles}`).join(', '), true)
            .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
            .setThumbnail(message.author.displayAvatarURL);
        }
         


    
    }

}
   