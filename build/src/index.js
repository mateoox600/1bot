"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guilds = exports.users = exports.bot = void 0;
const index_1 = require("./lib/index");
const config = require("../config.json");
exports.bot = new index_1.Bot(config.prefix, config.owner.id);
exports.users = new index_1.DataManager('users');
exports.guilds = new index_1.DataManager('guilds');
exports.bot.loadCommandsInFolder(`${__dirname}/commands/`);
exports.bot.loadEventsInFolder(`${__dirname}/events/`);
exports.bot.login(config.token);
