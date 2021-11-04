module.exports = {
    name: `Spotify`,
    aliases: `[spotify]`,
    category: `fun`,
    description: `Gets a Info about a track or album from Spotify.com`,
    usage: `!spotify.js [type{track/album/artist}] [track name/album name/artist name]`,
    example: `!spotify.js track Bodak Yellow \n !spotify.js album Free Spirit \n !spotify.js artist Ella Mai`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
      message.channel.send(`This Command is being Fixed`)
       
      /*
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        const spotifyModule = require(`spotify`);
        function delay(time) {
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    resolve()
                }, time)
            })
        }        
        
      
        message.channel.send(`**Processing...., Wait for 10s**`)
        if(!messageArray[1]) return message.reply(`Specify Type \n !spotify [type{track/album/artist}] [track name/album name/artist name]  e.g. !spotify track Shape of You`)
        if(!messageArray[2]) return message.reply(`Specify Track/Album Name/Artist Name: !spotify [type{track/album/artist}] [track name/album name/artist name]  e.g. !spotify track Shape of You`)
        let name = message.content.slice(18);
        await delay(7000)






        //let embed = new Discord.RichEmbed()
        //message.channel.send(embed);
        

      */ 
    }
    
}