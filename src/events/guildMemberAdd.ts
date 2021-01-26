import { GuildMember } from 'discord.js';
import { Event } from '../lib/index';
import { guilds, users } from '../index';

module.exports = new Event('guildMemberAdd', (m: GuildMember) => {
    if(!users.data.has(m.id)) users.data.set(m.id, {
        id: m.id
    })
    if(!(m.id in guilds.data.get(m.guild.id).members)) {
        guilds.data.get(m.guild.id).members[m.id] = {
            warns: [],
            permissions: [],
            level: 0,
            xp: 0
        };
    }
});