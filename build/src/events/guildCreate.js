"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/index");
const index_2 = require("../index");
module.exports = new index_1.Event('guildCreate', (g) => {
    g.members.cache.forEach((user) => {
        if (!index_2.users.data.has(user.id))
            index_2.users.data.set(user.id, {
                id: user.id,
                level: 0,
                xp: 0
            });
    });
    if (!index_2.guilds.data.has(g.id))
        index_2.guilds.data.set(g.id, {
            id: g.id,
            levels: {
                rewards: []
            }
        });
});
