module.exports = {
    name: 'Avatar',
    aliases: ['avatar'],
    category: `info`,
    usage: `!avatar.js / !avatar.js [user]`,
    example: `!avatar.js \n !avatar.js @Clara`,
    description: 'Display A User or Mentioned User Avatar',
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
         // Send the user's avatar URL
         if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
       

        if(bargs[0]) {
            let user = getUserFromMention(bargs[0])  
            return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL}`);
        }    
        if(bargs[1]) {
            let user = getUserFromMention(bargs[1])  
            return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL}`);
        }  
    
        return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL}`);

    }
}