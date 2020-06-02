const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./config.json');


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file =>
    file.endsWith('.js'));

const allowedChannel = ['komendy','testy','ranking', 'zgłaszalnia', 'staff-only'];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Which story should I tell to who?');
})

client.on('message', message => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix) || message.author.bot ||
        !allowedChannel.includes(message.channel.name)) return


    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;


    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('Komenda zarezerwowana dla serwera!');
    }

    if(command.hasOwnProperty('specificChannel')){
        console.log(10);
        if (message.channel.name !== command.specificChannel){
            return message.reply(`Komenda może zostać wywołana tylko na: ${command.specificChannel}!`);
        }
    }   

    if (message.member.hasPermission('VIEW_AUDIT_LOG')) console.log('authorised');
    else console.log('banned from');

    if (command.args && !args.length) {
        let reply = `Brak argumentów! `;

        if (command.usage) {
            reply += `Prawidłowe użycie ${prefix}${command.name}:
             ${command.usage}`;

            return message.channel.send(reply);
        }
        return;
    }
    if (command.ticket === 'wymagany' && !message.member.hasPermission('VIEW_AUDIT_LOG')){
        return message.author.send('Nie masz wystarczających uprawnień do tej komendy!');}
    
    try {
        command.execute(message, args, client);
    }

    catch (error) {
        console.error(error);
        message.reply(`
Something has stricken me down,
see log for more info.`);

    }

})


client.login(token);