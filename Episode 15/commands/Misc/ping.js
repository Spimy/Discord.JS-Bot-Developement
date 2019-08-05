const { RichEmbed } = require("discord.js");

module.exports.run = (bot, message, args) => {

    const embed = new RichEmbed()
    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL)
    .setDescription(`Pong!! ${bot.ping} ms...`)
    .setAuthor(bot.user.tag, bot.user.displayAvatarURL);
    message.channel.send(embed);
}

module.exports.help = {
    name: "ping",
    aliases: ["pong"],
}
