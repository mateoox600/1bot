"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataManager = void 0;
const events_1 = require("events");
const fs_1 = require("fs");
class DataManager extends events_1.EventEmitter {
    constructor(name) {
        super();
        this.data = new Map();
        this.name = name;
        fs_1.mkdirSync(`${__dirname}/data/${name}`, { recursive: true });
        this.load();
        setInterval(() => {
            console.log('Auto Save Data: ', this.name);
            this.emit('autoSave');
            this.saveAll();
        }, 5 * 60 * 1000);
    }
    load() {
        fs_1.readdirSync(`${__dirname}/data/${this.name}/`).forEach((file) => {
            const data = require(`./data/${this.name}/${file}`);
            this.data.set(data.id, data);
        });
    }
    save(id) {
        const data = this.data.get(id);
        fs_1.writeFileSync(`${__dirname}/data/${this.name}/${data.id}.json`, JSON.stringify(data));
    }
    saveData(data) {
        fs_1.writeFileSync(`${__dirname}/data/${this.name}/${data.id}.json`, JSON.stringify(data));
    }
    saveAll() {
        this.data.forEach((data) => {
            this.saveData(data);
        });
    }
}
exports.DataManager = DataManager;
