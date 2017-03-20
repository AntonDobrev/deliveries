declare const window, device, Everlive, navigator;

import { jstz } from 'jstimezonedetect';
import * as _ from 'underscore';

import { EverliveError } from '../EverliveError';
import { Constants } from '../constants';
import { Utils } from '../utils';
import { Device } from './CurrentDevice';

let Platform = Constants.Platform;
let buildPromise = Utils.buildPromise;

/**
 * @class CurrentDevice
 * @deprecated
 * @protected
 * @param pushHandler
 * @constructor
 */
class CurrentDevice implements Device {
    _pushHandler;
    _initSuccessCallback;
    _initErrorCallback;
    _globalFunctionSuffix;
    pushSettings;
    pushToken;
    isInitialized;
    isInitializing;
    emulatorMode;

    constructor(pushHandler) {
        if (!window.cordova) {
            throw new EverliveError({message: 'Error: currentDevice() can only be called from within a hybrid mobile app, after \'deviceready\' event has been fired.'});
        }

        this._pushHandler = pushHandler;
        this._initSuccessCallback = null;
        this._initErrorCallback = null;

        //Suffix for the global callback functions
        this._globalFunctionSuffix = null;

        this.pushSettings = null;
        this.pushToken = null;
        this.isInitialized = false;
        this.isInitializing = false;

        this.emulatorMode = false;
    }

    static ensurePushIsAvailable() {
        var isPushNotificationPluginAvailable = (typeof window !== 'undefined' && window.plugins && window.plugins.pushNotification);

        if (!isPushNotificationPluginAvailable && !Utils._inAppBuilderSimulator()) {
            throw new EverliveError({message: 'The push notification plugin is not available. Ensure that the pushNotification plugin is included ' +
            'and use after `deviceready` event has been fired.'});
        }
    }

    /**
     * Initializes the current device for push notifications. This method requests a push token from the device vendor and enables the push notification functionality on the device. Once this is done, you can register the device in {{site.TelerikBackendServices}} using the register() method.
     * @method enableNotifications
     * @name enableNotifications
     * @memberOf CurrentDevice.prototype
     * @param {PushSettings} pushSettings An object specifying various settings for the initialization.
     * @returns {Object} The promise for the request.
     */
    /**
     * Initializes the current device for push notifications. This method requests a push token from the device vendor and enables the push notification functionality on the device. Once this is done, you can register the device in Everlive using the register() method.
     * @method enableNotifications
     * @name enableNotifications
     * @memberOf CurrentDevice.prototype
     * @param {PushSettings} pushSettings An object specifying various settings for the initialization.
     * @param {Function} [success] Callback to invoke on success.
     * @param {Function} [error] Callback to invoke on error.
     */
    enableNotifications(pushSettings, success?: Function, error?: Function) {
        this.pushSettings = this._cleanPlatformsPushSettings(pushSettings);

        return buildPromise(_.bind(this._initialize, this), success, error);
    }

    /**
     * Disables push notifications for the current device. This method invalidates any push tokens that were obtained for the device from the current application.
     * @method disableNotifications
     * @name disableNotifications
     * @memberOf CurrentDevice.prototype
     * @returns {Object} The promise for the request.
     */
    /**
     * Disables push notifications for the current device. This method invalidates any push tokens that were obtained for the device from the current application.
     * @method disableNotifications
     * @name disableNotifications
     * @memberOf CurrentDevice.prototype
     * @param {Function} [success] Callback to invoke on success.
     * @param {Function} [error] Callback to invoke on error.
     */
    disableNotifications(success?: Function, error?: Function) {
        var self = this;

        return this.unregister().then(
            function () {
                return buildPromise(
                    function (success, error) {
                        if (self.emulatorMode) {
                            success();
                        } else {
                            var pushNotification = window.plugins.pushNotification;
                            var unregisterOptions;
                            var platformType = self._getPlatformType();
                            if (platformType === Platform.WindowsPhone) {
                                unregisterOptions = {'channelName': self.pushSettings.wp8.channelName};
                            }
                            pushNotification.unregister(
                                function () {
                                    self.isInitialized = false;
                                    success();
                                },
                                error,
                                unregisterOptions
                            );
                        }
                    },
                    success,
                    error
                );
            },
            error
        );
    }

    /**
     * Returns the push registration for the current device.
     * @memberOf CurrentDevice.prototype
     * @method getRegistration
     * @name getRegistration
     * @returns {Object} The promise for the request.
     */
    /**
     * Returns the push registration for the current device.
     * @memberOf CurrentDevice.prototype
     * @method getRegistration
     * @name getRegistration
     * @param {Function} success Callback to invoke on success.
     * @param {Function} error Callback to invoke on error.
     */
    getRegistration(success?: Function, error?: Function) {
        var deviceId = encodeURIComponent(this._getDeviceId());
        return this._pushHandler.devices.getById('HardwareId/' + deviceId, success, error);
    }

    /**
     * Registers the current device for push notifications in {{site.TelerikBackendServices}}. This method can be called only after [enableNotifications()]{@link currentDevice.enableNotifications} has completed successfully.
     * @memberOf CurrentDevice.prototype
     * @method register
     * @name register
     * @param {Object} customParameters Custom parameters for the registration.
     * @returns {Object} The promise for the request.
     */
    /**
     * Registers the current device for push notifications in {{site.TelerikBackendServices}}. This method can be called only after [enableNotifications()]{@link currentDevice.enableNotifications} has completed successfully.
     * @memberOf CurrentDevice.prototype
     * @method register
     * @name register
     * @param {Object} customParameters Custom parameters for the registration.
     * @param {Function} [success] Callback to invoke on success.
     * @param {Function} [error] Callback to invoke on error.
     */
    register(customParameters, success?: Function, error?: any) {
        var self = this;

        var deviceRegistration: any = {};
        if (customParameters !== undefined) {
            deviceRegistration.Parameters = customParameters;
        }

        return this._populateRegistrationObject(deviceRegistration).then(
            function () {
                return self._pushHandler.devices.create(deviceRegistration, success, error);
            },
            error
        );
    }

    /**
     * Unregisters the current device from push notifications in {{site.TelerikBackendServices}}. After this call completes successfully, {{site.bs}} will no longer send notifications to this device. Note that this does not prevent the device from receiving notifications and does not invalidate push tokens.
     * @memberOf CurrentDevice.prototype
     * @method unregister
     * @name unregister
     * @returns {Object} The promise for the request.
     */
    /**
     * Unregisters the current device from push notifications in {{site.TelerikBackendServices}}. After this call completes successfully, {{site.bs}} will no longer send notifications to this device. Note that this does not prevent the device from receiving notifications and does not invalidate push tokens.
     * @memberOf CurrentDevice.prototype
     * @method unregister
     * @name unregister
     * @param {Function} [success] Callback to invoke on success.
     * @param {Function} [error] Callback to invoke on error.
     */
    unregister(success?: Function, error?: Function) {
        var deviceId = encodeURIComponent(device.uuid);
        return this._pushHandler.devices.destroySingle({Id: 'HardwareId/' + deviceId}, success, error);
    }

    /**
     * Updates the registration of the current device.
     * @memberOf CurrentDevice.prototype
     * @method updateRegistration
     * @name updateRegistration
     * @param {Object} customParameters Custom parameters for the registration. If undefined, customParameters are not updated.
     * @returns {Object} The promise for the request.
     */
    /**
     * Updates the registration for the current device.
     * @memberOf CurrentDevice.prototype
     * @method updateRegistration
     * @name updateRegistration
     * @param {Object} customParameters Custom parameters for the registration. If undefined, customParameters are not updated.
     * @param {Function} [success] Callback to invoke on success.
     * @param {Function} [error] Callback to invoke on error.
     */
    updateRegistration(customParameters, success?: Function, error?: any) {
        var self = this;

        var deviceRegistration: any = {};
        if (customParameters !== undefined) {
            deviceRegistration.Parameters = customParameters;
        }

        return this._populateRegistrationObject(deviceRegistration).then(
            function () {
                deviceRegistration.Id = 'HardwareId/' + encodeURIComponent(deviceRegistration.HardwareId);
                return self._pushHandler.devices.updateSingle(deviceRegistration, success, error);
            },
            error
        );
    }

    /**
     * This method provides a different operation on each supported platform:
     *
     * - On iOS: Checks if Notifications is enabled for this application in the device's Notification Center.
     * - On Windows Phone: Checks if the application has an active open channel for communication with the Microsoft Push Notification Service. The outcome does not depend on the device's notification settings.
     * - On Android: Checks if the application has established a connection with Google Cloud Messaging. The outcome does not depend on the device's notification settings.
     * @method areNotificationsEnabled
     * @name areNotificationsEnabled
     * @memberOf Push.prototype
     * @param {Object} options An object passed to the Push Notification plugin's areNotificationsEnabled method
     * @returns {Promise} The promise for the request.
     */
    /**
     * iOS: Checks if the Notifications are enabled for this Application in the Device's Notification Center.
     * Windows Phone: Checks if the Application has an active opened Channel for communication with the Notification Service. Not relying on the device notification settings.
     * Android: Checks if the Application has established connection with the Notification Service. Not relying on the device notification settings.
     * @method areNotificationsEnabled
     * @name areNotificationsEnabled
     * @memberOf Push.prototype
     * @param {Object} options an object passed to the Push Notification plugin's areNotificationsEnabled method.
     * @param {Function} [onSuccess] Callback to invoke on successful check. Passes a single boolean value: true or false.
     * @param {Function} [onError] Callback to invoke when an error in the push plugin has occurred.
     */
    areNotificationsEnabled(options, onSuccess?: Function, onError?: Function) {
        options = options || {};
        var pushNotification = window.plugins.pushNotification;

        return buildPromise(function (successCb, errorCb) {
            pushNotification.areNotificationsEnabled(successCb, errorCb, options);
        }, onSuccess, onError);
    }

    notificationProcessed() {
        var pushPlugin = window.plugins.pushNotification;
        pushPlugin.notificationProcessed();
    }

    _initializeInteractivePush(iOSSettings, success?: Function, error?: Function) {
        var pushPlugin = window.plugins.pushNotification;

        var interactiveSettings = iOSSettings.interactiveSettings;
        var notificationTypes = [];
        if (iOSSettings.alert) {
            notificationTypes.push(pushPlugin.UserNotificationTypes.Alert);
        }
        if (iOSSettings.badge) {
            notificationTypes.push(pushPlugin.UserNotificationTypes.Badge);
        }
        if (iOSSettings.sound) {
            notificationTypes.push(pushPlugin.UserNotificationTypes.Sound);
        }

        var getAction = function (actionIdentifier) {
            var action = _.find(interactiveSettings.actions, function (action: any) {
                return action.identifier === actionIdentifier;
            });

            return action;
        };
        var categories = _.map(interactiveSettings.categories, function (category: any) {
            return {
                identifier: category.identifier,
                actionsForDefaultContext: _.map(category.actionsForDefaultContext, getAction),
                actionsForMinimalContext: _.map(category.actionsForMinimalContext, getAction)
            }
        });

        pushPlugin.registerUserNotificationSettings(
            // the success callback which will immediately return (APNs is not contacted for this)
            success,
            // called in case the configuration is incorrect
            error, {
                // asking permission for these features
                types: notificationTypes,
                // register these categories
                categories: categories
            }
        );
    }

    //Initializes the push functionality on the device.
    _initialize(success?: Function, error?: Function) {
        var self = this;

        if (this.isInitializing) {
            error(new EverliveError({message: 'Push notifications are currently initializing.'}));
            return;
        }

        if (!this.emulatorMode && (!window.navigator || !window.navigator.globalization)) {
            error(new EverliveError({message: 'The globalization plugin is not initialized.'}));
            return;
        }

        if (!this.emulatorMode && (!window.plugins || !window.plugins.pushNotification)) {
            error(new EverliveError({message: 'The push notifications plugin is not initialized.'}));
            return;
        }

        this._initSuccessCallback = success;
        this._initErrorCallback = error;

        if (this.isInitialized) {
            this._deviceRegistrationSuccess(this.pushToken);
            return;
        }

        if (this.emulatorMode) {
            setTimeout(
                function () {
                    self._deviceRegistrationSuccess('fake_push_token');
                },
                1000
            );
            return;
        }

        this.isInitializing = true;

        var suffix = this._globalFunctionSuffix;
        if (!suffix) {
            suffix = Date.now().toString();
            this._globalFunctionSuffix = suffix;
        }

        var pushNotification = window.plugins.pushNotification;

        var platformType = this._getPlatformType();
        if (platformType === Platform.iOS) {
            //Initialize global APN callback
            var apnCallbackName = 'apnCallback_' + suffix;
            Everlive.PushCallbacks[apnCallbackName] = _.bind(this._onNotificationAPN, this);

            //Construct registration options object and validate iOS settings
            var apnRegistrationOptions = this.pushSettings.iOS;
            apnRegistrationOptions.ecb = 'Everlive.PushCallbacks.' + apnCallbackName;

            //Register for APN
            pushNotification.register(
                _.bind(this._successfulRegistrationAPN, this),
                _.bind(this._failedRegistrationAPN, this),
                apnRegistrationOptions
            );
        } else if (platformType === Platform.Android) {
            //Initialize global GCM callback
            var gcmCallbackName = 'gcmCallback_' + suffix;
            Everlive.PushCallbacks[gcmCallbackName] = _.bind(this._onNotificationGCM, this);

            //Construct registration options object and validate the Android settings
            var gcmRegistrationOptions = this.pushSettings.android;
            this._validateAndroidSettings(gcmRegistrationOptions);
            gcmRegistrationOptions.ecb = 'Everlive.PushCallbacks.' + gcmCallbackName;

            //Register for GCM
            pushNotification.register(
                _.bind(this._successSentRegistrationGCM, this),
                _.bind(this._errorSentRegistrationGCM, this),
                gcmRegistrationOptions
            );
        } else if (platformType === Platform.WindowsPhone) {
            //Initialize global WP8 callbacks.
            var wp8CallbackName = 'wp8Callback_' + suffix;
            var wp8RegistrationSuccessCallbackName = 'wp8RegistrationSuccessCallback_' + suffix;
            var wp8RegistrationErrorCallbackName = 'wp8RegistrationErrorCallback_' + suffix;

            Everlive.PushCallbacks[wp8CallbackName] = _.bind(this._onNotificationWP8, this);
            Everlive.PushCallbacks[wp8RegistrationSuccessCallbackName] = _.bind(this._deviceRegistrationSuccessWP, this);
            Everlive.PushCallbacks[wp8RegistrationErrorCallbackName] = _.bind(this._deviceRegistrationFailed, this);

            //Construct registration options object and validate the WP8  settings
            var wp8RegistrationOptions = this.pushSettings.wp8;
            this._validateWP8Settings(wp8RegistrationOptions);
            wp8RegistrationOptions.ecb = 'Everlive.PushCallbacks.' + wp8CallbackName;
            wp8RegistrationOptions.uccb = 'Everlive.PushCallbacks.' + wp8RegistrationSuccessCallbackName;
            wp8RegistrationOptions.errcb = 'Everlive.PushCallbacks.' + wp8RegistrationErrorCallbackName;


            pushNotification.register(
                _.bind(this._successSentRegistrationWP8, this),
                _.bind(this._errorSentRegistrationWP8, this),
                wp8RegistrationOptions
            );

        } else {
            throw new EverliveError({message: 'The current platform is not supported: ' + device.platform});
        }
    }

    _deviceRegistrationSuccessWP(result) {
        this._deviceRegistrationSuccess(result.uri);
    }

    _validateAndroidSettings(androidSettings) {
        if (!androidSettings.senderID) {
            throw new EverliveError({message: 'Sender ID (project number) is not set in the android settings.'});
        }
    }

    _validateWP8Settings(settings) {
        if (!settings.channelName) {
            throw new EverliveError({message: 'channelName is not set in the WP8 settings.'});
        }
    }

    _cleanPlatformsPushSettings(pushSettings) {
        var cleanSettings: any = {};
        pushSettings = pushSettings || {};

        var addSettingsForPlatform = function addSettingsForPlatform(newSettingsObject, platform, allowedFields) {
            if (!pushSettings[platform]) {
                return;
            }

            newSettingsObject[platform] = newSettingsObject[platform] || {};
            var newPlatformSettings = pushSettings[platform];
            var settings = newSettingsObject[platform];
            _.each(allowedFields, function (allowedField: any) {
                if (newPlatformSettings.hasOwnProperty(allowedField)) {
                    settings[allowedField] = newPlatformSettings[allowedField];
                }
            });
        };

        addSettingsForPlatform(cleanSettings, 'iOS', ['badge', 'sound', 'alert', 'interactiveSettings']);
        addSettingsForPlatform(cleanSettings, 'android', ['senderID', 'projectNumber']);
        addSettingsForPlatform(cleanSettings, 'wp8', ['channelName']);

        var callbackFields = ['notificationCallbackAndroid', 'notificationCallbackIOS', 'notificationCallbackWP8'];
        _.each(callbackFields, function (callbackField) {
            var callback = pushSettings[callbackField];
            if (callback) {
                if (typeof callback !== 'function') {
                    throw new EverliveError({message: 'The "' + callbackField + '" of the push settings should be a function'});
                }

                cleanSettings[callbackField] = pushSettings[callbackField];
            }
        });

        if (pushSettings.customParameters) {
            cleanSettings.customParameters = pushSettings.customParameters;
        }

        return cleanSettings;
    }

    _populateRegistrationObject(deviceRegistration, success?: Function, error?: Function) {
        var self = this;

        return buildPromise(
            function (success, error) {
                if (!self.pushToken) {
                    throw new EverliveError({message: 'Push token is not available.'});
                }

                self._getLocaleName(
                    function (locale) {
                        var deviceId = self._getDeviceId();
                        var hardwareModel = device.model;
                        var platformType = self._getPlatformType();
                        var timeZone = jstz.determine().name();
                        var pushToken = self.pushToken;
                        var language = locale.value;
                        var platformVersion = device.version;

                        deviceRegistration.HardwareId = deviceId;
                        deviceRegistration.HardwareModel = hardwareModel;
                        deviceRegistration.PlatformType = platformType;
                        deviceRegistration.PlatformVersion = platformVersion;
                        deviceRegistration.TimeZone = timeZone;
                        deviceRegistration.PushToken = pushToken;
                        deviceRegistration.Locale = language;

                        success();
                    },
                    error
                );
            },
            success,
            error
        );
    }

    _getLocaleName(success?: Function, error?: Function) {
        if (this.emulatorMode) {
            success({value: 'en_US'});
        } else {
            navigator.globalization.getLocaleName(
                function (locale) {
                    success(locale);
                },
                error
            );
            navigator.globalization.getLocaleName(
                function (locale) {
                },
                error
            );
        }
    }

    _getDeviceId() {
        return device.uuid;
    }

    //Returns the Everlive device platform constant given a value aquired from cordova's device.platform.
    _getPlatformType() {
        var psLower = device.platform.toLowerCase();
        switch (psLower) {
            case 'ios':
            case 'iphone':
            case 'ipad':
                return Platform.iOS;
            case 'android':
                return Platform.Android;
            case 'wince':
                return Platform.WindowsPhone;
            case 'win32nt': // real wp8 devices return this string as platform identifier.
                return Platform.WindowsPhone;
            default:
                return Platform.Unknown;
        }
    }

    _deviceRegistrationFailed(error) {
        this.pushToken = null;
        this.isInitializing = false;
        this.isInitialized = false;

        if (this._initErrorCallback) {
            this._initErrorCallback({error: error});
        }
    }

    _deviceRegistrationSuccess(token) {
        this.pushToken = token;
        this.isInitializing = false;
        this.isInitialized = true;

        if (this._initSuccessCallback) {
            this._initSuccessCallback({token: token});
        }
    }

    //Occurs when the device registration in APN succeeds
    _successfulRegistrationAPN(token) {
        var self = this;
        if (this.pushSettings.iOS && this.pushSettings.iOS.interactiveSettings) {
            this._initializeInteractivePush(
                this.pushSettings.iOS,
                function () {
                    self._deviceRegistrationSuccess(token);
                },
                function (err) {
                    throw new EverliveError({message: 'The interactive push configuration is incorrect: ' + err});
                }
            );
        } else {
            this._deviceRegistrationSuccess(token);
        }
    }

    //Occurs if the device registration in APN fails
    _failedRegistrationAPN(error) {
        this._deviceRegistrationFailed(error);
    }

    //Occurs when device registration has been successfully sent to GCM
    _successSentRegistrationGCM(id) {
        //console.log("Successfully sent request for registering with GCM.");
    }

    //Occurs when device registration has been successfully sent for WP8
    _successSentRegistrationWP8(id) {
        //console.log("Successfully sent request for registering WP8 .");
    }

    //Occurs when an error occured when sending registration request for WP8
    _errorSentRegistrationWP8(error) {
        this._deviceRegistrationFailed(error);
    }

    //Occurs when an error occured when sending registration request to GCM
    _errorSentRegistrationGCM(error) {
        this._deviceRegistrationFailed(error);
    }

    //This function receives all notification events from APN
    _onNotificationAPN(e) {
        this._raiseNotificationEventIOS(e);
    }
    //This function receives all notification events for WP8
    _onNotificationWP8(e) {
        this._raiseNotificationEventWP8(e);
    }

    //This function receives all notification events from GCM
    _onNotificationGCM(e) {
        switch (e.event) {
            case 'registered':
                if (e.regid.length > 0) {
                    this._deviceRegistrationSuccess(e.regid);
                }
                break;
            case 'message':
                this._raiseNotificationEventAndroid(e);
                break;
            case 'error':
                if (!this.pushToken) {
                    this._deviceRegistrationFailed(e);
                } else {
                    this._raiseNotificationEventAndroid(e);
                }
                break;
            default:
                this._raiseNotificationEventAndroid(e);
                break;
        }
    }

    _raiseNotificationEventAndroid(e) {
        if (this.pushSettings.notificationCallbackAndroid) {
            this.pushSettings.notificationCallbackAndroid(e);
        }
    }

    _raiseNotificationEventIOS(e) {
        if (this.pushSettings.notificationCallbackIOS) {
            this.pushSettings.notificationCallbackIOS(e);
        }
    }

    _raiseNotificationEventWP8(e) {
        if (this.pushSettings.notificationCallbackWP8) {
            this.pushSettings.notificationCallbackWP8(e);
        }
    }
}

export = CurrentDevice;
