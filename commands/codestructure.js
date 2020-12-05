/*
module.exports = {
    name: ``,
    aliases: `[]`,
    category: ``,
    description: ``,
    usage: ``,
    example: ``,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention)
}

                let pages = [];
                let page = 1;
                let embed = new Discord.RichEmbed()
                .setColor(color)
                .setFooter(`Page ${page} of ${pages.length}`)  
                .setDescription(pages[page-1])
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
             
             
        let fs = require(`fs`);
        let db = require(`./database/clara.json`)
        let cmdInfo = 'avatar.js';
        db[cmdInfo] = {
            usage: 0
        }
        db[cmdInfo].usage += 1;

        fs.writeFile(`./commands/database/clara.json`, JSON.stringify(db), err => {
            if(err) console.error(err)
        })
*/