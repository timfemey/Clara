const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
var prefix = botSettings.prefix;
const request = require('request');
const cheerio = require('cheerio');
const numberfact = require('numbersapi');
const anilistnode = require('anilist-node');
const anilist = new anilistnode();
const malScraper = require('mal-scraper');
const ms = require('ms');
const fs = require('fs');
const { Canvas } = require('canvas-constructor');
let color = '#92A8D1';
let used = new Set();
let fetch = require('node-fetch');

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
    let statuses = [" !help", "Clara.db", `${bot.guilds.size} guild`];
    setInterval(function(){
        let status =  statuses[Math.floor(Math.random()*statuses.length)];
        bot.user.setPresence({ game: { name: status, type: "LISTENING" }, status: 'online' });
    }, 10000);
    
});



bot.on("message", async message => {
    if (message.author.bot) return;   

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    const withoutPrefix = message.content.slice(prefix.length);
	let split = withoutPrefix.split(/ +/);
    let bargs = split.slice(1);     


    if(command === `${prefix}userinfo`) {

        let embed = new Discord.RichEmbed();

        if (bargs[0]) {
            
            const user = getUserFromMention(bargs[0]);
            if (!user) {
                return message.reply('Please use a proper mention if you want to see someone else\'s info.');
            } else {
                 embed = new Discord.RichEmbed()
                .setAuthor(user.username)
                .setColor(color)
                .setDescription(`This is ${user} info`)
                .addField("Username", `${user.username}#${user.discriminator}`)
                .addField("ID", `${user.id}`)
                .addField("Status", `${user.presence.status}`)
                .setThumbnail(`${user.displayAvatarURL}`)
                .addField("Roles:", message.member.roles.map(roles => `${roles}`).join(', '), true)
                .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`);
            }
    
           
        } else {
             embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setColor(color)
            .setDescription("This is your user info")
            .addField("Username", `${message.author.username}#${message.author.discriminator}`)
            .addField("ID", `${message.author.id}`)
            .addField("Status", `${message.author.presence.status}`)
            .addField("Roles:", message.member.roles.map(roles => `${roles}`).join(', '), true)
            .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
            .setThumbnail(message.author.displayAvatarURL);
        }
         
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
            message.channel.send(embed);
        }

       
       
    }

    if(command === `${prefix}avatar`) {
        // Send the user's avatar URL
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }


        if (bargs[0]) {
            const user = getUserFromMention(bargs[0]);
            if (!user) {
                return message.reply('Please use a proper mention if you want to see someone else\'s avatar.');
            }
    
            return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL}`);
        } 
    
        return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL}`);

    }

    if(command === `${prefix}server`) {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
            let servlev = ["None", "Low", "Medium", "High", "Max"];
            let embed = new Discord.RichEmbed()
            .setColor('#92A8D1')
              .setAuthor(message.guild.name)
              .setThumbnail(message.guild.iconURL)
              .addField('Owner:', message.guild.owner.user.tag, true)
              .addField('ID:', message.guild.id, true)
              .addField('Members Count:', message.guild.members.filter(mem => mem.user.bot === true).size, true)
              .addField('Online:', message.guild.members.filter(mem => mem.presence.status != "offline").size, true)
              .addField('Verification Level:', servlev[message.guild.verificationLevel])
              .addField('Server Region:', message.guild.region, true)
              .addField(`Role List [${message.guild.roles.size - 1}]`, message.guild.roles.map(r => r).join(" ").replace("@everyone", " "));
              message.channel.send(embed);
        
    }

    function getUserFromMention(mention) {
        	
	let matches = mention.match(/^<@!?(\d+)>$/);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return message.reply("Not a Mention");

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return bot.users.get(id);   
    }


    
    if(command === `${prefix}youtube`) {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
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
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
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


    if(command === `${prefix}numberfact`) {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        if(messageArray[1]){
            let word = message.content.slice(12);
            if(!word.match(/^[0-9]*$/)) return message.reply("Not a Number");
            let img = "" + `${word}`;
            numberfact.trivia(word, function(str){
                let embed = new Discord.RichEmbed()
                .setColor('#92A8D1')
                    .setTitle(`Facts about ${word}:`)
                    .setDescription(`${str}`);
                message.channel.send(embed)
            });
            
        } else {
            return message.channel.send("Specify a number")
        }
    }

    function image(message) {
        
        let query = ["gaming hd walpaper", "fortnite hd walpaper", "Anime hd walpaper", "FIFA hd walpaper", "PES hd walpaper", "minecraft hd walpaper", "nature hd walpapr", "PUBG hd walpaper"];
        let ser = query[Math.floor(Math.random()*query.length)];
        let load = 'https://media.giphy.com/media/131tNuGktpXGhy/giphy.gif';
        let embed = new Discord.RichEmbed()
        .setColor('#92A8D1')
        .setImage(load);
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
            let embed = new Discord.RichEmbed()
            .setColor('#92A8D1')
            .setImage(urls[Math.floor(Math.random()*urls.length)]);            
            message.channel.send(embed);
        })
    }

    

    if(command === `${prefix}image`){
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
       image(message);
    }


  
    if(command === `${prefix}channel`){
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
       let name = message.channel.name;
       let date = message.channel.createdAt;
       let id = message.channel.id;
       let type = message.channel.type;
       let embed = new Discord.RichEmbed()
       .setColor('#92A8D1')
        .addField("Name", `${name}`)
        .addField("Date Created At", `${date}`)
        .addField("ID", `${id}`)
        .addField("Channel Type", `${type}`);       
       message.channel.send(embed);
    }

    if(command === `${prefix}meme`){
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        const randomPuppy = require('random-puppy');
        const subReddits = ["meme", "me_irl", "darkmeme", "Animemes", "gamingmemes"];
        let random = subReddits[Math.floor(Math.random()*subReddits.length)];
        let load = 'https://media.giphy.com/media/131tNuGktpXGhy/giphy.gif';
        let embed = new Discord.RichEmbed()
        .setColor('#92A8D1')
        .setImage(load);
        message.channel.send(embed)
           .then(msg => {msg.delete(6000)});
        let img = await randomPuppy(random);
        embed = new Discord.RichEmbed()
        .setColor('#92A8D1')
         .setImage(img)
         .setTitle(`From /r/${random}`);
         message.channel.send(embed);   
    }

    if(command === `${prefix}anime`) {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        if(messageArray[1]){
            let word = message.content.slice(7);
            let get = await anilist.search('anime', word, 1 , 2).then((data) => { return data.media[0].id });
            let res = await anilist.media.anime(get).then(data => { return data });
            let load = 'https://media.giphy.com/media/131tNuGktpXGhy/giphy.gif';
            let embed = new Discord.RichEmbed()
            .setColor('#92A8D1')
            .setImage(load);
            message.channel.send(embed)
               .then(msg => {msg.delete(4000)});
            embed = new Discord.RichEmbed()
                .setTitle(`${res.title.english}`)
                .setColor('#92A8D1')
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

    if(command === `${prefix}aninews`) {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
       if(messageArray[1]) return message.reply("Invalid");   
       const nbNews = 32;

        malScraper.getNewsNoDetails(nbNews)
        .then((data) => {
            let rand = data[Math.floor(Math.random()*data.length)]; 
            let embed = new Discord.RichEmbed()
            .setColor('#92A8D1')
            .setTitle(rand.title)
            .setURL(rand.link)
            .setThumbnail(rand.image)
            .setDescription(rand.text);
            message.channel.send(embed);
        })
        .catch((err) => console.log(err));
    }

    

    let nomes = message.channel.fetchMessages();
    //.then((messages) => {return messages.filter(men => men.author.id).size} )
    //.catch(console.error);
    if(command === `${prefix}bot`){
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        function duration(ms) {
            const sec = Math.floor((ms / 1000) % 60).toString()
            const min = Math.floor((ms / (1000 * 60)) % 60).toString()
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
            const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
            return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`
        }

        let embed = new Discord.RichEmbed()
           .setTitle('Bot Info')
           .setThumbnail(bot.user.displayAvatarURL)
           .addField('Uptime:', `${duration(bot.uptime)}`)
           .setColor('#92A8D1')
           .addField('No of Servers using Clara:',bot.guilds.size)
           .addField('No of Messages Sent in This Channel:', nomes)
           .addField('Bot Speed:', `${bot.ping} ms`)
           .addField('RAM Usage:', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}`, true)
           .addField('CPU Usage:', `${(process.cpuUsage().user / 1000 / 1000).toFixed(2)}%`, true);
    
        message.channel.send(embed);
    
    }

    if(command === `${prefix}givrol`) {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

        let rMember = message.mentions.members.first()
        if(!rMember) return message.channel.send("Please provide a user to add a role too.")
        let role = message.guild.roles.find(r => r.name == messageArray[2]) || message.guild.roles.find(r => r.id == messageArray[2]) || message.mentions.roles.first()
        if(!role) return message.channel.send("Please provide a role to add to said user, Give Role Id or Mention Role.") 
        let reason = args.slice(2).join(" ")
        if(!reason) return message.channel.send("Please provide a reason")
    
        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.")
    
        if(rMember.roles.has(role.id)) {
            return message.channel.send(`${rMember.displayName}, already has the role!`)
        } else {
            await rMember.addRole(role.id).catch(e => console.log(e.message))
            message.channel.send(`The role, ${role.name}, has been added to ${message.mentions.members.first()}.`)
        }
    
        let embed = new Discord.RichEmbed()
        .setColor('#92A8D1')
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "Addrole")
        .addField("Mutee:", rMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString());
        message.channel.send(embed);
    }

    if(command === `${prefix}remrol`){
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

        let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
        if (!rMember) return message.channel.send("Please provide a user to remove a role too.")
        let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
        if (!role) return message.channel.send("Please provide a role to remove from said user.")
        let reason = args.slice(2).join(" ")
        if (!reason) return message.channel.send("Please provide a reason")

        if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.")

        if (!rMember.roles.has(role.id)) {
            return message.channel.send(`${rMember.displayName}, doesnt have the role!`)
        } else {
            await rMember.removeRole(role.id).catch(e => console.log(e.message))
            message.channel.send(`The role, ${role.name}, has been removed from ${message.mentions.members.first()}.`)
        }

        let embed = new Discord.RichEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
            .setColor('#92A8D1')
            .addField("Moderation:", "Addrole")
            .addField("Mutee:", rMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString());
        message.channel.send(embed);
    }


    if(command === `${prefix}`){
        message.reply('Specify a Command, Use !help for commands');
    }    

    if(command === `${prefix}poll`) {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        let infoembed = new Discord.RichEmbed()
          .setColor('#92A8D1')
          .setTitle('Initiate Poll')
          .setDescription('!poll to initiate a simple yes or no poll')
          .addField('Syntax:', '!poll @Goku vs @Jiren <Must be exactly like this syntax>');
        if(!messageArray[1]) return message.channel.send(infoembed);
        if(messageArray[1].startsWith('@') && messageArray[3].startsWith('@')) {
            infoembed = new Discord.RichEmbed()
              .setColor('#92A8D1')
              .setTitle('Poll')
              .setDescription(`⚔️ ${messageArray[1]} VS ${messageArray[3]}`)
              .addField('Options', `React 🏳️ for ${messageArray[1]}, React  for 🏴 for ${messageArray[3]} and React 🎌 for Draw or both`)
              let v1 = messageArray[1];
              let v2 = messageArray[3];
              let agr = '🏳️';
              let agre = '🏴';
              let agree = '🎌';
              let msg = await message.channel.send(infoembed);
              await msg.react(agr);
              await msg.react(agre)
              await msg.react(agree)
              const filter = reaction => reaction.emoji.name === agr; 
              msg.awaitReactions(filter, {time: 15000}).then(collected => {
                  message.channel.send(`🗳️ Polls are Over`);
                  message.channel.send(`${v1}: ${collected.size} Votes`)
              })
              const tefilter = reaction => reaction.emoji.name === agre; 
              msg.awaitReactions(tefilter, {time: 15000}).then(collected => {
                  message.channel.send(`${v2}: ${collected.size} Votes`)
              })
              const teefilter = reaction => reaction.emoji.name === agree; 
              msg.awaitReactions(teefilter, {time: 15000}).then(collected => {
                  message.channel.send(`Draw/Both: ${collected.size} Votes`)
              })
                
        } else {
            return message.reply(infoembed);
        }
             
        
    }

    //Reminder 
    if(command === `${prefix}remindme`) {
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        let reminderTime = args[0]; 
    if (!reminderTime) {
        let embed = new Discord.RichEmbed() 
        .setColor('#92A8D1')
            .setTitle('Proper Usage') 
            .setDescription(`\`<prefix>remindme 15min any text or code\``);
        return message.channel.send(embed); 
    }
    if(!messageArray[3]) {
        let embed = new Discord.RichEmbed() 
            .setColor('#92A8D1')
            .setTitle('Proper Usage') 
            .setDescription(`\`<prefix>remindme 15min any text or code\``);
        return message.channel.send(embed); 
    }

    let reminder = args.slice(1).join(" "); 

    let remindEmbed = new Discord.RichEmbed() 
        .setColor('0x43f033')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .addField('Reminder', `\`\`\`${reminder}\`\`\``) 
        .addField('Time', `\`\`\`${reminderTime}\`\`\``)
        .setDescription(`I will remind you about ${reminder} in ${reminderTime}`) 
        .setTimestamp();

    message.channel.send(remindEmbed); 

    setTimeout(function() {
        let remindEmbed = new Discord.RichEmbed()
            .setColor('#00e9ff')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .setDescription('It is Time!')
            .addField('Reminder', `\`\`\`${reminder}\`\`\``)
            .setTimestamp()

            message.channel.send(remindEmbed);
    }, ms(reminderTime));
    }
    

    
    //Profile Message Leveling System
    let levelFile = require('./levels.json')
    var randomXp = Math.floor(10);
    let idUser = message.author.id;
    if(!levelFile[idUser]){
        levelFile[idUser] = {
            xp: 0,
            level: 0,
        }
    }
    levelFile[idUser].xp += randomXp;
    let levelUser = levelFile[idUser].level;
    let xpUser  = levelFile[idUser].xp;
    let nextLevelXp = levelUser * 500;
    if(nextLevelXp === 0) nextLevelXp = 100;
    if(xpUser >= nextLevelXp) {
        levelFile[idUser].level +=1;
        fs.writeFile('./levels.json', JSON.stringify(levelFile), err => {
            if (err) console.error(err);
        })
        let avres = await fetch(message.member.user.displayAvatarURL.replace(/\?size=2048$/g, "?size=128"));
        let avatar = await avres.buffer();
        let pcard = new Canvas(400, 180)
          .setColor(color)
          .addRect(84, 0, 316, 180)
          .setColor('#2C2F33')
          .addRect(0, 0, 84, 180)
          .addRect(169, 26, 231, 46)
          .addRect(224, 108, 176, 46)
          .setShadowColor('rgba(22, 22, 22, 1)')
          .setShadowOffsetY(5)
          .setShadowBlur(10)
          .addCircle(84, 90, 62)
          .addCircularImage(avatar, 84, 90, 64)
          .save()
          .createBeveledClip(20, 138, 128, 32, 5)
          .setColor('#23272A')
          .fill()
          .restore()
          .setTextAlign('center')
          .setTextFont('10pt sans-serif')
          .setColor('#FFFFFF')
          .addText(`${message.author.username}`, 285, 54)
          .addText(`Level: ${levelFile[idUser].level}`, 84, 159)
          .setTextAlign('left')
          .addText(`XP: ${levelFile[idUser].xp}`, 241, 136);
          const attachment = new Discord.Attachment(pcard.toBuffer(), 'Profile.png')
          await message.channel.send(`${message.author.username} Leveled Up`, attachment);
       //const attachment = new Discord.Attachment(canvas.toBuffer(), 'Profile.png');
       //message.channel.send(`👤`, attachment);
    }

    if(command === `${prefix}profile`) {        
        if(used.has(message.author.id)) {
            return message.reply('Cooldown!! 13s')
        } else {
            used.add(message.author.id);
            setTimeout(() => {
                used.delete(message.author.id)
            }, 14000);
        }
        //User Profile
        if(bargs[0]){
            let gen = getUserFromMention(bargs[0]);
            if(!gen) message.reply('Use A Proper Mention!')
            let avres = await fetch(gen.displayAvatarURL.replace(/\?size=2048$/g, "?size=128"));
            let avatar = await avres.buffer();
            if(!levelFile[gen.id]) {
                levelFile[gen.id] = {
                    xp: 0,
                    level: 0,
                }
            }
            let pcard = new Canvas(400, 180)
              .setColor(color)
              .addRect(84, 0, 316, 180)
              .setColor('#2C2F33')
              .addRect(0, 0, 84, 180)
              .addRect(169, 26, 231, 46)
              .addRect(224, 108, 176, 46)
              .setShadowColor('rgba(22, 22, 22, 1)')
              .setShadowOffsetY(5)
              .setShadowBlur(10)
              .addCircle(84, 90, 62)
              .addCircularImage(avatar, 84, 90, 64)
              .save()
              .createBeveledClip(20, 138, 128, 32, 5)
              .setColor('#23272A')
              .fill()
              .restore()
              .setTextAlign('center')
              .setTextFont('10pt sans-serif')
              .setColor('#FFFFFF')
              .addText(`${gen.username}`, 285, 54)
              .addText(`Level: ${levelFile[gen.id].level}`, 84, 159)
              .setTextAlign('left')
              .addText(`XP: ${levelFile[gen.id].xp}`, 241, 136);
              const attachment = new Discord.Attachment(pcard.toBuffer(), 'Profile.png')
              await message.channel.send(`${gen.username} Profile`, attachment);
              
        } else {
            let avres = await fetch(message.member.user.displayAvatarURL.replace(/\?size=2048$/g, "?size=128"));
            let avatar = await avres.buffer();
            let pcard = new Canvas(400, 180)
              .setColor(color)
              .addRect(84, 0, 316, 180)
              .setColor('#2C2F33')
              .addRect(0, 0, 84, 180)
              .addRect(169, 26, 231, 46)
              .addRect(224, 108, 176, 46)
              .setShadowColor('rgba(22, 22, 22, 1)')
              .setShadowOffsetY(5)
              .setShadowBlur(10)
              .addCircle(84, 90, 62)
              .addCircularImage(avatar, 84, 90, 64)
              .save()
              .createBeveledClip(20, 138, 128, 32, 5)
              .setColor('#23272A')
              .fill()
              .restore()
              .setTextAlign('center')
              .setTextFont('10pt sans-serif')
              .setColor('#FFFFFF')
              .addText(`${message.author.username}`, 285, 54)
              .addText(`Level: ${levelFile[idUser].level}`, 84, 159)
              .setTextAlign('left')
              .addText(`XP: ${levelFile[idUser].xp}`, 241, 136);
              const attachment = new Discord.Attachment(pcard.toBuffer(), 'Profile.png')
              await message.channel.send(`${message.author.username} Profile`, attachment);
        }
               
    }

    
    if(command === `${prefix}help`) {
        if(messageArray[1] === `fun` || `mod` || `info`) return false;
        message.channel.send(`Choose Category, Categories are: \n 1: **Fun: For Commands Asscoiating with Fun** \n !helpfun \n\n 2. **Info: For Commands Associating with Info** \n !helpinfo \n\n 3: **Moderation: For commands Associated With Server Moderation** \n !helpmod`);          
           
    }

    if(command === `${prefix}helpfun` ) {
        let embed2 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription('Commands Available')
        .setTitle(`Fun Commands`)
        .addField(`!anime`, ` Gets Info of An Anime \n !anime Fairy Tail `)
        .addField(`!aninews`, `Gives you Random Latest Anime News \n !aninews`)
        .addField(`!youtube`, `Searches for Specified Youtube Video \n !youtube Drake Nice for What`)
        .addField(`!twitter`, `Generates a given username profile information \n !twitter FUNimation`)
        .addField(`!remindme`, `Creates a Reminder !remindme 5min Wake Up`)
        .addField(`!image`, `Generates a random image \n !image`)
        .addField(`!meme`,`Gives you a Random Meme \n !meme`)
        .addField(`!numberfact`, `Gives you a fact about a number \n !numberfact 77`)
        .addField(`!poll`, `Start a Poll \n !poll @Mystic Vs @Strange <Follow this Syntax, Your Poll Argument 1 and Poll Argument 2 should start with @>`)
        message.channel.send(embed2);
    }     

    if(command === `${prefix}helpmod`) {
        let embed = new Discord.RichEmbed()
        .setDescription(`Moderation`)
        .addField(`!givrol`, `Gives a User a Role \n !givrol <User> <Role> <Reason>`)
        .addField(`!remrol`, `Removes a Role from User \n !remrol <User> <Role> <Reason>`)
        .setFooter(`More Commands Coming!!`);
        message.channel.send(embed);
    }

    if(command === `${prefix}helpinfo`) {
        let embed = new Discord.RichEmbed()
        .setColor(color)
        .setDescription('Commands Available')
        .setTitle(`Info Commands`)
        .addField(`!avatar`, ` Gets a User Avatar or Mentioned User Avatar \n !avatar or !avatar @Femi `)
        .addField(`!userinfo`, `Generates User Info of User or Mentioned User \n !userinfo or !userinfo @Clara`)
        .addField(`!server`, `Generates Info of Server \n !server`)
        .addField(`!bot`, `Generates Bot Info \n !bot`)
        .addField(`!channel`, `Generates Info of Current Channel \n !channel`)
        .addField(`!profile`,`Generates a User or Mentioned User Profile in Message Leveling System \n !profile`);
        message.channel.send(embed);
    }
    
    
});

bot.on("guildMemberAdd", async member => {
    const welcome = member.guild.channels.find(ch => ch.name === 'welcome');
    if (!welcome) return;
    member.setRoles(638002755533013003).catch(console.error)
    welcome.send(`Welcome to the server, ${member}`);
});

bot.on('presenceUpdate',  (oldStatus, newStatus) => {
    if(newStatus.presence.game === null) return;
    let game = newStatus.presence.game.name.toString();
    const general = newStatus.guild.channels.find(ch => ch.name === 'general');
    general.send(`${newStatus} is Playing ${game}`);
});


console.log("Loading...");
//pic url: https://images.wallpaperscraft.com/image/no_mans_sky_hello_games_ps4_pc_108038_1366x768.jpg

bot.login(botSettings.token);


