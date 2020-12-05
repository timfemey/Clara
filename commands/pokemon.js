module.exports = {
    name: `Pokemon`,
    aliases: `[pokemon]`,
    category: `fun`,
    description: `Shows Info a Pokemon`,
    usage: `!pokemon.js [pokemonname]`,
    example: `!pokemon.js raichu`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        if(!messageArray[1]) return message.reply(`Provide Pokemon Name`)
        let query = message.content.slice(12)
        ,msg = query.toLowerCase()
        ,options = {
            protocol: 'https',
            hostName: 'localhost:443',
            versionPath: '/api/v2',
            cacheLimit: 100 * 1000,
            timeout: 5 * 1000
        }
        let api = require(`pokedex-promise-v2`)
        ,pokeDex = new api();
        pokeDex.getPokemonByName(msg).then((data) => {
            //console.log(data)
            let embed = new Discord.RichEmbed()
             .setColor(color)
             .setTitle(msg)
             .addField(`Weight:`, data.weight)
             .setThumbnail(data.sprites.front_default)
             .addField(`Height:`, data.height)
             data.abilities.forEach((x, y) => embed.addField(`Ability ${y+1}`, x.ability.name))
             data.held_items.forEach((a, b) => embed.addField(`Item ${b+1}:`, a.item.name)) 
            message.channel.send(embed)
            
        })
        .catch((err) => {
            console.log(err)
            message.channel.send(`An Error Occured While Getting Pokemon`)
        })


       
    }
}


