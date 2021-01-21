
export class Event {
    public name: string;
    public execute: (...args) => void;
    constructor(name: string, execute: (...args) => void) {
        this.name = name;
        this.execute = execute;
    }
}