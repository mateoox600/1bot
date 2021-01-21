import { Event } from "./event";

export class TimedEvent extends Event {

    public timeCreated: number;
    public duration: number;

    constructor(event: Event, duration: number) {
        super(event.name, event.execute);
        this.timeCreated = Date.now();
        this.duration = duration;
    }

}