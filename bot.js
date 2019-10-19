const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;

const bot= new Discord.Client({disableEveryone: true});



bot.on("ready", async () => {
    console.log('Hello!');

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch (e) {
        console.log(e.stack);        
    }
   
});

bot.on("message", async message => {
    if (message.author.bot) return;   
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    const withoutPrefix = message.content.slice(prefix.length);
	let split = withoutPrefix.split(/ +/);
	let bargs = split.slice(1); 
    

    if(!command.startsWith(prefix)) return;

    if(command === `${prefix}userinfo`) {

        let embed = new Discord.RichEmbed();
        

        if (bargs[0]) {
            const user = getUserFromMention(bargs[0]);
            if (!user) {
                return message.reply('Please use a proper mention if you want to see someone else\'s info.');
            } else {
                 embed = new Discord.RichEmbed()
                .setAuthor(user.username)
                .setDescription(`This is ${user}info`)
                .addField("Username", `${user.username}#${user.discriminator}`)
                .addField("ID", `${user.id}`);
            }
    
           
        } else {
             embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("This is user info")
            .addField("Username", `${message.author.username}#${message.author.discriminator}`)
            .addField("ID", `${message.author.id}`);
        }

        message.channel.send(embed);

        return;
    }

    if(command === `${prefix}avatar`) {
        // Send the user's avatar URL
        

        if (bargs[0]) {
            const user = getUserFromMention(bargs[0]);
            if (!user) {
                return message.reply('Please use a proper mention if you want to see someone else\'s avatar.');
            }
    
            return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL}`);
        } 
    
        return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL}`);

        return;
    }

    function getUserFromMention(mention) {
        	
	let matches = mention.match(/^<@!?(\d+)>$/);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return;

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return bot.users.get(id);   
    }


    if(command === `${prefix}wikipedia`) {
        if(messageArray[1]) {            
                const wikipedia = "https://en.wikipedia.org/wiki/";
                let word = messageArray[1];
                let search = `${wikipedia}`+`${word}`;
                message.channel.send(search);

        } else {
            return message.reply(`Invalid Request ${message.author.username}`);
        }

        return;
    }

    if(command === `${prefix}youtube`) {
        if(messageArray[1]) {            
            const YouTube = require("discord-youtube-api");
 
            const youtubekey = new YouTube("AIzaSyDmT2mxmlhfI5jIrNp3ggQZI8Woj8xC53o");
             
                let word = message.content.slice(8);
                let get = await youtubekey.searchVideos(word);
                let rec = get.url;
                message.channel.send(rec);

        } else {
            return message.reply(`Invalid Request ${message.author.username}`);
        }

        return;
    }

    
   
   
});

bot.on('guildMemberAdd', async member => {
    let welcome = member.guild.channels.find(ch => ch.name === 'welcome');
    if (!welcome) return;
    channel.send(`Welcome to the server, ${member}`);
});



   

bot.login(botSettings.token);