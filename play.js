const ytdl = require('ytdl-core');

exports.run = async (client, message, args) => {
    if(!message.member.voiceChannel) return message.channel.send("Please Connecr to a voice Channel");
    if(message.guild.me.voiceChannel) return message.channel.send("Sorry am already in a Voice Channel");
    if(!args[0]) return message.channel.send("You Did not provide a Link");
    let validate = await ytdl.validateURL(args[0]);
    if(!validate) return message.channel.send("An error Occured, We are working on it!");
    let info = await ytdl.getInfo(args[0]);
    let connection = await message.member.voiceChannel.join();
    let dispatcher = await connection.playStream(ytdl(args[0], {filter: 'audioonly'}));
    message.channel.send(`Playing: ${info.title}`);

}

module.exports.help = {
    name: "play"
}