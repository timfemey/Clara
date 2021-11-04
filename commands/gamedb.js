module.exports = {
    name: `Game Database`,
    aliases: `[gamedb]`,
    category: `info`,
    description: `Gets Game Info from RawG`,
    usage: `!gamedb.js [gamename]`,
    example: `!gamedb.js The Witcher 3`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
         if (used.has(message.author.id)) {
           return message.reply("Cooldown!! 13s");
         } else {
           used.add(message.author.id);
           setTimeout(() => {
             used.delete(message.author.id);
           }, 14000);
         }

         let load = "https://media.giphy.com/media/131tNuGktpXGhy/giphy.gif";
         let embed = new Discord.RichEmbed().setColor(color).setImage(load);
         message.channel.send(embed).then((msg) => {
           msg.delete(7000);
         });

      const gameDB = require("steam-searcher");
      if (!messageArray[1])
        return message.reply(`Provide Game Name use !help.js for Help`);
      let gameName = message.content.slice(11);
      gameDB.find({ search: gameName }, (err, game) => {
        if (err) {
          message.channel.send("Error Occured");
          console.log(err);
        }

        message.channel.send('Loading.....')

        let pages = [],
          page = 1;

        pages.push(
          `Name: ${game.name} \n \n Reccomendations: ${game.recommendations.total} \n \n Releaseed: ${game.release_date.date} \n \n Price: ${game.price_overview.final_formatted} \n \n Description: ${game.short_description} `
        );

        var image = game.header_image;
        let embed = new Discord.RichEmbed()
          .setColor(color)
          .setFooter(`Page ${page} of ${pages.length}`)
          .setDescription(pages[page - 1])
          .setThumbnail(image);
        message.channel.send(embed).then((msg) => {
          msg.react("⏪").then((r) => {
            msg.react("⏩");
            const backwardsFilter = (reaction, user) =>
              reaction.emoji.name === "⏪" && user.id === message.author.id;
            const forwardsFilter = (reaction, user) =>
              reaction.emoji.name === "⏩" && user.id === message.author.id;

            const backwards = msg.createReactionCollector(backwardsFilter, {
              time: 60000,
            });
            const forwards = msg.createReactionCollector(forwardsFilter, {
              time: 60000,
            });

            backwards.on("collect", (r) => {
              if (page === 1) return;
              page--;
              embed.setDescription(pages[page - 1]);
              embed.setFooter(`Page ${page} of ${pages.length}`);
              msg.edit(embed);
            });

            forwards.on("collect", (r) => {
              if (page === pages.length) return;
              page++;
              embed.setDescription(pages[page - 1]);
              embed.setFooter(`Page ${page} of ${pages.length}`);
              msg.edit(embed);
            });
          });
        });
      });

        
    }
    
}