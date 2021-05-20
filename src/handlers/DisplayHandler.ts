import { apiEventHandler } from '../index';
import { APIAnimatedGiftEvent } from '../scorplib/api';
import { Queue } from '../transferobjects/Queue';
import { addMessage, animateGift, isPossiblyAnimatingGift } from '../scorplib/dom_updates';

export const DisplayHandler = function () {
    setInterval(() => {
        const animatedGiftEventQueue: Queue<APIAnimatedGiftEvent> =
            apiEventHandler.getAnimatedGiftEventQueue();
        const condition: boolean =
            animatedGiftEventQueue.size() > 0 && isPossiblyAnimatingGift() === false;

        if (condition) {
            animateGift(animatedGiftEventQueue.dequeue());
            return;
        }
        messageHandler();
    }, 500);
};

const messageHandler = function () {
    if (apiEventHandler.getMessageEventQueue().size() === 0) return;
    addMessage(apiEventHandler.getMessageEventQueue().dequeue());

    apiEventHandler
        .getMessageEventQueue()
        .sliceByCondition<'timestamp'>('timestamp', (item) => item.valueOf() > Date.now() - 20000);
};
