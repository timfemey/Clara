module.exports = {
    name: `Spotify`,
    aliases: `[spotify]`,
    category: `fun`,
    description: `Gets a Info about a track or album from Spotify.com`,
    usage: `!spotify.js [type{track/album/artist}] [track name/album name/artist name]`,
    example: `!spotify.js track Bodak Yellow \n !spotify.js album Free Spirit \n !spotify.js artist Ella Mai`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        const spotifyModule = require(`spotify-web-api-node`);
        function delay(time) {
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    resolve()
                }, time)
            })
        }
        const spotify =  new spotifyModule({
            clientId: '2bd99fa3466b4ac8b72ee8cf967ced90',
            clientSecret: '9ba3ef01848644f2b09de6e5205aa179',
            redirectUri: `clara://callback`
        })
        spotify.clientCredentialsGrant({'2bd99fa3466b4ac8b72ee8cf967ced90':'9ba3ef01848644f2b09de6e5205aa179'}).then((data) => {
            spotify.setAccessToken(data.body.access_token)
        })
        message.channel.send(`**Processing...., Wait for 10s**`)
        if(!messageArray[1]) return message.reply(`Specify Type \n !spotify [type{track/album/artist}] [track name/album name/artist name]  e.g. !spotify track Shape of You`)
        if(!messageArray[2]) return message.reply(`Specify Track/Album Name/Artist Name: !spotify [type{track/album/artist}] [track name/album name/artist name]  e.g. !spotify track Shape of You`)
        let name = message.content.slice(18);
        await delay(7000)
        if(messageArray[1].toLowerCase() === `track`) {
            spotify.searchTracks(name, {limit:7}, (err, data) => {
                if(err) {
                    console.error(err)
                    return message.reply(`Error getting Data`)
                }  
                let pages = [];
                let page = 1;
                let info = data.body.tracks.items;
                info.forEach((song, index) => {

                    pages.push(`Name: ${song.name} \n \n Popularity: ${song.popularity} \n \n Track Album: ${song.album.name} \n \n URL: ${song.external_urls.spotify} \n \n Main Artist: ${song.artists[0].name} \n \n Duration: ${((song.duration_ms / (1000 * 60)) % 60).toFixed()} Mins`) 
                })  


                let embed = new Discord.RichEmbed()
                .setColor(`GREEN`)
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
            })
        } else if(messageArray[1].toLowerCase() === `album`) {
            spotify.searchAlbums(name, {limit: 1}, (err, data) => {
                if(err) {
                    console.error(err)
                    return message.reply(`Seems an Error occured in getting Album Data`)
                }
                let info = data.body.albums.items;
                info.forEach((album, index) => {
                    let embed = new Discord.RichEmbed()
                    embed.setTitle(album.name)
                    embed.setColor(`GREEN`)
                    embed.addField(`URL:`, album.external_urls.spotify)
                    album.images.forEach((img,no) => embed.setThumbnail(img.url))
                    embed.addField(`Release Date:`, album.release_date)
                    embed.addField(`No. of Tracks in Album:`, album.total_tracks)
                    message.channel.send(embed);
                })
            })
        } else if(messageArray[1].toLowerCase() === `artist`) {
            spotify.searchArtists(name, {limit:1}, (err, data) => {
                if(err) {
                    console.error(err)
                    return message.reply(`Seems an Error occured in getting Artist Data`)
                }
                let info = data.body.artists.items;
                info.forEach((artist, no) => {
                    let embed = new Discord.RichEmbed()
                    embed.setTitle(artist.name)
                    embed.setColor(`GREEN`)
                    embed.addField(`Followers:`, artist.followers.total)
                    embed.addField(`Popularity:`, artist.popularity)
                    embed.addField(`URL:`, artist.external_urls.spotify)
                    artist.images.forEach((dp,no) => embed.setThumbnail(dp.url))
                    embed.addField(`Genres:`, artist.genres)
                    message.channel.send(embed);
                })
            })
        }

       
    }
}