module.exports = {
    name: `Give Role`,
    aliases: `[givrol]`,
    category: `mod`,
    usage: `!givrol.js [user] [role] [reason]`,
    description: `Gives a Mention User A Role`,
    example: `!givrol.js @Deku BOT He might be a bot`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

        let rMember = message.mentions.members.first()
        if(!rMember) return message.channel.send("Please provide a user to add a role too.")
        let role = message.guild.roles.find(r => r.name == messageArray[2]) || message.guild.roles.find(r => r.id == messageArray[2]) || message.mentions.roles.first()
        if(!role) return message.channel.send("Please provide a role to add to said user, Give Role Id or Mention Role.") 
        let reason = args.slice(2).join(" ")
        if(!reason) return message.channel.send("Please provide a reason")
    
        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.")
    
        if(rMember.roles.has(role.id)) {
            return message.channel.send(`${rMember.displayName}, already has the role!`)
        } else {
            await rMember.addRole(role.id).catch(e => console.log(e.message))
            message.channel.send(`The role, ${role.name}, has been added to ${message.mentions.members.first()}.`)
        }
    
        let embed = new Discord.RichEmbed()
        .setColor('#92A8D1')
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "Addrole")
        .addField("Mutee:", rMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString());
        message.channel.send(embed);


    }
}