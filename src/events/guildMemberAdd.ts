import { GuildMember } from 'discord.js';
import { Event } from '../lib/index';
import { users } from '../index';

module.exports = new Event('guildMemberAdd', (m: GuildMember) => {
    if(!users.data.has(m.id)) users.data.set(m.id, {
        id: m.id,
        level: 0,
        xp: 0
    })
});