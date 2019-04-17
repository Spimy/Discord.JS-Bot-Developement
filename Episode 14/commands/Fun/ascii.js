const ascii = require('ascii-art');

module.exports.run = async (bot, message, args) => {

    if (!args.join(' ')) return message.reply('please specify texts for the ascii conversion');

    ascii.font(args.join(' '), 'Doom', async txt => {
        message.channel.send(txt, {
            code: 'md'
        });
    });

};

module.exports.help = {
    name: 'ascii',
    aliases: []
}