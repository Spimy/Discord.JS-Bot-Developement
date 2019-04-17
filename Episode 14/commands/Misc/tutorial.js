const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  return message.channel.send('Hello World!');

};

module.exports.help = {
  name: "tutorial",
  aliases: ['tut', 'hello', 'world', 'helloworld']
};
