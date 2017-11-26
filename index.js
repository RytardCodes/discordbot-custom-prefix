/*
    This bot is made by Boujee#9310 as a Guide for you guys on how to use CookiesDb and Discord.js

    This module is required at any times!
    */
const cookies = require('cookiesdb');
/*
    So is this one
    */
const Discord = require('discord.js');

/*
    Just a Variable defining Client as client
    */

var client = new Discord.Client();

client.on('ready', () => { // This is for when our bot logs in, it will console the string
    console.log('Logged in!')
});

client.on('message', (message) => { // We use this, for when a message is ran.
    if (message.author.bot || message.channel.type !== "text" || message.author === client.user) return; // If the autor is a bot, or the channel is not in guild, or the author is the bot, return.

    cookies.fetchCookies(`guildConf_${message.guild.id}`).then(c => {
        var prefix = c.text;
        
        if (!prefix) { // If c.text a.k.a prefix doesn't exist, prefix will be "!"
            prefix = "!";
        }

        var args = message.content.split(' ').slice(1);
        var cmd = message.content.split(' ')[0].replace(prefix, '');

        if (cmd === "ping") {
            message.channel.send('pong!')
        } else
        if (cmd === "setprefix") {
            cookies.updateText(`guildConf_${message.guild.id}`, args.join(' ')).then(p => { // Sets the custom prefix
                message.channel.send(`Changed the Guild prefix to **${p.text}**`)
            });
        }
    })
});

client.login()
