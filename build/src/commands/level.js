"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const index_1 = require("../lib/index");
const index_2 = require("../index");
module.exports = new index_1.Command('level', ['lvl'], true, 'Show your level', (e, args) => {
    var user = index_2.users.data.get(e.author.id);
    e.channel.send(new discord_js_1.MessageEmbed().addField('Level', `${user.level} (Xp: ${user.xp}/${(user.level + 1) * 100})`).setAuthor(e.author.username, e.author.displayAvatarURL()));
});
