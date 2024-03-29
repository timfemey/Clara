module.exports = {
    name: `Remove Role`,
    aliases: `[remrol]`,
    category: `mod`,
    usage: `!remrol.js [user] [role] [reason]`,
    description: `Removes a User from a Role`,
    example: `!remrol.js @Deku Bot He is not a bot`,
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

        let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
        if (!rMember) return message.channel.send("Please provide a user to remove a role too.")
        let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
        if (!role) return message.channel.send("Please provide a role to remove from said user.")
        let reason = args.slice(2).join(" ")
        if (!reason) return message.channel.send("Please provide a reason")

        if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.")

        if (!rMember.roles.has(role.id)) {
            return message.channel.send(`${rMember.displayName}, doesnt have the role!`)
        } else {
            await rMember.removeRole(role.id).catch(e => console.log(e.message))
            message.channel.send(`The role, ${role.name}, has been removed from ${message.mentions.members.first()}.`)
        }

        let embed = new Discord.RichEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
            .setColor('#92A8D1')
            .addField("Moderation:", "Addrole")
            .addField("Mutee:", rMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString());
        message.channel.send(embed);

    }
}