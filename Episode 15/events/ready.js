const {bot} = require('../index');
const config = require("../config.json");
const Config = require('../lib/mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tutorial', {
    useNewUrlParser: true }, (err) => {
        if (err) return console.error(err);
        console.log('CONNECTED TO MONGODB!');
    });

bot.on("ready", async () => {
    console.log(`${bot.user.username} is ready for action!`);
    if (config.activity.streaming == true) {
        bot.user.setActivity(config.activity.game, {
            url: 'https://twitch.tv/username'
        });
    } else {
        bot.user.setActivity(config.activity.game, {
            type: 'WATCHING'
        }); //PLAYING, LISTENING, WATCHING
        bot.user.setStatus('dnd'); // dnd, idle, online, invisible
    }

    await bot.guilds.keyArray().forEach(id => {

        Config.findOne({
            guildID: id
        }, (err, guild) => {
            if (err) console.error(err);

            if (!guild) {
                const newConfig = new Config({
                    guildID: id,
                    prefix: config.prefix
                });

                return newConfig.save();
            }
        });

    });
});