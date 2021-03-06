const fs = require('fs')
const express = require('express')
const app = express()
const axios = require('axios').default
let dwebhook = "webhook here"

setInterval(async () => {
    const currentRoblox = await axios.get('http://setup.roblox.com/version')
    const savedRoblox = require('./currentroblox.json')
    if (savedRoblox.version !== currentRoblox.data) {
        const { Webhook, MessageBuilder } = require('discord-webhook-node');
        const hook = new Webhook(dwebhook);

		
        const embed = new MessageBuilder()
        .setAuthor('Roblox Updated!', '', 'http://setup.roblox.com/version')
        .addField('New Version',"```diff\n- " + currentRoblox.data + "``` \n", true)
        .addField('Old Version',"```diff\n+ " + savedRoblox.version + "```")
        .setColor('#00b0f4')
        .setFooter('do not dm to staff for this topic')
        .setTimestamp();
		
        hook.send(embed);
        hook.send("@everyone");
		
		
        console.log(`roblox updated ${currentRoblox.data}`)
        savedRoblox.version = currentRoblox.data
        fs.writeFileSync('currentroblox.json', JSON.stringify(savedRoblox, null, 4))
    }
}, 5000)

app.listen(process.env.PORT || 80, () => {
    console.log('Ready')
})
