module.exports = {
    name: `Emojify`,
    aliases: `[emoji]`,
    category: `fun`,
    description: `Translates a Text to Emoji`,
    usage: `!emojify.js [text]`,
    example: `!emojify.js OMG Is that your Car`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        if(!messageArray[1]) return message.reply(`Provide Text to Emojify Syntax: !emojify.js [text]`)
        const emoji = require(`moji-translate`)
        let text = message.content.slice(12);
        let translate = emoji.translate(text)
        message.channel.send(translate);

    }
}