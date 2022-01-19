module.exports = {
  name: `8ball`,
  aliases: `[8ball]`,
  category: `fun`,
  description: `Magical Answers to your questions`,
  example: `!8ball.js Is Messi an Alien?`,
  usage: `!8ball [question]`,
  run: async (
    bot,
    message,
    args,
    messageArray,
    bargs,
    Discord,
    color,
    used,
    getUserFromMention
  ) => {
    var max = 14;
    var min = 0;
    if (!messageArray[1])
      return message.reply(
        `:8ball: What Question Do you Ask? !8ball.js [question]`
      );
    var decider = Math.floor(Math.random() * (max - min + 1)) + min;
    let embed = "";
    switch (decider) {
      case 0:
        embed = new Discord.RichEmbed()
          .setColor("AQUA")
          .addField(":question: Question", message.content.slice(10))
          .addField(":8ball: 8ball", "NO - it may cause cancer");
        message.channel.send(embed);

        break;
      case 1:
        embed = new Discord.RichEmbed()
          .setColor("AQUA")
          .addField(":question: Question", message.content.slice(10))
          .addField(":8ball: 8ball", "I don't suggest it");
        message.channel.send(embed);
        break;
      case 2:
        embed = new Discord.RichEmbed()
          .setColor("AQUA")
          .addField(":question: Question", message.content.slice(10))
          .addField(":8ball: 8ball", "JUST DO IT");
        message.channel.send(embed);
        break;
      case 3:
        embed = new Discord.RichEmbed()
          .setColor("AQUA")
          .addField(":question: Question", message.content.slice(10))
          .addField(":8ball: 8ball", "If you want to");
        message.channel.send(embed);
        break;
      case 4:
        embed = new Discord.RichEmbed()
          .setColor("AQUA")
          .addField(":question: Question", message.content.slice(10))
          .addField(":8ball: 8ball", "don't hesitate");
        message.channel.send(embed);
        break;
      case 5:
        embed = new Discord.RichEmbed()
          .setColor("AQUA")
          .addField(":question: Question", message.content.slice(10))
          .addField(":8ball: 8ball", "If in doubt jump of a cliff ");
        message.channel.send(embed);
        break;
      case 6:
        embed = new Discord.RichEmbed()
          .setColor("AQUA")
          .addField(":question: Question", message.content.slice(10))
          .addField(":8ball: 8ball", "no");
        message.channel.send(embed);
        break;
      case 7:
        embed = new Discord.RichEmbed()
          .setColor("AQUA")
          .addField(":question: Question", message.content.slice(10))
          .addField(":8ball: 8ball", "yes");
        message.channel.send(embed);

        break;
      case 8:
        embed = new Discord.RichEmbed()
          .setColor("AQUA")
          .addField(":question: Question", message.content.slice(10))
          .addField(":8ball: 8ball", "maybe");
        message.channel.send(embed);
        break;
      case 9:
        embed = new Discord.RichEmbed()
          .setColor("AQUA")
          .addField(":question: Question", message.content.slice(10))
          .addField(":8ball: 8ball", "nope");
        message.channel.send(embed);
        break;
      case 10:
        embed = new Discord.RichEmbed()
          .setColor("AQUA")
          .addField(":question: Question", message.content.slice(10))
          .addField(":8ball: 8ball", "Perhaps");
        message.channel.send(embed);
        break;
      case 11:
        embed = new Discord.RichEmbed()
          .setColor("AQUA")
          .addField(":question: Question", message.content.slice(10))
          .addField(":8ball: 8ball", "Most definitely yes");
        message.channel.send(embed);
        break;
      case 12:
        embed = new Discord.RichEmbed()
          .setColor("AQUA")
          .addField(":question: Question", message.content.slice(10))
          .addField(":8ball: 8ball", "Dont even think about it");
        message.channel.send(embed);
        break;
      case 13:
        embed = new Discord.RichEmbed()
          .setColor("AQUA")
          .addField(":question: Question", message.content.slice(10))
          .addField(":8ball: 8ball", "Very doubtful");
        message.channel.send(embed);
        break;
      case 14:
        embed = new Discord.RichEmbed()
          .setColor("AQUA")
          .addField(":question: Question", message.content.slice(10))
          .addField(":8ball: 8ball", "My sources say yes");
        message.channel.send(embed);
        break;
    }
  },
};
