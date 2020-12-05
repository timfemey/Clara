module.exports = {
    name: `Game Database`,
    aliases: `[gamedb]`,
    category: `info`,
    description: `Gets Game Info from RawG`,
    usage: `!gamedb.js [gamename]`,
    example: `!gamedb.js The Witcher 3`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        const gameDB = require(`rawger`)
        ,rawger = await gameDB()
        ,{ games } = rawger; 
        if(!messageArray[1]) return message.reply(`Provide Game Name use !help.js for Help`)
        let gameName = message.content.slice(11);
        let res = (await games.search(gameName)).get()
        //res[].raw
        let pages = []
        ,page = 1;
        for (let index = 0; index < res.length; index++) {
            pages.push(`Name: ${res[index].raw.name} \n \n Rating: ${res[index].raw.rating} \n \n Releaseed: ${res[index].raw.released} \n \n Platforms: ${res[index].platforms} \n \n Suggestions Count: ${res[index].raw.suggestions_count} `)    
                    
        }

        var image = res[2].image ;
        let embed = new Discord.RichEmbed()
           .setColor(color)
           .setFooter(`Page ${page} of ${pages.length}`)  
           .setDescription(pages[page-1])
           .setThumbnail(image)
        message.channel.send(embed).then(msg => {
            msg.react('⏪').then(r => {
                msg.react('⏩')
                const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
                const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;

                const backwards = msg.createReactionCollector(backwardsFilter, {time: 60000})
                const forwards = msg.createReactionCollector(forwardsFilter, {time: 60000}) 

                backwards.on('collect', r => {
                    if(page === 1) return;
                    page--;
                    embed.setDescription(pages[page-1])
                    embed.setFooter(`Page ${page} of ${pages.length}`)
                    msg.edit(embed)
                })

                forwards.on('collect', r => {
                    if(page === pages.length) return;
                    page++;
                    embed.setDescription(pages[page-1])
                    embed.setFooter(`Page ${page} of ${pages.length}`)
                    msg.edit(embed)
                })

            })
        })  

        
    }
}