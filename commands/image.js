module.exports = {
    name: `Image`,
    aliases: `[image]`,
    category: `fun`,
    usage: `!image.js / !image.js [tag]`,
    description: `Gets a  Random Image from Google or an Image from a Given tag from Google`,
    example: `!image.js \n !image.js Minecraft`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        const cheerio = require('cheerio');
        const request = require('request');
        let ser;
        let query;
        if(messageArray[1]) {
            ser = message.content.slice(10)
            query = ser;
        } else {
            ser = ["gaming hd walpaper", "fortnite hd walpaper", 'Boku no Hero Academia hd pic', 'One Piece hd', 'Naruto hd', 'Laughing pics hd', "Anime hd walpaper", "FIFA hd walpaper", "PES hd walpaper", "minecraft hd walpaper", "nature hd walpapr", "PUBG hd walpaper"];
            query = ser[Math.floor(Math.random()*ser.length)];
        }
       
        function image(message) {
            let load = 'https://media.giphy.com/media/131tNuGktpXGhy/giphy.gif';
            let embed = new Discord.RichEmbed()
            .setColor('#92A8D1')
            .setImage(load);
            message.channel.send(embed)
               .then(msg => {msg.delete(6000)});
            var options = {
                url: "https://results.dogpile.com/serp?qc=images&q=" + `${query}`,
                method: "GET",
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Chrome"                
                }
            };
            request(options, function(error, response, responseBody){
                if(error) return;
                $ = cheerio.load(responseBody);
                var links = $(".image a.link");
                var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
                if(!urls.length) return;
                let embed = new Discord.RichEmbed()
                .setColor('#92A8D1')
                .setImage(urls[Math.floor(Math.random()*urls.length)]);            
                message.channel.send(embed);
            })
        }
        image(message);

       
    }
    
}