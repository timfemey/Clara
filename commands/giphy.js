module.exports = {
    name: `Giphy`,
    aliases: `[giphy]`,
    category: `fun`,
    usage: `!giphy.js [search]`,
    description: `Gets GIF of a given search`,
    example: `!giphy.js Laughing`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        var giphy_config = {
            "api_key": "GVlG2tKzkNz6qqY0UmiNIzGAVXZpPASE",
            "rating": "r",
            "url": "http://api.giphy.com/v1/gifs/random",
            "permission": ["NORMAL"]
        };
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        const Gif = require(`giphy-api`)
        ,gif = new Gif(`${giphy_config.api_key}`);
        let load = 'https://media.giphy.com/media/131tNuGktpXGhy/giphy.gif';
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setImage(load);
        message.channel.send(embed)
            .then(msg => {msg.delete(7000)});
        gif.search({q: `${messageArray[1]}`, rating: giphy_config.rating}, function(err, res) {
            if(err) return console.error(err);
            let num = Math.floor(Math.random()*10);
            let emd = new Discord.RichEmbed()
            .setColor(color)
            .setImage(res.data[num].url);
            message.channel.send(emd);
        })



    }
}