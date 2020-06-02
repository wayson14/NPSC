module.exports = {
    name: 'tell',
    description: 'Tells the text to specific person',
    aliases: ['powiedz','speak','t'],
    


    execute(message, args){
        let fs = require('fs');
        let data = require('../data.json');
        let targets = data["targets"]; //backdoor used, when role is wrong
        
        let seek_role = data["listening role"];
        
        guild = message.guild;
        const guild_id = guild.id;

        let role = guild.roles.cache.find(role => role.name === seek_role);
        let role_members = role.members.array();

        function story_maker(args){
            let story = '';
            if (args.length>0){
                for (let i of args){
                    if (i!=="undefined"){
                        story = story + i + " " ;
                    }
                }
            }
            else {message.channel.send(`Lack of content to send!`);}
            return story;
        }

        function story_sender(story, id_array){
            if (id_array.length <1) {
                return console.log('Array of names has appeard too short');
            }
            for (let id of id_array){
                id.send(story);
            }
            return console.log('Messages have been sent!');
        }
        const story = story_maker(args);
        story_sender(story, role_members);

        console.log(`Guild ID: ${guild_id}`);
        console.log(`Role: ${role}, name: ${role.name}, members: ${role_members}`);
        
        
        message.channel.send(`${role_members} <--- ${story}`);
    
    }

}