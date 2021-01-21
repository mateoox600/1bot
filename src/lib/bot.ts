import { Client, ClientOptions, Message, Snowflake } from 'discord.js';
import { EventEmitter } from 'events';
import { readdirSync } from 'fs';
import { Command } from './command';
import { DataManager } from './dataManager';
import { Event } from './event';
import { TimedEvent } from './timedEvent';

export class Bot extends EventEmitter {

    public client: Client;
    public prefix: string;
    public ownerId: Snowflake;
    public commands: Map<string, Command>;
    public uniqueCommands: Map<string, Command>;
    private guildDataManager: DataManager<Snowflake, any>;

    constructor(prefix: string, ownerId: Snowflake, options?: ClientOptions) {
        super();
        this.client = new Client(options);
        this.prefix = prefix;
        this.ownerId = ownerId;
        this.commands = new Map();
        this.uniqueCommands = new Map();
        this.guildDataManager = new DataManager('guildPrefix');

        this.client.on('guildCreate', (g) => {
            this.guildDataManager.data.set(g.id, {
                id: g.id,
                prefix: this.prefix
            });
        });

        this.client.on('ready', () => {
            this.client.guilds.cache.forEach((g) => {
                if(!this.guildDataManager.data.has(g.id)) this.guildDataManager.data.set(g.id, {
                    id: g.id,
                    prefix: this.prefix
                });
            });
        });
        
        this.client.on('message', (msg: Message) => {
            if(msg.channel.type === 'dm' || !msg.content.startsWith(this.guildDataManager.data.get(msg.guild.id).prefix) || msg.author.bot) return;
            
            const commandName: string = msg.content.substring(this.guildDataManager.data.get(msg.guild.id).prefix.length).match(/ *(\w+)/)[0];
            var command: Command;
            if(this.commands.has(commandName)) command = this.commands.get(commandName);
            else return;

            console.log(`Server: ${msg.guild.name} - ${msg.author.tag}: ${msg.content}`);
            
            if(command.ownerOnly && !(msg.author.id === this.ownerId)) {
                msg.reply(`${commandName} is a bot owner command and you are not the bot owner`);
                return;
            }

            this.emit('commandExecute', command);
            const args = msg.content.split(/ +/);
            args.shift();
            command.execute(msg, args);
        });
    }

    public changeGuildPrefix(id: Snowflake, newPrefix: string) {
        if(this.guildDataManager.data.has(id)) this.guildDataManager.data.get(id).prefix = newPrefix;
    }

    public changePrefix(newPrefix: string) {
        this.guildDataManager.data.forEach((g) => {
            g.prefix = newPrefix;
        });
    }

    public loadCommandsInFolder(folder: string) {
        readdirSync(folder, {withFileTypes: true}).forEach((file) => {
            if(file.isDirectory()) this.loadCommandsInFolder(`${folder}/${file.name}`);
            else{
                const command: Command = require(`${folder}/${file.name}`);

                this.addCommand(command);
            }
        });
        return this;
    }

    public addCommand(command: Command) {
        this.commands.set(command.name, command);
        this.uniqueCommands.set(command.name, command)
        command.aliases.forEach((alias) => {
            this.commands.set(alias, command);
        });
        return this;
    }

    public addCommands(...commands: Command[]) {
        commands.forEach((command) => {
            this.addCommand(command);
        });
        return this;
    }

    /*
      Events
    */
    public loadEventsInFolder(folder: string) {
        readdirSync(folder, {withFileTypes: true}).forEach((file) => {
            if(file.isDirectory()) this.loadEventsInFolder(`${folder}/${file.name}`);
            else{
                const event: Event = require(`${folder}/${file.name}`);
                this.registerEvent(event);
            }
        });
        return this;
    }

    public registerEvent(event: Event) {
        this.client['on'](event.name, (...args) => event.execute(...args));
        return this;
    }

    public registerEvents(...events: Event[]) {
        events.forEach(event => {
            this.registerEvent(event);
        });
        return this;
    }

    public timedEvent(event: TimedEvent) {
        const eventHandler = (...args) => {
            if(event.timeCreated + event.duration < Date.now()){
                this.client.removeListener(event.name, eventHandler);
            }else {
                event.execute(args);
            }
        };
        this.client.on(event.name, eventHandler);
    }

    /*
      Used to login the bot with a token
    */
    public login(token: string) {
        this.client.login(token);
        return this;
    }

    public stop() {
        this.guildDataManager.saveAll();
        this.client.destroy();
    }

}

