const discord = require("discord.js");
const config = require('../../config.json');

module.exports.run = async (bot, message, args) => {

    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');
    let logs = message.guild.channels.find('name', config.logsChannel);

    if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('you do not have permissions to use this command!s');

    if (!target) return message.reply('please specify a member to ban!');
    if (!reason) return message.reply('please specify a reason for this ban!');
    if (!logs) return message.reply(`please create a channel called ${config.logsChannel} to log the bans!`);
    
    let embed = new discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(target.user.avatarURL)
        .addField('Banned Member', `${target.user.username} with an ID: ${target.user.id}`)
        .addField('Banned By', `${message.author.username} with an ID: ${message.author.id}`)
        .addField('Banned Time', message.createdAt)
        .addField('Banned At', message.channel)
        .addField('Banned Reason', reason)
        .setFooter('Banned user information', target.user.displayAvatarURL);

    message.channel.send(`${target.user.username} was banned by ${message.author} for ${reason}`);
    target.ban(reason);
    logs.send(embed);

};

module.exports.help = {
    name: 'ban',
    aliases: []
};
