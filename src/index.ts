import { Bot, DataManager, DataTemplate } from './lib/index';
import * as config from '../config.json';
import { GuildMember, Snowflake, TextChannel } from 'discord.js';

export const bot = new Bot(config.prefix, config.owner.id);

export interface User extends DataTemplate<Snowflake> {
    level: number,
    xp: number
}
export const users = new DataManager<Snowflake, User>('users')

export interface GuildUser {
    warns: {
        message: string,
        giver: Snowflake
    }[],
    permissions: string[]
}
export interface Guild extends DataTemplate<Snowflake> {
    levels: {
        rewards: {
            role: Snowflake,
            message: string,
            level: number
        }[]
    },
    members: {
        [key: string]: GuildUser
    }
}
export const guilds = new DataManager<Snowflake, Guild>('guilds');

bot.loadCommandsInFolder(`${__dirname}/commands/`);
bot.loadEventsInFolder(`${__dirname}/events/`);

bot.login(config.token);