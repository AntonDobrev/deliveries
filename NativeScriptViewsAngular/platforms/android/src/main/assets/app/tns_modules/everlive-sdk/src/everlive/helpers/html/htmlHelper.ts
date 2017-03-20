import { Everlive } from '../../Everlive';
declare const document;

import * as _ from 'underscore';

import { EventEmitterExtended } from '../../../common/EventEmitterExtended';

import { Utils } from '../../utils';
import { HtmlHelperResponsiveModule } from './htmlHelperResponsiveModule';
import { HtmlHelperOfflineModule } from './htmlHelperOfflineModule';
import { Constants } from '../../constants';
import { EverliveError } from '../../EverliveError';

const defaults = {
    processOnLoad: false,
    processOnResize: false,
    loadingImageUrl: '',
    errorImageUrl: '',
    attributes: {
        loadingImage: 'data-loading-image',
        errorImage: 'data-error-image',
        dpi: 'data-dpi',
        imageSource: 'data-src',
        fileSource: 'data-href',
        enableOffline: 'data-offline',
        enableResponsive: 'data-responsive'
    },
    responsiveParams: {
        //http://docs.telerik.com/platform/backend-services/javascript/responsive-images/responsive-images-parameters
    }
};

/**
 * @typedef Helpers.html
 * @description Everlive helper for html related operations, such as processing html elements with specific tags.
 */
export class HtmlHelper extends EventEmitterExtended {
    settings;
    options;
    responsive;
    offline;

    constructor(
        public sdk: Everlive,
        config: any
    ) {
        super();

        this.settings = {
            urlTemplate: '[protocol][hostname][appid]/[operations][url]',
            server: 'bs1.cdn.telerik.com/image/v1/'
        };

        config = config || {};

        this.options = _.extend({}, defaults, config);
        this.options.attributes = _.extend({}, defaults.attributes, config.attributes);
        this.options.responsiveParams = _.extend({}, defaults.responsiveParams, config.responsiveParams);

        this.responsive = new HtmlHelperResponsiveModule(this);
        this.offline = new HtmlHelperOfflineModule(this);

        this._init();
    }

    _init() {
        var self = this;
        if (self.options.processOnLoad) {
            window.addEventListener('load', this.processAll.bind(this), false);
        }

        if (this.options.processOnResize) {
            window.addEventListener('resize', _.debounce(this.processAll.bind(this), 300), false);
        }
    }

    _triggerOnProcessed(args) {
        this.emit(Constants.Events.Processed, args);
    }

    _defaultProcessSettings(settings) {
        return _.defaults({}, settings, {
            responsive: true,
            offline: true
        });
    }

    _setLoadingUrl(element) {
        var loadingImageUri = element.getAttribute(this.options.attributes.loadingImage) || this.options.loadingImageUrl;
        if (!loadingImageUri || Utils.isElement.anchor(element)) {
            return Utils.successfulPromise();
        }

        return this._setUrl(element, loadingImageUri, true);
    }

    _getBackgroundSrc(el) {
        var elStyle = window.getComputedStyle(el, null);
        var backgrImage = elStyle.getPropertyValue('background-image');

        var img: any = backgrImage !== 'none' ? backgrImage : false;
        if (img) {
            img = img.replace(/url\(('?"?)(.*?)\1\)/gi, '$2');
        }

        return img;
    }

    _setErrorUrl(element) {
        var errorImageUrl = element.getAttribute(this.options.attributes.errorImage) || this.options.errorImageUrl;
        if (!errorImageUrl || Utils.isElement.anchor(element)) {
            return Utils.successfulPromise();
        }

        return this._setUrl(element, errorImageUrl, true);
    }

    _setUrl(element, url, apply:boolean = false) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var elAttr = self._getAttr(element);
            if (Utils.isElement.image(element) && elAttr === self.options.attributes.imageSource) {
                if (apply) {
                    element.src = url;
                    element.style.visibility = 'visible';
                } else {
                    var img = new Image();

                    img.onerror = function () {
                        img = null;
                        reject(new EverliveError({message: `Can\'t be loaded: ${url}`}));
                    };

                    img.onload = function () {
                        img = null;
                        self._setUrl(element, url, true)
                            .then(resolve)
                            .catch(reject);
                    };

                    img.src = url;
                }
            } else {
                apply = true;
                if (elAttr) {
                    var attr;
                    if (elAttr === self.options.attributes.imageSource) {
                        attr = 'src';
                    } else if (elAttr === self.options.attributes.fileSource) {
                        attr = 'href';
                    } else {
                        attr = _.last(elAttr.split('-'));
                    }

                    element.setAttribute(attr, url);
                } else {
                    element.style.backgroundImage = 'url(' + url + ')';
                }
            }

            if (apply) {
                resolve();
            }
        });
    }

    _getAttr(element) {
        if (element.getAttribute(this.options.attributes.imageSource)) {
            return this.options.attributes.imageSource;
        }

        if (element.getAttribute(this.options.attributes.fileSource)) {
            return this.options.attributes.fileSource;
        }
    }

    _getUrl(element) {
        var url = element.getAttribute(this.options.attributes.imageSource)
            || element.getAttribute(this.options.attributes.fileSource)
            || this._getBackgroundSrc(element);

        return url;
    }

    _wrapElements(elements) {
        var self = this;

        var results = _.map(elements, function (element: any) {
            var tag = element.tagName.toLowerCase();

            var evaluateDataAttr = function evaluateDataAttr(attr) {
                // data-a - true
                // data-a="" - true
                // data-a="true" - true
                // data-a="anything" - true
                // data-a="false" - false
                // missing - false
                var val;
                var dataVal = (element.attributes[attr] || {value: null}).value;
                if (dataVal === '') {
                    val = true;
                } else if (!dataVal) {
                    val = false;
                } else {
                    try {
                        val = JSON.parse(dataVal);
                    } catch (e) {
                        val = true;
                    }
                }

                return val;
            };

            var canResponsive = evaluateDataAttr(self.options.attributes.enableResponsive);
            var canOffline = evaluateDataAttr(self.options.attributes.enableOffline);

            return {
                item: element,
                tag: tag,
                operations: {
                    responsive: canResponsive,
                    offline: canOffline
                }
            };
        });

        return results;
    }

    /**
     * @method process
     * @memberOf Helpers.html
     * @param {HtmlElement|HtmlElement[]} elements
     * @param {Object} settings A settings specifying custom behavior.
     * @param {boolean} [settings.responsive] Whether to process the data-responsive attributes that help implement Responsive Images.
     * @param {boolean} [settings.offline] Whether to process the data-offline attributes that help implement offline files.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */

    /**
     * @method process
     * @memberOf Helpers.html
     * @param {HtmlElement|HtmlElement[]} elements
     * @param {Object} settings A settings specifying custom behavior.
     * @param {boolean} [settings.responsive] Whether to process the data-responsive attributes that help implement Responsive Images.
     * @param {boolean} [settings.offline] Whether to process the data-offline attributes that help implement offline files.
     * @returns {Promise} A promise to the process state.
     */
    process(elements, settings, success?: Function, error?: Function) {
        var self = this;

        return Utils.buildPromise(function (resolve) {
            settings = self._defaultProcessSettings(settings);
            if (_.isArray(elements) || elements instanceof NodeList || elements.length) {
                elements = _.flatten(elements);
            } else {
                elements = [elements];
            }

            var wrappedElements = self._wrapElements(elements);
            var promises = [];
            _.each(wrappedElements, function (element) {
                var result = {
                    element: element.item,
                    responsive: false,
                    offline: false
                };

                var dataUrl = self._getUrl(result.element);

                if (!dataUrl) {
                    return promises.push(Utils.successfulPromise(result));
                }

                var canResponsive = settings.responsive ? element.operations.responsive : false;
                var canOffline = settings.offline ? element.operations.offline : false;

                if (!canResponsive && !canOffline) {
                    return promises.push(self._setUrl(result.element, dataUrl, true)
                        .then(function () {
                            return result;
                        }));
                }

                var promise = self._setLoadingUrl(result.element);
                var handleOperation = function handleOperation(operation, url) {
                    if (url) {
                        result[operation] = true;
                        return url;
                    }
                };

                if (canResponsive) {
                    promise = promise.then(function () {
                        return self.responsive.responsiveImage(element, dataUrl)
                            .then(handleOperation.bind(this, 'responsive'));
                    });
                }

                if (canOffline) {
                    promise = promise.then(function (responsiveSrc) {
                        return self.offline.processOffline(responsiveSrc || dataUrl)
                            .then(handleOperation.bind(this, 'offline'));
                    });
                }

                promise = (<Promise<any>>promise).then(function (finalUrl) {
                    return self._setUrl(result.element, finalUrl)
                        .then(function () {
                            return result;
                        });
                }).catch(function (err) {
                    return self._setErrorUrl(result.element)
                        .then(function () {
                            throw {
                                element: result.element,
                                error: err
                            }
                        });
                });

                promises.push(promise);
            });

            Utils.promisesAllSettled(promises)
                .then(function (results) {
                    var processed = [];
                    var failed = [];

                    _.each<any>(results, function (result) {
                        if (result.state === 'fulfilled') {
                            processed.push(result.value);
                        } else {
                            failed.push(result.reason);
                        }
                    });

                    var result = {
                        processed: processed,
                        failed: failed
                    };

                    self._triggerOnProcessed(result);
                    resolve(result);
                });
        }, success, error);
    }

    /**
     * @method processAll
     * @memberOf Helpers.html
     * @param {Object} settings A settings specifying custom behavior.
     * @param {boolean} [settings.responsive] Whether to process the data-responsive attributes that help implement Responsive Images.
     * @param {boolean} [settings.offline] Whether to process the data-offline attributes that help implement offline files.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */

    /**
     * @method processAll
     * @memberOf Helpers.html
     * @param {Object} settings A settings specifying custom behavior.
     * @param {boolean} [settings.responsive] Whether to process the data-responsive attributes that help implement Responsive Images.
     * @param {boolean} [settings.offline] Whether to process the data-offline attributes that help implement offline files.
     * @returns {Promise} A promise to the process state.
     */
    processAll(settings, success?: Function, error?: Function) {
        settings = this._defaultProcessSettings(settings);
        var responsiveSelector = '[' + this.options.attributes.enableResponsive + ']';
        var offlineSelector = '[' + this.options.attributes.enableOffline + ']';

        var responsiveElements = [];
        if (settings.responsive) {
            responsiveElements = document.querySelectorAll(responsiveSelector);
        }

        var offlineElements = [];
        if (settings.offline) {
            offlineElements = document.querySelectorAll(offlineSelector);
        }

        var slice = [].slice;
        var elements = _.unique(slice.call(responsiveElements).concat(slice.call(offlineElements)));


        return this.process(elements, settings, success, error);
    }
}
