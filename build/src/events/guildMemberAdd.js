"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/index");
const index_2 = require("../index");
module.exports = new index_1.Event('guildMemberAdd', (m) => {
    if (!index_2.users.data.has(m.id))
        index_2.users.data.set(m.id, {
            id: m.id,
            level: 0,
            xp: 0
        });
});
