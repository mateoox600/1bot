import { Guild } from 'discord.js';
import { Event } from '../lib/index';
import { users, guilds } from '../index';

module.exports = new Event('guildCreate', (g: Guild) => {
    g.members.cache.forEach((user) => {
        if(!users.data.has(user.id)) users.data.set(user.id, {
            id: user.id,
            level: 0,
            xp: 0
        })
    });
    if(!guilds.data.has(g.id)) guilds.data.set(g.id, {
        id: g.id,
        levels: {
            rewards: []
        }
    });
});