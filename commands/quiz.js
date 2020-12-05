module.exports = {
    name: `Quiz`,
    aliases: `[quiz]`,
    category: `fun`,
    description: `Play a Quiz`,
    usage: `!quiz.js`,
    example: `!quiz.js`,
    run: async (bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention) => {
        const fetch = require(`node-fetch`);
        const arr = [`23`, `24`, `22`, `17`, `27`, `31`, `9`, `26`]
        let i = Math.floor(Math.random()*7);
        const getdata = await fetch(`https://opentdb.com/api.php?amount=7&category=${arr[i]}&type=boolean`);
        const data = await getdata.json();
        let length = data.results.length;
        let randno = Math.floor(Math.random() * length)
        let randques = data.results[randno];
        let question = data.results[randno].question;
        var ans = randques.correct_answer;
        let embed = new Discord.RichEmbed()
         .setColor(color)
         .setTitle(`Quiz`)
         .setDescription(`Category: ${randques.category}`)
         .addField(`Question:`, `${question}`)
         .setFooter(`Answer True or False, Time Limit: 9s`)
        message.channel.send(embed);
        let filter = m => {
            if(m.author.id === message.author.id) {
                return true;
            }
            else return false;
        }
 
        let collector = message.channel.createMessageCollector(filter, {maxMatches: 1, max:1, time: 10000});
        setTimeout(() => {
            message.channel.send(new Discord.RichEmbed().setColor(`YELLOW`).setDescription(`Time Up!!`))
        }, 11000)
        function processValue(collector) {
            return new Promise((resolve, reject) => {
                 collector.on(`collect`, collected =>  resolve(collected.content.toLowerCase()));
            });
        }
        let response = await processValue(collector);
        if(response === ans.toLowerCase()) {
            message.channel.send(new Discord.RichEmbed().setColor(`GREEN`).setDescription(`**You are Correct!!! 🏳️**`))
        } else {
            message.channel.send(new Discord.RichEmbed().setColor(`RED`).setDescription(`**You are InCorrect! 🏴**`).addField(`Correct Answer:`, `${ans.toLowerCase()}`))
        }


        
        //message.channel.send(new Discord.RichEmbed().setColor(`GREEN`).setDescription(`**You are Correct!!! 🏳️**`))
        //message.channel.send(new Discord.RichEmbed().setColor(`RED`).setDescription(`**You are InCorrect! 🏴**`))
    }
}