const {bot} = require('../index');
const Config = require('../lib/mongodb');

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    Config.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        if (err) console.error(err);

        let prefix = guild.prefix;
        let args = message.content.slice(prefix.length).trim().split(' ');
        let cmd = args.shift().toLowerCase();
        let command;
    
        // return message.channel.send(`**${user_tag}** is currently afk. Reason: ${key.reason}`);
        // return message.reply(`you have been removed from the afk list!`).then(msg => msg.delete(5000));
    
        if (message.content.includes(message.mentions.users.first())) {
            let mentioned = bot.afk.get(message.mentions.users.first().id);
            if (mentioned) message.channel.send(`**${mentioned.usertag}** is currently afk. Reason: ${mentioned.reason}`);
        }
        let afkcheck = bot.afk.get(message.author.id);
        if (afkcheck) return [bot.afk.delete(message.author.id), message.reply(`you have been removed from the afk list!`).then(msg => msg.delete(5000))];
    
        if (!message.content.startsWith(prefix)) return;
    
        if (bot.commands.has(cmd)) {
            command = bot.commands.get(cmd);
        } else {
            command = bot.commands.get(bot.aliases.get(cmd));
        }
    
        if (command) command.run(bot, message, args);
    
        // let cmd = bot.commands.get(command.slice(prefix.length));
        // if (cmd) cmd.run(bot, message, args);
    });
});