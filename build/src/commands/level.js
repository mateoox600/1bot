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
        if (args[0] === 'reward-add' || args[0] === 'r') {
            if (args.length >= 4) {
                const level = Number(args[1]);
                const role = args[2];
                const message = args.slice(3).join(' ');
                if (isNaN(level)) {
                    e.reply('use `;level reward-add <level> <roleId> <message>` with a valid number');
                    return;
                }
                if (!e.guild.roles.cache.has(role)) {
                    e.reply('use `;level reward-add ' + level + ' <roleId> <message>` with a valid role id');
                    return;
                }
                index_2.guilds.data.get(e.guild.id).levels.rewards.push({
                    level,
                    role,
                    message
                });
                e.reply('you created a reward for leveling up to level' + level + ' with a role reward of ' + e.guild.roles.cache.get(role).name + ' with a message of "' + message + '"');
            }
            else {
                e.reply('use `;level reward-add <level> <roleId> <message>` to create a reward for level');
            }
        }
        else if (args[0] === 'reward-rmv' || args[0] === 'r-rmv') {
            if (args.length >= 2) {
                const id = Number(args[1]);
                if (isNaN(id)) {
                    e.reply('use `;level reward-rmv <reward-id>`');
                    return;
                }
                index_2.guilds.data.get(e.guild.id).levels.rewards.splice(id, 1);
                e.reply('you deleted the reward with id ' + id);
            }
            else {
                e.reply('use `;level reward-rmv <reward-id>`');
            }
        }
        else if (args[0] === 'rewards' || args[0] === 'rs') {
            var embed = new discord_js_1.MessageEmbed().setTitle(e.guild.name + ' level reward');
            index_2.guilds.data.get(e.guild.id).levels.rewards.forEach((v, idx) => {
                embed.addField(idx, `level: ${v.level} \nmessage: ${v.message} \nrole: ${e.guild.roles.cache.get(v.role)}`);
            });
        }
        else {
            e.reply('use `;level` to see your level' + (e.member.id === e.guild.ownerID || e.member.id === config.owner.id ? ' and `;level <rewards|reward-add|reward-rmv>` for admin' : ' !'));
        }
    }
});
