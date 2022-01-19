var userCreatedPoll = new Map();
module.exports = {
  name: `Poll`,
  aliases: `[poll]`,
  category: `fun`,
  usage: `!poll.js [pollname]`,
  description: `Starts a Poll`,
  example: `!poll.js Black Clover vs Fire Force`,
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
    if (used.has(message.author.id)) {
      return message.reply("Cooldown!! 13s");
    } else {
      used.add(message.author.id);
      setTimeout(() => {
        used.delete(message.author.id);
      }, 14000);
    }
    let agr = "🏳️";
    let agre = "🏴";
    let agree = "🎌";

    if (!messageArray[1])
      return message.channel.send(
        `Provide Poll Name e.g. !poll.js The Champions`
      );
    let pollname = message.content.slice(9);
    if (userCreatedPoll.has(message.author.id))
      return message.reply(`You have a poll going on`);
    const results = message.member.guild.channels.find(
      (ch) => ch.name === "poll-results"
    );
    if (!results)
      message.channel.send(
        `**You Need to create a channel named poll-results for poll**`
      );
    message.channel.send(`Enter Options, Max 3. Type done when finished`);
    let filter = (m) => {
      if (m.author.id === message.author.id) {
        if (m.content.toLowerCase() === `done`) collector.stop();
        else return true;
      } else return false;
    };

    let collector = message.channel.createMessageCollector(filter, {
      maxMatches: 3,
    });
    let pollOptions = await getPollOptions(collector);
    if (pollOptions.length < 2)
      return message.reply(`Must Contain at least 2 Options Max: 3`);
    if (pollOptions.length > 3)
      return message.reply(`Options must be either 2 or 3(max)`);
    let embed = new Discord.RichEmbed();
    embed.setTitle(`Poll \n`);
    embed.setDescription(`**Poll Name:** ${messageArray[1]}`);
    embed.setDescription(pollOptions.join(`\n \n`));
    embed.setDescription(
      "To Vote, just send the word to the Channel and our Vote will be automatically added e.g. In a Poll with options 1, 2 and 3 to vote for 2, just send 2 to the channel and your vote will be added."
    );
    embed.addField(
      `Info:`,
      `React ${agr} to Start Poll or React ${agre} to Cancel Poll`
    );
    embed.setFooter(`Poll Lasts for 1hr`);
    let confirm = await message.channel.send(embed);
    await confirm.react(agr);
    await confirm.react(agre);

    let reactionFilter = (reaction, user) =>
      user.id === message.author.id && !user.bot;
    let reaction = (
      await confirm.awaitReactions(reactionFilter, { max: 1 })
    ).first();
    if (reaction.emoji.name === agr) {
      message.channel.send(`\n Poll will begin in 3s \n`);
      results.send(
        `\`\`\`A New Poll has been Created by ${message.author.id}  \n Poll Name: ${pollname}!\`\`\``
      );
      await delay(3000);
      message.channel.send(`\`\`\`Vote Now!!\`\`\``);
      let userVotes = new Map();
      let pollTally = new Discord.Collection(pollOptions.map((o) => [o, 0]));
      let pollFilter = (m) => !m.bot;
      let voteCollector = message.channel.createMessageCollector(pollFilter, {
        time: 3600020,
      });
      userCreatedPoll.set(message.author.id, voteCollector);
      await processPollResults(
        voteCollector,
        pollOptions,
        userVotes,
        pollTally
      );
      let max = Math.max(...pollTally.array());

      let entries = [...pollTally.entries()];
      let winners = [];
      let embed2 = new Discord.RichEmbed();
      let desc = "";
      embed2.setColor(`GREEN`);
      entries.forEach((entry) =>
        entry[1] === max ? winners.push(entry[0]) : null
      );
      entries.forEach(
        (entry) =>
          (desc +=
            `\n \n` +
            entry[0].toUpperCase() +
            ` recieved ` +
            entry[1] +
            ` Vote(s) \n`)
      );
      results.send(embed2.setDescription(desc));
      if (winners.length === 1) {
        results.send(
          embed2
            .setDescription(`${winners[0].toUpperCase()} is the Winner 🏆 `)
            .setColor(color)
        );
      } else {
        results.send(
          embed2.setDescription(`Its a Draw ${agree}`).setColor(`YELLOW`)
        );
      }
    } else if (reaction.emoji.name === agre) {
      message.channel.send(`**Poll Cancelled**`);
    }

    function getPollOptions(collector) {
      return new Promise((resolve, reject) => {
        collector.on(`end`, (collected) =>
          resolve(collected.map((m) => m.content.toLowerCase()))
        );
      });
    }

    function processPollResults(
      voteCollector,
      pollOptions,
      userVotes,
      pollTally
    ) {
      return new Promise((resolve, reject) => {
        voteCollector.on(`collect`, (msg) => {
          let option = msg.content.toLowerCase();
          if (!userVotes.has(msg.author.id) && pollOptions.includes(option)) {
            userVotes.set(msg.author.id, msg.content);
            let voteCount = pollTally.get(option);
            pollTally.set(option, ++voteCount);
          }
        });
        voteCollector.on(`end`, (collected) => {
          let embed3 = new Discord.RichEmbed();
          message.author.send(`${pollname} Poll Has Finished`);
          results.send(
            embed3
              .setDescription(`Collected ` + collected.size + ` Votes.`)
              .setColor(`RED`)
              .setTitle(`**PollName: ${pollname}**`)
          );
          resolve(collected);
        });
      });
    }

    function delay(time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    }
  },
  stopright: userCreatedPoll,
};
