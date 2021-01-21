"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const events_1 = require("events");
const fs_1 = require("fs");
const dataManager_1 = require("./dataManager");
class Bot extends events_1.EventEmitter {
    constructor(prefix, ownerId, options) {
        super();
        this.client = new discord_js_1.Client(options);
        this.prefix = prefix;
        this.ownerId = ownerId;
        this.commands = new Map();
        this.uniqueCommands = new Map();
        this.guildDataManager = new dataManager_1.DataManager('guildPrefix');
        this.client.on('guildCreate', (g) => {
            this.guildDataManager.data.set(g.id, {
                id: g.id,
                prefix: this.prefix
            });
        });
        this.client.on('ready', () => {
            this.client.guilds.cache.forEach((g) => {
                if (!this.guildDataManager.data.has(g.id))
                    this.guildDataManager.data.set(g.id, {
                        id: g.id,
                        prefix: this.prefix
                    });
            });
        });
        this.client.on('message', (msg) => {
            if (msg.channel.type === 'dm' || !msg.content.startsWith(this.guildDataManager.data.get(msg.guild.id).prefix) || msg.author.bot)
                return;
            const commandName = msg.content.substring(this.guildDataManager.data.get(msg.guild.id).prefix.length).match(/ *(\w+)/)[0];
            var command;
            if (this.commands.has(commandName))
                command = this.commands.get(commandName);
            else
                return;
            console.log(`Server: ${msg.guild.name} - ${msg.author.tag}: ${msg.content}`);
            if (command.ownerOnly && !(msg.author.id === this.ownerId)) {
                msg.reply(`${commandName} is a bot owner command and you are not the bot owner`);
                return;
            }
            this.emit('commandExecute', command);
            const args = msg.content.split(/ +/);
            args.shift();
            command.execute(msg, args);
        });
    }
    changeGuildPrefix(id, newPrefix) {
        if (this.guildDataManager.data.has(id))
            this.guildDataManager.data.get(id).prefix = newPrefix;
    }
    changePrefix(newPrefix) {
        this.guildDataManager.data.forEach((g) => {
            g.prefix = newPrefix;
        });
    }
    loadCommandsInFolder(folder) {
        fs_1.readdirSync(folder, { withFileTypes: true }).forEach((file) => {
            if (file.isDirectory())
                this.loadCommandsInFolder(`${folder}/${file.name}`);
            else {
                const command = require(`${folder}/${file.name}`);
                this.addCommand(command);
            }
        });
        return this;
    }
    addCommand(command) {
        this.commands.set(command.name, command);
        this.uniqueCommands.set(command.name, command);
        command.aliases.forEach((alias) => {
            this.commands.set(alias, command);
        });
        return this;
    }
    addCommands(...commands) {
        commands.forEach((command) => {
            this.addCommand(command);
        });
        return this;
    }
    /*
      Events
    */
    loadEventsInFolder(folder) {
        fs_1.readdirSync(folder, { withFileTypes: true }).forEach((file) => {
            if (file.isDirectory())
                this.loadEventsInFolder(`${folder}/${file.name}`);
            else {
                const event = require(`${folder}/${file.name}`);
                this.registerEvent(event);
            }
        });
        return this;
    }
    registerEvent(event) {
        this.client['on'](event.name, (...args) => event.execute(...args));
        return this;
    }
    registerEvents(...events) {
        events.forEach(event => {
            this.registerEvent(event);
        });
        return this;
    }
    timedEvent(event) {
        const eventHandler = (...args) => {
            if (event.timeCreated + event.duration < Date.now()) {
                this.client.removeListener(event.name, eventHandler);
            }
            else {
                event.execute(args);
            }
        };
        this.client.on(event.name, eventHandler);
    }
    /*
      Used to login the bot with a token
    */
    login(token) {
        this.client.login(token);
        return this;
    }
    stop() {
        this.guildDataManager.saveAll();
        this.client.destroy();
    }
}
exports.Bot = Bot;
