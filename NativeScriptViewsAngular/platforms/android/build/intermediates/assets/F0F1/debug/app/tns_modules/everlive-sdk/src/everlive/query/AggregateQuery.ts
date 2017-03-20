import * as _ from 'underscore';

import { Query } from '../query/Query';
import { EverliveError } from '../EverliveError';

export interface AggregateExpression {
    GroupBy: any[],
    Aggregate: any
}

/**
 * @class AggregateQuery
 * @classdesc A query class used to describe a aggregation request that will be made to the {{site.TelerikBackendServices}} JavaScript API. Inherits from Query.
 */
export class AggregateQuery extends Query {
    aggregateExpression: AggregateExpression;

    constructor(filter?, fields?, sort?, skip?, take?, expand?, aggregateExpressionParam?) {
        super(filter, fields, sort, skip, take, expand);
        this.aggregateExpression = {'GroupBy': [], 'Aggregate': {}};

        // the aggregate expression will be the last argument when initializing the query
        var aggregateExpression = aggregateExpressionParam;
        var groupBy;
        var aggregate;
        if (aggregateExpression) {
            groupBy = aggregateExpression.GroupBy;
            aggregate = aggregateExpression.Aggregate;
        }

        this.aggregateExpression = {'GroupBy': groupBy || [], 'Aggregate': aggregate || {}};
    };

    // wrapper formatter to all aggregate functions, like min/max/sum/average/count
    _aggregateFunc(funcName, fieldName, destName): AggregateQuery {
        if (typeof fieldName !== 'string' && funcName !== 'count' ) {
            throw new EverliveError({message: funcName + '() accepts only string as parameter.'});
        }
        var aggregationObj = {};
        aggregationObj[funcName] = fieldName;
        this.aggregateExpression.Aggregate[destName || fieldName] = aggregationObj;
        return this;
    };

    /** Applies a groupBy to the current query. This allows you to group results by
     * @memberOf AggregateQuery.prototype
     * @method groupBy
     * @name groupBy
     * @param {String} field to group by
     * @param {Array} array of strings with fields to group by
     * @returns {AggregateQuery}
     */
    groupBy(data) {
        if (_.isArray(data)) {
            Array.prototype.push.apply(this.aggregateExpression.GroupBy, data);
        } else {
            if (typeof data === 'string') {
                this.aggregateExpression.GroupBy.push(data);
            } else {
                throw new EverliveError({message: 'groupBy() accepts only array or string as parameter.'});
            }
        }
        return this;
    };
    /** Adds aggregation function 'avg' (average) to the current query. Could set [resultFieldName]
     * @memberOf AggregateQuery.prototype
     * @method avg
     * @name avg
     * @param {String} field to apply aggregate function on
     * @param {String} [resultFieldName] (Optional) Name of resulting field
     * @returns {AggregateQuery}
     */
    avg(...args) {
        Array.prototype.unshift.call(args, 'avg');
        return this._aggregateFunc.apply(this, args);
    };

    /** Adds aggregation function 'count' to the current query. Could set [resultFieldName]
     * @memberOf AggregateQuery.prototype
     * @method count
     * @name count
     * @param {String} field to apply aggregate function on
     * @param {String} [resultFieldName] (Optional) Name of resulting field
     * @returns {AggregateQuery}
     */
    count(resultFieldName) {
        return this._aggregateFunc('count', null, resultFieldName || 'Count');
    };

    /** Adds aggregation function 'max' to the current query. Could set [resultFieldName]
     * @memberOf AggregateQuery.prototype
     * @method max
     * @name max
     * @param {String} field to apply aggregate function on
     * @param {String} [resultFieldName] (Optional) Name of resulting field
     * @returns {AggregateQuery}
     */
    max(...args) {
        Array.prototype.unshift.call(args, 'max');
        return this._aggregateFunc.apply(this, args);
    };

    /** Adds aggregation function 'min' to the current query. Could set [resultFieldName]
     * @memberOf AggregateQuery.prototype
     * @method min
     * @name min
     * @param {String} field to apply aggregate function on
     * @param {String} [resultFieldName] (Optional) Name of resulting field
     * @returns {AggregateQuery}
     */
    min(...args) {
        Array.prototype.unshift.call(args, 'min');
        return this._aggregateFunc.apply(this, args);
    };

    /** Adds aggregation function 'sum' to the current query. Could set [resultFieldName]
     * @memberOf AggregateQuery.prototype
     * @method sum
     * @name sum
     * @param {String} field to apply aggregate function on
     * @param {String} [resultFieldName] (Optional) Name of resulting field
     * @returns {AggregateQuery}
     */
    sum(...args) {
        Array.prototype.unshift.call(args, 'sum');
        return this._aggregateFunc.apply(this, args);
    };

    average(...args) {
        return this.avg.apply(this, args);
    }

    //TODO: these should be removed?
    // select = undefined;
    // skip  = undefined;
    // take = undefined;
    // order = undefined;
    private static throwNotSupportedException(operationName: string): never {
        throw `Operation "${operationName}" is not supported in an aggregation query`;
    }

    skip(): never {
        return AggregateQuery.throwNotSupportedException('skip');
    }

    take(): never {
        return AggregateQuery.throwNotSupportedException('take');
    }

    select(): never {
        return AggregateQuery.throwNotSupportedException('select');
    }

    order(): never {
        return AggregateQuery.throwNotSupportedException('order');
    }
}
