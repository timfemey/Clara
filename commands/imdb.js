module.exports = {
    name: `IMDB`,
    aliases: `[imdb]`,
    category: `fun`,
    description: `Gets Info of a Movie from IMDB`,
    usage: `!imdb.js [moviename]`,
    example: `!imdb.js Avengers Endgame`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        if(!messageArray[1]) return message.reply(`Provide Movie Name e.g. !imdb.js Titanic`)
        const nameToimdb = require(`name-to-imdb`);
        const imdb = require(`imdb`);
        nameToimdb({name: message.content.slice(9)}, (err, res, inf) => {
            if(err) console.error(err)
            let load = 'https://media.giphy.com/media/131tNuGktpXGhy/giphy.gif';
            let loadembed = new Discord.RichEmbed()
            .setColor('#92A8D1')
            .setImage(load);
            message.channel.send(loadembed).then(msg => {msg.delete(6000)})
            var id = res;
            imdb(id, (err, data) => {
                if(err) message.reply(`An error occured while getting data`)
                let embed = new Discord.RichEmbed()
                  .setTitle(data.title)
                  .setThumbnail(data.poster)
                  .setColor(`YELLOW`)
                  .addField(`Description:`, data.description)
                  .addField(`Year of Release:`, data.year)
                  .addField(`Rating:`, data.contentRating)
                  .addField(`RunTime/Duration:`, data.runtime)
                  .addField(`MetaScore:`, data.metascore)
                  .addField(`Director:`, data.director)
                  .addField(`Writer:`, data.writer)
                  .addField(`Genre:`, data.genre)
                message.channel.send(embed)  

            })
        })

      
    }
}