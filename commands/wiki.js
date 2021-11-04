module.exports = {
    name: `Wikipedia`,
    aliases: `[wiki]`,
    category: `fun`,
    usage: `!wiki.js [search]`,
    description: `Gets Wiki of Search`,
    example: `!wiki.js Google LLC`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        const Wiki = require(`wikijs`).default;
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }


        var word = message.content.slice(9);
        if(!word) return message.reply(`Provide Search e.g. !wiki.js Spiderman`);
        Wiki().search(word,1).then(function(data) {
            Wiki().page(data.results[0]).then(page => {
                page.summary().then(summary => {
                    var sumText = summary.toString().split(`\n`)
                    var continuation = function() {
                        var paragraph = sumText.shift();
                        paragraph=paragraph.slice(0,877);

                        if(paragraph) {
                            let embed = new Discord.RichEmbed()
                            .setColor(color)
                            .setTitle(`${word}`)
                            .addField(`Summary:`, `${paragraph}`)
                            .addField(`Read more in Wikipedia`);
                            message.channel.send(embed);
                            //message.channel.send(paragraph, continuation);
                        }
                    };
                    continuation();
                })
            })
        }, function(err) {
            message.channel.send(err);
        })
    }
}