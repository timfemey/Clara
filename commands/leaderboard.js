module.exports = {
    name: `Leaderboard`,
    aliases: `[leaderboard]`,
    category: `fun`,
    description: `Shows you the Leaderboard of a Server or Rank of A Person`,
    usage: `!leaderboard.js / !leaderboard.js [user]`,
    example: `!leaderboard.js @Jax`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        let ecoBot = require(`discord-economy`)
        let user = message.mentions.users.first();
        if(user) {
            let leaderboard = await ecoBot.Leaderboard({
                filter: x => x.balance > 50,
                search: user.id
            })
            message.channel.send(`${user}: Rank-${leaderboard} `)
        } else {
            let embed = new Discord.RichEmbed()
            embed.setTitle(`Leaderboard`)
            embed.setColor(`RED`)
            ecoBot.Leaderboard({
                limit: 10,
                filter: x => x.balance > 50
            }).then(async users => {
                for (let i = 0; i < users.length; i++) {
                    let userName = await bot.fetchUser(users[i].userid);
                    embed.addField(`${i+1}`, `${userName.username} - ${users[i].balance}`)
                    
                }
                message.channel.send(embed)
            })
        }


    }
}