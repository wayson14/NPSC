module.exports = {
    name: 'tell',
    description: 'Tells the text to specific person',
    aliases: ['powiedz','speak','t'],
    


    execute(message, args){
        let fs = require('fs');
        let data = require('../data.json');
        let story = '';
        let targets = [];
        if (args.length>0){
            for (let i of args){
                if (i!=="undefined"){
                    story = story + i + " " ;
                }
            }
        }
        else {message.channel.send(`Lack of arguments!`);}

        targets = data["targets"];

        /*for (let i in targets){
            console.log(i);
            i.send(story);
        }*/

        let role = "716764316740747375"; //listener role
        //let y = message.guilds.get(role);
        //offlineMembers = guild.members.filter(member => member.presence.status === "offline");
        //console.log(y);
        //console.log( offlineMembers);
        
        message.channel.send(`${targets} <--- ${story}`);
    
    }

}