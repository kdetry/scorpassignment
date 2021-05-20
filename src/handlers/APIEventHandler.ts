import {
    APIAnimatedGiftEvent,
    APIEvent,
    APIGiftEvent,
    APIMessageEvent,
    API_EVENT_TYPE,
} from '../scorplib/api';
import { Queue } from '../transferobjects/Queue';

export class APIEventHandler {
    private allEventIds = new Set<string>();
    private messageEventQueue = new Queue<APIGiftEvent | APIMessageEvent>();
    private animatedGiftEventQueue = new Queue<APIAnimatedGiftEvent>();

    private isAddedToMessage: boolean = false;
    private isAddedToAnimated: boolean = false;

    private startAddEventSession() {
        this.isAddedToMessage = false;
        this.isAddedToAnimated = false;
    }

    private endAddEventSession() {
        this.sortByTimestamp(this.messageEventQueue, this.isAddedToMessage);
        this.sortByTimestamp(this.animatedGiftEventQueue, this.isAddedToAnimated);
    }

    private sortByTimestamp(queue: Queue<APIEvent>, isAdded: boolean) {
        if (isAdded)
            queue.sortByCondition(
                (first, second) => first.timestamp.valueOf() - second.timestamp.valueOf(),
            );
    }

    private addEventByType(event: APIEvent) {
        if (this.allEventIds.has(event.id)) return;

        this.allEventIds.add(event.id);
        
        if (event.type === API_EVENT_TYPE.GIFT || event.type === API_EVENT_TYPE.MESSAGE) {
            this.messageEventQueue.enqueue(event);
            this.isAddedToMessage = true;
            return;
        }
        this.animatedGiftEventQueue.enqueue(event);
        this.isAddedToAnimated = true;
    }

    public addEventArray(events: Array<APIEvent>) {
        this.startAddEventSession();
        events.forEach((event) => this.addEventByType(event));
        this.endAddEventSession();
    }

    public getAnimatedGiftEventQueue() {
        return this.animatedGiftEventQueue;
    }

    public getMessageEventQueue() {
        return this.messageEventQueue;
    }
}
