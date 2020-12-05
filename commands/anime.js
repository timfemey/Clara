module.exports = {
    name: `Anime`,
    aliases: `[anime]`,
    category: `fun`,
    description: `Gets Info of a Given Anime search`,
    usage: `!anime.js [search]`,
    example: `!anime.js One Piece`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        const anilistnode = require('anilist-node');
        const anilist = new anilistnode();
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        
        if(messageArray[1]){
            let word = message.content.slice(10);
            let get = await anilist.search('anime', word, 1 , 2).then((data) => { return data.media[0].id });
            let res = await anilist.media.anime(get).then(data => { return data });
            let load = 'https://media.giphy.com/media/131tNuGktpXGhy/giphy.gif';
            let embed = new Discord.RichEmbed()
            .setColor('#92A8D1')
            .setImage(load);
            message.channel.send(embed)
               .then(msg => {msg.delete(4000)});
            embed = new Discord.RichEmbed()
                .setTitle(`${res.title.english}`)
                .setColor('#92A8D1')
                .addField("Status:", `${res.status}`)
                .addField("Episodes No.:", `${res.episodes}`)
                .addField("Popularity", `${res.popularity}`)
                .setDescription(`${res.description}`)
                .setThumbnail(`${res.coverImage.medium}`);
            message.channel.send(embed);
        }else {
            message.reply("What Anime are you searchin for?");
        }
    }
}