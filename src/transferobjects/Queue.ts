export class Queue<T> {
    private storage: Array<T> = [];

    constructor(private capacity: number = Infinity) {}

    enqueue(item: T): void {
        if (this.size() === this.capacity) {
            throw Error('Queue has reached max capacity, you cannot add more items');
        }
        this.storage.push(item);
    }

    dequeue(): T | undefined {
        return this.storage.shift();
    }

    size(): number {
        return this.storage.length;
    }

    sortByCondition(condition: (a: T, b: T) => number): void {
        this.storage.sort(condition);
    }

    sliceByCondition<K extends keyof T>(
        property: K,
        condition: (a: T[K]) => boolean | undefined,
    ): void {
        let slicePoint: number = 0;
        for (let i = 0; i < this.storage.length; i++) {
            if(condition(this.storage[i][property])){
                slicePoint = i-1;
                break;
            }
        }
        
        if(slicePoint > 0)            
            this.storage.slice(slicePoint)
    }
}
