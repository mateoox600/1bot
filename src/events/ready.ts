import { Event } from '../lib/index';
import { bot, guilds, users } from '../index'

module.exports = new Event('ready', () => {
    bot.client.guilds.cache.forEach((v) => {
        if(!guilds.data.has(v.id)) guilds.data.set(v.id, {
            id: v.id,
            levels: {
                rewards: []
            }
        })
    });
    bot.client.guilds.cache.forEach((g) => {
        g.members.cache.forEach((m) => {
            if(!users.data.has(m.id)) users.data.set(m.id, {
                id: m.id,
                level: 0,
                xp: 0
            })
        })
    });
    console.log('Bot launched');
});