import { Event } from '../lib/index';
import { bot, guilds, users } from '../index'

module.exports = new Event('ready', () => {
    bot.client.guilds.cache.forEach((g) => {
        if(!guilds.data.has(g.id)) guilds.data.set(g.id, {
            id: g.id,
            levels: {
                rewards: []
            },
            members: {}
        })
        g.members.cache.forEach((m) => {
            if(!users.data.has(m.id)) users.data.set(m.id, {
                id: m.id
            })
            if(!(m.id in guilds.data.get(g.id).members)) {
                guilds.data.get(g.id).members[m.id] = {
                    warns: [],
                    permissions: [],
                    level: 0,
                    xp: 0
                };
            }
        })
    });
    console.log('Bot launched');
});