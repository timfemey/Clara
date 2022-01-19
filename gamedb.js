module.exports = {
  name: `Game Database`,
  aliases: `[gamedb]`,
  category: `info`,
  description: `Gets Game Info from RawG`,
  usage: `!gamedb.js [gamename]`,
  example: `!gamedb.js The Witcher 3`,
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
    message.channel.send("Working on Command");
    const axios = require("axios").default;

    // axios({
    //   url: ``,
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json", //
    //   },
    // })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  },
};
