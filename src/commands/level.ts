import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../lib/index';
import { users } from '../index';

module.exports = new Command('level', ['lvl'], true, 'Show your level', (e: Message, args: string[]) => {
    var user = users.data.get(e.author.id);
    e.channel.send(new MessageEmbed().addField('Level', `${user.level} (Xp: ${user.xp}/${(user.level+1)*100})`).setAuthor(e.author.username, e.author.displayAvatarURL()))
});