"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(name, aliases, ownerOnly, description, execute) {
        this.aliases = [];
        this.ownerOnly = false;
        this.description = 'NONE';
        this.name = name;
        this.aliases = aliases;
        this.ownerOnly = ownerOnly;
        this.description = description;
        this.execute = execute;
    }
}
exports.Command = Command;
