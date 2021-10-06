module.exports = {
    name: `Server Info`,
    aliases: `[server]`,
    category: `info`,
    usage: `!server.js`,
    description: `Gets the Current Info of the Server`,
    example: `!server.js`,
    run: async(bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
            let servlev = ["None", "Low", "Medium", "High", "Max"];
            let embed = new Discord.RichEmbed()
              .setColor("#92A8D1")
              .setAuthor(message.guild.name)
              .setThumbnail(message.guild.iconURL)
              .addField("Owner:", message.guild.owner.user.tag, true)
              .addField("ID:", message.guild.id, true)
              .addField(
                "Members Count:",
                message.guild.members.filter((mem) => mem.user.bot === true)
                  .size,
                true
              )

              .addField(
                "Verification Level:",
                servlev[message.guild.verificationLevel]
              )
              .addField("Server Region:", message.guild.region, true)
              .addField(
                `Role List [${message.guild.roles.size - 1}]`,
                message.guild.roles
                  .map((r) => r)
                  .join(" ")
                  .replace("@everyone", " ")
              );
              message.channel.send(embed);

  
    }
}