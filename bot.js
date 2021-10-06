const botSettings = require("./botsettings.json");
const Discord = require("v11-discord.js");
var prefix = botSettings.prefix;
const fs = require('fs');
let color = botSettings.color;
let used = new Set();
//let ecoBot = require(`discord-economy`)
//Clara
//const { Client, Intents } = require("discord.js");

/*const bot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});*/


const bot = new Discord.Client({disableEveryone:false});

bot.commands = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");

fs.readdir("./commands/", (err, files) => {
    if(err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0){
        console.log(`Nothing to Load`);
        return;
    }
    console.log(`Loading ${jsfiles.length} commands`);

    jsfiles.forEach((x, y) => {
        let props = require(`./commands/${x}`);
        console.log(`${y+1}: ${x} Loaded!`);
        bot.commands.set(x, props)
    }); 
});

bot.on("ready", async () => {
    console.log('Clara is Ready!');

    console.log("Finished Loading.....");
    let statuses = [" !help.js", "Clara.db", `${bot.guilds.size} guild`];
    setInterval(function(){
        let status =  statuses[Math.floor(Math.random()*statuses.length)];
        bot.user.setPresence({ game: { name: status, type: "LISTENING" }, status: 'online' });
    }, 10000);
    
});



bot.on("message", async message => {

    if(message.author.bot) return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    /*if(message.guild) {
        let xp = Math.floor(Math.random() * 50)
        let bal = await ecoBot.FetchBalance(message.author.id)
        if(bal.balance === 0) {
            ecoBot.AddToBalance(message.author.id, 70)
        } 
        await ecoBot.AddToBalance(message.author.id, xp)    
       
        

    }*/
    if(!command.startsWith(prefix)) return;
    let args = messageArray.slice(1);
    const withoutPrefix = message.content.slice(prefix.length);
	let split = withoutPrefix.split(/ +/);
    let bargs = split.slice(1);  
    function getUserFromMention(mention) {
        	
        let matches = mention.match(/^<@!?(\d+)>$/);
    
        // If supplied variable was not a mention, matches will be null instead of an array.
        if (!matches) return message.channel.send("Not a Mention");
    
        // However the first element in the matches array will be the entire mention, not just the ID,
        // so use index 1.
        const id = matches[1];
    
        return bot.users.get(id);   
    }  
     
    let cmd = bot.commands.get(command.slice(1));
    if(cmd) {
        cmd.run(bot, message, args, messageArray, bargs, Discord, color, used, getUserFromMention);  
        //message.channel.send(`A Command Subtracts 20 credits from Balance`).then(msg => msg.delete(5000)) 
        //ecoBot.SubtractFromBalance(message.author.id, 20)
    } 
});

bot.on("guildMemberAdd", async member => {
    const welcome = member.guild.channels.find(ch => ch.name === 'welcome');
    if (!welcome) return;
    welcome.send(`Welcome to the server, ${member}`);
});

/*
bot.on('guildMemberRemove', async member => {
    await ecoBot.Delete(member.id)
})*/





console.log("Loading...");
//pic url: https://images.wallpaperscraft.com/image/no_mans_sky_hello_games_ps4_pc_108038_1366x768.jpg

bot.login(botSettings.token);



