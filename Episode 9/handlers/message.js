const {bot} = require('../index');
const config = require("../config.json");

bot.on("message", async message => {

    let prefix = config.prefix;
    let args = message.content.slice(prefix.length).split(/ +/);
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

    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === "dm") return;

     var command = bot.commands.get(cmd) || bot.commands.find(al => al.aliases && a.aliases.includes(cmd));
  
    if (!command) return;
    // checks if the message doesn't match a command name because this will make the bot crash every time you send the bot prefix only or if you type a wrong command name
    
    try {
    if (command) command.run(bot, message, args);
  } catch (error) {
    message.reply("there was an error")
    console.log(error)
  }
    // let cmd = bot.commands.get(command.slice(prefix.length));
    // if (cmd) cmd.run(bot, message, args);
});
