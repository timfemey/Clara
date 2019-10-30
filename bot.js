const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
var prefix = botSettings.prefix;
const request = require('request');
const cheerio = require('cheerio');
const numberfact = require('numbersapi');
const anilistnode = require('anilist-node');
const anilist = new anilistnode();


const bot= new Discord.Client({disableEveryone: false});



bot.on("ready", async () => {
    console.log('Clara');

   /* try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch (e) {
        console.log(e.stack);        
    } */
    console.log("Finished Loading.....");
    let statuses = [" !help", " Discord.js"];
    setInterval(function(){
        let status =  statuses[Math.floor(Math.random()*statuses.length)];
        bot.user.setPresence({ game: { name: status }, status: 'online' });
    }, 10000);
   
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
                .addField("ID", `${user.id}`)
                .setThumbnail(`${user.displayAvatarURL}`);
            }
    
           
        } else {
             embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("This is user info")
            .addField("Username", `${message.author.username}#${message.author.discriminator}`)
            .addField("ID", `${message.author.id}`)
            .setThumbnail(message.author.displayAvatarURL);
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


    if(command === `${prefix}wiki`) {
        if(messageArray[1]) {            
            let word = message.content.slice(6);
            if(word.match(/\s/g)) {
                    word = word.replace(/\s/g, "_");
            }
            message.channel.send("Wiki Feature is being Worked On!");
        }  
         
        message.channel.send("Working on...");              
    }

    if(command === `${prefix}prefix`){
        let myRole = "637739054233812992";
        let rol = message.member.roles;
        if(rol.has(myRole)){ message.channel.send(message.author.username + " Has Permission to Perform Action");}else{return message.reply("You do  not have Permission, Role required: PRO HERO")}
        
            if(messageArray[1]){
            let word = message.content.slice(8);
            if(!word.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)){
                return message.reply("New Prefix must be a Symbol");
            }
            if(word.match(/\s/g)){
                return message.reply("There should be no spaces");
            }
            message.channel.send(`@everyone Prefix has been changed from ${prefix} to ${word} by ${message.mentions.users.first()}`);
            prefix = word;
            
        } else {
            message.reply(`Assign new prefix to be assigned. e.g. ${prefix}prefix >`);
        }
    }

    if(command === `${prefix}youtube`) {
        if(messageArray[1]) {            
            const YouTube = require("discord-youtube-api");
 
            const youtubekey = new YouTube("AIzaSyDmT2mxmlhfI5jIrNp3ggQZI8Woj8xC53o");
             
                let word = message.content.slice(8);
                let get = await youtubekey.searchVideos(word);
                let rec = get.url;
                message.channel.send(`${rec}`);

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

    if(command === `${prefix}define`) {
        if(messageArray[1]){
           let word = message.content.slice(8);
          message.reply("Under Maintenance for some time")
        } else {
            return message.reply("What word do you want me to define?");
        }

        return;
    }

    if(command === `${prefix}numberfact`) {
        if(messageArray[1]){
            let word = message.content.slice(12);
            if(!word.match(/^[0-9]*$/)) return message.reply("Not a Number");
            let img = "" + `${word}`;
            numberfact.trivia(word, function(str){
                let embed = new Discord.RichEmbed()
                    .setTitle(`Facts about ${word}:`)
                    .setDescription(`${str}`);
                message.channel.send(embed)
            });
            
        } else {
            return message.channel.send("Specify a number")
        }
    }

    function image(message) {
        let query = ["gaming", "fortnite", "Anime", "FIFA", "PES", "minecraft", "nature", "PUBG"];
        let ser = query[Math.floor(Math.random()*query.length)];
        let load = 'https://media.giphy.com/media/131tNuGktpXGhy/giphy.gif';
        let embed = new Discord.RichEmbed().setImage(load);
        message.channel.send(embed)
           .then(msg => {msg.delete(6000)});
        var options = {
            url: "https://results.dogpile.com/serp?qc=images&q=" + `${ser}`,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"                
            }
        };
        request(options, function(error, response, responseBody){
            if(error) return;
            $ = cheerio.load(responseBody);
            var links = $(".image a.link");
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
            if(!urls.length) return;
            let embed = new Discord.RichEmbed().setImage(urls[Math.floor(Math.random()*urls.length)]);            
            message.channel.send(embed);
        })
    }

    

    if(command === `${prefix}image`){
       image(message);
    }


    if(command === `${prefix}help`){
        let embed = new Discord.RichEmbed()
         .setDescription("!define small = defines the word small you can replace small with any word you want \n !twitter = Fetches info a particular twitter user by inputing their username e.g. !twitter Justin Bieber \n !youtube = Searches for a video e.g !youtube PUBG Trailer \n !wiki = Searches for a Wikipedia article e.g. !wiki Man \n !userinfo = Gets Userinfo of the sender or another mentioned user e.g. !userinfo @Clara \n !avatar = Gets avatar of the sender or another mentioned user e.g.!avatar or !avatar @Clara \n !channel = Gives info of the current channel \n !numberfact = Gives a fact about a random number or a given number e.g. !numberfact or !numberfact 7 \n !meme = Generates a random meme \n  !image = Generates a random image." );        
        message.channel.send(embed);
    }

    if(command === `${prefix}channel`){
       let name = message.channel.name;
       let date = message.channel.createdAt;
       let id = message.channel.id;
       let type = message.channel.type;
       let embed = new Discord.RichEmbed()
        .addField("Name", `${name}`)
        .addField("Date Created At", `${date}`)
        .addField("ID", `${id}`)
        .addField("Channel Type", `${type}`);       
       message.channel.send(embed);
    }

    if(command === `${prefix}meme`){
        const randomPuppy = require('random-puppy');
        const subReddits = ["meme", "me_irl", "darkmeme"];
        let random = subReddits[Math.floor(Math.random()*subReddits.length)];
        let load = 'https://media.giphy.com/media/131tNuGktpXGhy/giphy.gif';
        let embed = new Discord.RichEmbed().setImage(load);
        message.channel.send(embed)
           .then(msg => {msg.delete(6000)});
        let img = await randomPuppy(random);
        embed = new Discord.RichEmbed()
         .setImage(img)
         .setTitle(`From /r/${random}`);
         message.channel.send(embed);   
    }

    if(command === `${prefix}anime`) {
        if(messageArray[1]){
            let word = message.content.slice(7);
            let get = await anilist.search('anime', word, 1 , 2).then((data) => { return data.media[0].id });
            let res = await anilist.media.anime(get).then(data => { return data });
            let load = 'https://media.giphy.com/media/131tNuGktpXGhy/giphy.gif';
            let embed = new Discord.RichEmbed().setImage(load);
            message.channel.send(embed)
               .then(msg => {msg.delete(4000)});
            embed = new Discord.RichEmbed()
                .setTitle(`${res.title.english}`)
                .addField("Status:", `${res.status}`)
                .addField("Episodes No.:", `${res.episodes}`)
                .addField("Popularity", `${res.popularity}`)
                .setDescription(`${res.description}`)
                .setThumbnail(`${res.coverImage.medium}`);
            message.channel.send(embed);
        }else {
            message.reply("What Anime are you searchin for?");
        }
    }
 

   
});

bot.on("guildMemberAdd", async member => {
    const welcome = member.guild.channels.find(ch => ch.name === 'welcome');
    if (!welcome) return;
    welcome.send(`Welcome to the server, ${member}`);
});

console.log("Loading...")


   

bot.login(botSettings.token);
