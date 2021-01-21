import { Message } from 'discord.js';

export class Command {
    public name: string;
    public aliases: Array<string> = [];
    public ownerOnly: boolean = false;
    public description: string = 'NONE';
    public execute: (e: Message, args: string[]) => void;

    constructor(name: string, aliases: Array<string>, ownerOnly: boolean, description: string, execute: (e: Message, args: string[]) => void){
        this.name = name;
        this.aliases = aliases;
        this.ownerOnly = ownerOnly;
        this.description = description;
        this.execute = execute;
    }
}