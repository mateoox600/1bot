"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/index");
const index_2 = require("../index");
module.exports = new index_1.Event('ready', () => {
    index_2.bot.client.guilds.cache.forEach((v) => {
        if (!index_2.guilds.data.has(v.id))
            index_2.guilds.data.set(v.id, {
                id: v.id,
                levels: {
                    rewards: []
                }
            });
    });
    index_2.bot.client.guilds.cache.forEach((g) => {
        g.members.cache.forEach((m) => {
            if (!index_2.users.data.has(m.id))
                index_2.users.data.set(m.id, {
                    id: m.id,
                    level: 0,
                    xp: 0
                });
        });
    });
    console.log('Bot launched');
});
