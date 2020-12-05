module.exports = {
    name: `Profile of User`,
    aliases: `[profile]`,
    category: `fun`,
    description: `Shows A User Profile or Mentioned User Profile`,
    usage: `!profile.js / !profile.js [user]`,
    example: `!profile.js @Misan`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        let ecoBot = require(`discord-economy`)
      
        let embed = new Discord.RichEmbed()
        if(messageArray[1]) tagUser()
        let bal = await ecoBot.FetchBalance(message.author.id)
        let daily = await ecoBot.Daily(message.author.id)
        let day  = '';
        if(daily.updated === true) {
            day = 'Daily  is Available'
        } else{
            day = `Daily in ${daily.timetowait}`
        }
        let leaderboard = await ecoBot.Leaderboard({
            filter: x => x.balance > 50,
            search: message.author.id
        })
        embed.setColor(color)
        embed.setTitle(message.author.username)
        embed.setDescription(`Rank - ${leaderboard}`)
        embed.addField(`Daily Credits Status:`, day)
        embed.addField(`Credits:`, bal.balance)
        embed.setThumbnail(message.author.avatarURL)
        message.channel.send(embed)

        let tagUser = async () => {
            let user = message.mentions.users.first();
            embed = new Discord.RichEmbed() 
            bal = await ecoBot.FetchBalance(user.id)
            daily = await ecoBot.Daily(user.id)
            day  = '';
            if(daily.updated === true) {
                day = 'Daily  is Available'
            } else{
                day = `Daily in ${daily.timetowait}`
            }
            leaderboard = await ecoBot.Leaderboard({
                filter: x => x.balance > 50,
                search: user.id
            })
            embed.setColor(color)
            embed.setTitle(user.username)
            embed.setDescription(`Rank - ${leaderboard}`)
            embed.addField(`Daily Credits Status:`, day)
            embed.addField(`Credits:`, bal.balance)
            embed.setThumbnail(user.avatarURL)
            message.channel.send(embed)
        } 

        
        
    }
}