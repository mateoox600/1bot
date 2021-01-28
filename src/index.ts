import { Bot, DataManager, DataTemplate } from './lib/index';
import * as config from '../config.json';
import { GuildMember, Snowflake } from 'discord.js';

export const bot = new Bot(config.prefix, config.owner.id);

export interface User extends DataTemplate<Snowflake> {
}
export const users = new DataManager<Snowflake, User>('users')

export enum Permissions {
    ALL,
    WARN,
    PERMISSION_MANAGE
}
export interface GuildUser {
    warns: {
        message: string,
        giver: Snowflake
    }[],
    permissions: Permissions[],
    level: number,
    xp: number
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

export function hasPermission(m: GuildMember, permission: Permissions) {
    return guilds.data.get(m.guild.id).members[m.id].permissions.includes(permission) || m.guild.ownerID === m.id || m.id === config.owner.id || guilds.data.get(m.guild.id).members[m.id].permissions.includes(Permissions.ALL);
}

bot.loadCommandsInFolder(`${__dirname}/commands/`);
bot.loadEventsInFolder(`${__dirname}/events/`);

bot.login(config.token);