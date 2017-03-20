import {random} from 'underscore';

import {EventEmitterExtended} from '../EventEmitterExtended';
import {Query} from '../query/Query';
import {DataQueryOperation} from '../Constants';

export class QueryProcessorIterator extends EventEmitterExtended {
    done: boolean;
    position: number;
    processors: any[];

    $id: number;
    $query: Query;
    $operation: DataQueryOperation;

    private _initialValue: any;

    constructor(processors, query) {
        super();

        this.done = false;
        this.position = -1;

        this.processors = processors;

        //helps with debugging
        this.$id = random(0, 5000);
        this.$query = query;
        this.$operation = query.operation;

        this._initialValue = null;
    }

    restart(value = this._initialValue) {
        return this.start(value);
    }

    start(value) {
        this._initialValue = value;
        this.position = -1;
        this.done = false;
        return this.next(value);
    }

    next(value) {
        this.position++;
        if (this.position >= this.processors.length) {
            return this.end(value);
        }

        const nextProcessor = this.processors[this.position];
        return this.emit('next', nextProcessor, value);
    }

    end(value) {
        this.done = true;
        return this.emit('end', value);
    }

    cancel(reason) {
        this.done = true;
        return this.emit('cancel', reason);
    }

    error(error) {
        return this.emit('error', error);
    }
}