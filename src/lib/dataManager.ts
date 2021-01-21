import { Snowflake } from "discord.js";
import { EventEmitter } from "events";
import { writeFileSync, readdirSync, mkdirSync } from 'fs';

export interface DataTemplate<Key> {
    id: Key;
}

export class DataManager<Key, Value extends DataTemplate<Key>> extends EventEmitter {

    public data: Map<Key, Value>;
    public name: string;

    constructor(name: string) {
        super();
        this.data = new Map();
        this.name = name;
        mkdirSync(`${__dirname}/data/${name}`, {recursive: true});
        this.load();
        setInterval(() => {
            console.log('Auto Save Data: ', this.name);
            this.emit('autoSave');
            this.saveAll();
        }, 5*60*1000);
    }

    public load() {
        readdirSync(`${__dirname}/data/${this.name}/`).forEach((file) => {
            const data: Value = require(`./data/${this.name}/${file}`);
            this.data.set(data.id, data);
        });
    }

    public save(id: Key) {
        const data: Value = this.data.get(id);
        writeFileSync(`${__dirname}/data/${this.name}/${data.id}.json`, JSON.stringify(data));
    }

    private saveData(data: Value) {
        writeFileSync(`${__dirname}/data/${this.name}/${data.id}.json`, JSON.stringify(data));
    }

    public saveAll() {
        this.data.forEach((data) => {
            this.saveData(data);
        });
    }

}