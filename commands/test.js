module.exports = {
    name: 'test',
    description: 'Test',
    aliases: ['hej','cześć','joł','czuwaj'],
    


    execute(message, args){
        let fs = require('fs');
        message.channel.send('Fine!');
    }

}