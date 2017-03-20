import { Expression } from '../Expression';
import { Constants } from '../constants';
import { WhereQuery } from './WhereQuery';
import { QueryBuilder } from './QueryBuilder';
import { Query as CommonQuery } from '../../common/query/Query';

const OperatorType = Constants.OperatorType;

export class Query extends CommonQuery {
    filter;
    fields;
    sort;
    toskip;
    totake;
    expandExpression;
    expr: Expression;
    aggregateExpression;

    /**
     * @class Query
     * @classdesc A query class used to describe a request that will be made to the {{site.TelerikBackendServices}} JavaScript API.
     * @param {object} [filter] A [filter expression](http://docs.telerik.com/platform/backend-services/rest/queries/queries-filtering) definition.
     * @param {object} [fields] A [fields expression](http://docs.telerik.com/platform/backend-services/rest/queries/queries-subset-fields) definition.
     * @param {object} [sort] A [sort expression](http://docs.telerik.com/platform/backend-services/rest/queries/queries-sorting) definition.
     * @param {number} [skip] Number of items to skip. Used for paging.
     * @param {number} [take] Number of items to take. Used for paging.
     * @param {object} [expand] An [expand expression](http://docs.telerik.com/platform/backend-services/rest/data/relations/relations-defining) definition.
     */
    constructor(filter?, fields?, sort?, skip?, take?, expand?) {
        super();

        this.filter = filter;
        this.fields = fields;
        this.sort = sort;
        this.toskip = skip;
        this.totake = take;
        this.expandExpression = expand;
        this.expr = new Expression(OperatorType.query);
    }

    /** Applies a filter to the current query. This allows you to retrieve only a subset of the items based on various filtering criteria.
     * @memberOf Query.prototype
     * @method where
     * @name where
     * @param {object} filter A [filter expression](http://docs.telerik.com/platform/backend-services/rest/queries/queries-filtering) definition.
     * @returns {Query}
     */
    /** Defines a filter definition for the current query.
     * @memberOf Query.prototype
     * @method where
     * @name where
     * @returns {WhereQuery}
     */
    where(filter?: any): any { //TODO: common return type? whereQuery should extend query or common query?
        if (filter) {
            return this._simple(OperatorType.filter, [filter]);
        } else {
            return new WhereQuery(this);
        }
    }

    // TODO
    //exclude: function () {
    //    return this._simple(OperatorType.exclude, arguments);
    //},

    /** Applies a fields selection to the current query. This allows you to retrieve only a subset of all available item fields.
     * @memberOf Query.prototype
     * @method select
     * @param {object} fieldsExpression A [fields expression](http://docs.telerik.com/platform/backend-services/rest/queries/queries-subset-fields) definition.
     * @returns {Query}
     */
    select(...args) {
        return this._simple(OperatorType.select, args);
    }

    /** Sorts the items in the current query in descending order by the specified field.
     * @memberOf Query.prototype
     * @method orderDesc
     * @param {string} field The field name to order by in descending order.
     * @returns {Query}
     */
    order(field) {
        return this._simple(OperatorType.order, [field]);
    }

    /** Skips a certain number of items from the beginning before returning the rest of the items. Used for paging.
     * @memberOf Query.prototype
     * @method skip
     * @see [query.take]{@link query.take}
     * @param {number} value The number of items to skip.
     * @returns {Query}
     */
    orderDesc(field) {
        return this._simple(OperatorType.order_desc, [field]);
    }

    /** Takes a specified number of items from the query result. Used for paging.
     * @memberOf Query.prototype
     * @method take
     * @see [query.skip]{@link query.skip}
     * @param {number} value The number of items to take.
     * @returns {Query}
     */
    skip(value) {
        return this._simple(OperatorType.skip, [value]);
    }

    /** Sets an expand expression for the current query. This allows you to retrieve complex data sets using a single query based on relations between data types.
     * @memberOf Query.prototype
     * @method expand
     * @param {object} expandExpression An [expand expression](http://docs.telerik.com/platform/backend-services/rest/data/relations/relations-defining) definition.
     * @returns {Query}
     */
    take(value) {
        return this._simple(OperatorType.take, [value]);
    }

    /** Builds an object containing the different expressions that will be sent to {{site.TelerikBackendServices}}. It basically translates any previously specified expressions into standard queries that {{site.bs}} can understand.
     * @memberOf Query.prototype
     * @method build
     * @returns {{$where,$select,$sort,$skip,$take,$expand}}
     */
    expand(expandExpression) {
        return this._simple(OperatorType.expand, [expandExpression]);
    }

    build() {
        return new QueryBuilder(this).build();
    }

    _simple(op, oprs): Query {
        var args = [].slice.call(oprs);
        this.expr.addOperand(new Expression(op, args));
        return this;
    }
}
