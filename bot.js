const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;

const bot= new Discord.Client({disableEveryone: true});
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;



bot.on("ready", async () => {
    console.log('Hello!');

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch (e) {
        console.log(e.stack);        
    }

    bot.user.setStatus("online");
   
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
                let word = message.content.slice(11);
                if(word.match(/\s/)) {
                    word = word.replace(/\s/g, "_");
                }
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

    if(command === `${prefix}twitter`){
       if(messageArray[1]) {
        const twitter = "https://twitter.com/";
        let word = message.content.slice(9);
        if(word.match(/\s/)) {
            word = word.replace(/\s/g, "");
        }
        let search = `${twitter}`+`${word}`;
        message.channel.send(search);
       } else {
           return message.reply(`Invalid Request ${message.author.username}`);
       }

       return;
    } 

    if(command === `${prefix}wordoftheday`) {
        if (messageArray[1]) return;
        const dayword = "https://www.merriam-webster.com/word-of-the-day";
        message.channel.send(dayword);
        
    }

    if(command === `${prefix}define`) {
        const dict = "https://www.merriam-webster.com/dictionary/";
        if(messageArray[1]){
            let word = message.content.slice(8);
            if(word.match(/\s/)) {
                word = word.replace(/\s/g, "%20");
            }
            let search = `${dict}`+`${word}`;
            message.channel.send(search);
        } else {
            return message.channel.reply("What word do you want me to define?");
        }

        return;
    }

    var getJSON = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
          var status = xhr.status;
          if (status === 200) {
            callback(null, xhr.response);
          } else {
            callback(status, xhr.response);
          }
        };
        xhr.send();
    };

    if(command === `${prefix}joke`) {
        const joke = "https://icanhazdadjoke.com/";
        message.channel.send(joke);
    }

    if(command === `${prefix}command`){
        let embed = new Discord.RichEmbed()
         .setDescription("!joke = Need a Joke")
         .setDescription("!define small = defines the word small you can replace small with any word you want")
         .setDescription("!wordoftheday = your daily word of the day")
         .setDescription("!twitter = Fetches info a particular twitter user by inputing their username e.g. !twitter Justin Bieber")
         .setDescription("!youtube = Searches for a video e.g !youtube PUBG Trailer")
         .setDescription("!wikipedia = Searches for a Wikipedia article e.g. !wikipedia Man")
         .setDescription("!userinfo = Gets Userinfo of the sender or another mentioned user e.g. !userinfo @Clara ")
         .setDescription("!avatar = Gets avatar of the sender or another mentioned user e.g.!avatar or !avatar @Clara");         
        message.channel.send(embed);
    }

   
   
});

bot.on("guildMemberAdd", async member => {
    const welcome = member.guild.channels.find(ch => ch.name === 'welcome');
    if (!welcome) return;
    welcome.send(`Welcome to the server, ${member}`);
});



   

bot.login(botSettings.token);
