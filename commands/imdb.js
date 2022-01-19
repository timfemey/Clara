module.exports = {
  name: `IMDB`,
  aliases: `[imdb]`,
  category: `fun`,
  description: `Gets Info of a Movie from IMDB`,
  usage: `!imdb.js [moviename]`,
  example: `!imdb.js Avengers Endgame`,
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
    if (!messageArray[1])
      return message.reply(`Provide Movie Name e.g. !imdb.js Titanic`);
  },
};
