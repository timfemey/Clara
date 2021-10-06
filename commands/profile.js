module.exports = {
    name: `Profile of User`,
    aliases: `[profile]`,
    category: `fun`,
    description: `Shows A User Profile or Mentioned User Profile`,
    usage: `!profile.js / !profile.js [user]`,
    example: `!profile.js @Misan`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
       
      
        let embed = new Discord.RichEmbed()
        if(messageArray[1]) tagUser()
      
        
        embed.setColor(color)
        embed.setTitle(message.author.username)        
        embed.setThumbnail(message.author.avatarURL)
        message.channel.send(embed)

        let tagUser = async () => {
            let user = message.mentions.users.first();
            embed = new Discord.RichEmbed()           
            embed.setColor(color)
            embed.setTitle(user.username)               
            embed.setThumbnail(user.avatarURL)
            message.channel.send(embed)
        } 

        
        
    }
}