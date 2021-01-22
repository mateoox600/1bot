"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const index_1 = require("../lib/index");
const index_2 = require("../index");
const config = require("../../config.json");
module.exports = new index_1.Command('level', ['lvl'], true, 'Show your level', (e, args) => {
    var user = index_2.users.data.get(e.author.id);
    if (args.length <= 0)
        e.channel.send(new discord_js_1.MessageEmbed().addField('Level', `${user.level} (Xp: ${user.xp}/${(user.level + 1) * 100})`).setAuthor(e.author.username, e.author.displayAvatarURL()));
    else {
        if (args[0] === 'reward' || args[0] === 'r') {
            if (args.length >= 3) {
                const level = Number(args[1]);
                const role = args[2];
                const message = args.slice(3).join(' ');
                if (isNaN(level)) {
                    e.reply('use `;level reward <level> <roleId> <message>` with a valid number');
                    return;
                }
                if (!e.guild.roles.cache.has(role)) {
                    e.reply('use `;level reward ' + level + ' <roleId> <message>` with a valid role id');
                    return;
                }
                index_2.guilds.data.get(e.guild.id).levels.rewards.push({
                    level,
                    role,
                    message
                });
            }
            else {
                e.reply('use `;level reward <level> <roleId> <message>` to create a reward for level');
            }
        }
        else {
            e.reply('use `;level` to see your level' + (e.member.id === e.guild.ownerID || e.member.id === config.owner.id ? ' and `;level reward <level> <roleId> <message>` to set rewards with level' : ' !'));
        }
    }
});
