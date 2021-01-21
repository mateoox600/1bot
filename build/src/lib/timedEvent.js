"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimedEvent = void 0;
const event_1 = require("./event");
class TimedEvent extends event_1.Event {
    constructor(event, duration) {
        super(event.name, event.execute);
        this.timeCreated = Date.now();
        this.duration = duration;
    }
}
exports.TimedEvent = TimedEvent;
