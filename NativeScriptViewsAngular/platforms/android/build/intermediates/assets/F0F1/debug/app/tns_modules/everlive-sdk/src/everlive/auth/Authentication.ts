import { DataQueryOperation } from "../../common/Constants";

import { Utils } from '../utils';
import { Constants } from '../constants';
import { LocalStore } from '../storages/LocalStore';
import { EverliveErrors } from '../EverliveError';
import { Data } from '../types/Data';
import { Everlive } from "../Everlive";
import { UserLoginResult } from "../interfaces/UserLoginResult";
import { SuccessCallback } from "../interfaces/SuccessCallback";
import { ErrorCallback } from "../interfaces/ErrorCallback";
import { SocialLoginResult } from "../interfaces/SocialLoginResult";
import { AuthInfoResult } from "../interfaces/AuthInfoResult";

const buildPromise = Utils.buildPromise;
const getCallbacks = Utils.getCallbacks;

export default class Authentication extends Data<any> {
    authSetup;
    _authenticationCallbacks;
    _localStore: LocalStore;

    /**
     * @class Authentication
     * @classdesc A class for managing authentication of a user in your application.
     * @protected
     * @param sdk {Everlive} Everlive Object
     */
    constructor(sdk: Everlive) {
        super(sdk, 'Users');

        this.authSetup = sdk.setup.authentication || {};
        this._authenticationCallbacks = null;
        if (this.authSetup.persist) {
            this._localStore = new LocalStore(sdk);
            const localStoreKey = this._getLocalStoreKey();
            const authOptions = this._localStore.getItem(localStoreKey);
            let authInfo;
            if (authOptions) {
                authInfo = JSON.parse(this._localStore.getItem(localStoreKey));
            }
            if (authInfo) {
                this.sdk.setup.setAuthorizationProperties(authInfo.token, authInfo.tokenType, authInfo.principalId);
            }
        }
    }

    _getLocalStoreKey() {
        return Constants.AuthStoreKey + this.sdk.setup.appId + '$authentication';
    }

    /** Ensures that authentication is completed before continuing.
     * @memberOf Authentication.prototype
     * @private
     * @returns {Promise} A promise that will be resolved when the authentication is complete. See {{@link Everlive.prototype.completeAuthentication}}.
     * @throws throws an error if no onAuthenticationRequired handler is provided to the options.
     */
    _ensureAuthentication() {
        if (!this.isAuthenticationInProgress()) {
            throw new Error('onAuthenticationRequired option of Everlive.CommonSetup.Authentication is required.');
        }
        if (this.isAuthenticating()) {
            return this._authenticationCallbacks.promise;
        }

        this.clearAuthorization();
        this.authSetup.onAuthenticationRequired.call(this);
        this._authenticationCallbacks = getCallbacks();
        return this._authenticationCallbacks.promise;
    }

    _loginSuccess(data) {
        const result = data.result;
        this.setAuthorization(result.access_token, result.token_type, result.principal_id);
    }

    _logoutSuccess() {
        this.clearAuthorization();
    }

    _loginWithProvider(identity, success, error) {
        const user = {
            Identity: identity
        };

        const dataQuery = this.buildDataQuery(user, DataQueryOperation.UserLoginWithProvider);
        return buildPromise((success, error) => {
            return this.processDataQuery(dataQuery)
                .then((data) => {
                    this._loginSuccess(data);
                    return success(data);
                })
                .catch(error);
        }, success, error);
    }

    /**
     * Logs in a user using a username and a password to the current {{site.bs}} JavaScript SDK instance. All requests initiated by the current {{site.bs}} JavaScript SDK instance will be authenticated with that user's credentials.
     * @memberOf Authentication.prototype
     * @method login
     * @name login
     * @param {string} username The user's username.
     * @param {string} password The user's password.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Logs in a user using a username and a password to the current {{site.bs}} JavaScript SDK instance. All requests initiated by the current {{site.bs}} JavaScript SDK instance will be authenticated with that user's credentials.
     * @memberOf Authentication.prototype
     * @method login
     * @name login
     * @param {string} username The user's username.
     * @param {string} password The user's password.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    login(username: string, password: string, success?: SuccessCallback<UserLoginResult>, error?: ErrorCallback): Promise<UserLoginResult> {
        const grant_type = 'password';
        const data = {grant_type, username, password};
        const dataQuery = this.buildDataQuery(data, DataQueryOperation.UserLogin);
        return buildPromise((success, error) => {
            return this.processDataQuery(dataQuery)
                .then((data) => {
                    this._loginSuccess(data);
                    return success(data);
                })
                .catch(error);
        }, success, error);
    }

    /**
     * Log out the user who is currently logged in.
     * @memberOf Authentication.prototype
     * @method logout
     * @name logout
     * @returns {Promise} The promise for the request.
     */
    /**
     * Log out the user who is currently logged in.
     * @memberOf Authentication.prototype
     * @method logout
     * @name logout
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    logout(success?: SuccessCallback<{}>, error?: ErrorCallback): Promise<{}> {
        const dataQuery = this.buildDataQuery(null, DataQueryOperation.UserLogout);
        return buildPromise((success, error) => {
            return this.processDataQuery(dataQuery)
                .then((...args) => {
                    this._logoutSuccess();
                    return success(...args);
                })
                .catch(err => {
                    if (err.code === 301) { //invalid token
                        this.clearAuthorization();
                    }

                    return error(err);
                });
        }, success, error);
    }

    /**
     * Log in a user using an Facebook access token.
     * @memberOf Authentication.prototype
     * @method loginWithFacebook
     * @name loginWithFacebook
     * @param {string} accessToken Facebook access token.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Log in a user using an Facebook access token.
     * @memberOf Authentication.prototype
     * @method loginWithFacebook
     * @name loginWithFacebook
     * @param {string} accessToken Facebook access token.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    loginWithFacebook(accessToken: string, success?: SuccessCallback<SocialLoginResult>, error?: ErrorCallback): Promise<SocialLoginResult> {
        const identity = {
            Provider: 'Facebook',
            Token: accessToken
        };
        return this._loginWithProvider(identity, success, error);
    }

    /**
     * Log in a user using an ADFS access token.
     * @memberOf Authentication.prototype
     * @method loginWithADFS
     * @name loginWithADFS
     * @param {string} accessToken ADFS access token.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Log in a user using an ADFS access token.
     * @memberOf Authentication.prototype
     * @method loginWithADFS
     * @name loginWithADFS
     * @param {string} accessToken ADFS access token.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    loginWithADFS(accessToken: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        const identity = {
            Provider: 'ADFS',
            Token: accessToken
        };
        return this._loginWithProvider(identity, success, error);
    }

    /**
     * Log in a user using an SAML access token.
     * @memberOf Authentication.prototype
     * @method loginWithSAML
     * @name loginWithSAML
     * @param {string} accessToken SAML access token.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Log in a user using an SAML access token.
     * @memberOf Authentication.prototype
     * @method loginWithSAML
     * @name loginWithSAML
     * @param {string} accessToken SAML access token.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    loginWithSAML(accessToken, success, error) {
        var identity = {
            Provider: 'SAML',
            Token: accessToken
        };
        return this._loginWithProvider(identity, success, error);
    };

    /**
     * Log in a user using a LiveID access token.
     * @memberOf Authentication.prototype
     * @method loginWithLiveID
     * @name loginWithLiveID
     * @param {string} accessToken LiveID access token.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Log in a user using a LiveID access token.
     * @memberOf Authentication.prototype
     * @method loginWithLiveID
     * @name loginWithLiveID
     * @param {string} accessToken LiveID access token.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    loginWithLiveID(accessToken: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        const identity = {
            Provider: 'LiveID',
            Token: accessToken
        };
        return this._loginWithProvider(identity, success, error);
    }

    /**
     * Log in a user using a Google access token.
     * @memberOf Authentication.prototype
     * @method loginWithGoogle
     * @name loginWithGoogle
     * @param {string} accessToken Google access token.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Log in a user using a Google access token.
     * @memberOf Authentication.prototype
     * @method loginWithGoogle
     * @name loginWithGoogle
     * @param {string} accessToken Google access token.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    loginWithGoogle(accessToken: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        const identity = {
            Provider: 'Google',
            Token: accessToken
        };
        return this._loginWithProvider(identity, success, error);
    }

    /**
     * Log in a user with a Twitter token. A secret token needs to be provided.
     * @memberOf Authentication.prototype
     * @method loginWithTwitter
     * @name loginWithTwitter
     * @param {string} token Twitter token.
     * @param {string} tokenSecret Twitter secret token.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Log in a user with a Twitter token. A secret token needs to be provided.
     * @memberOf Authentication.prototype
     * @method loginWithTwitter
     * @name loginWithTwitter
     * @param {string} token Twitter token.
     * @param {string} tokenSecret Twitter secret token.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    loginWithTwitter(token: string, tokenSecret: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        const identity = {
            Provider: 'Twitter',
            Token: token,
            TokenSecret: tokenSecret
        };

        return this._loginWithProvider(identity, success, error);
    }

    /**
     * Sets the token and token type that the {{site.TelerikBackendServices}} JavaScript SDK will use for authorization.
     * @memberOf Authentication.prototype
     * @method setAuthorization
     * @param {string} token Token that will be used for authorization.
     * @param {Everlive.TokenType} tokenType Token type. Currently only 'bearer' token is supported.
     * @param {string} principalId The id of the user that is logged in.
     */
    setAuthorization(token: string, tokenType: string, principalId: string): void {
        this.sdk.setup.setAuthorizationProperties(token, tokenType, principalId);

        if (this.authSetup.persist) {
            var localStoreKey = this._getLocalStoreKey();
            var authorizationProperties = this.sdk.setup.getAuthorizationProperties();
            this._localStore.setItem(localStoreKey, JSON.stringify(authorizationProperties));
        }

        if (this._authenticationCallbacks) {
            this._authenticationCallbacks.success();
            this._authenticationCallbacks = null;
        }
    }

    /**
     * Clears the authentication token that the {{site.bs}} JavaScript SDK currently uses. Note that this is different than logging out, because the authorization token that was used, will not be invalidated.
     * @method clearAuthorization
     * @memberOf Authentication.prototype
     */
    clearAuthorization(): void {
        this.setAuthorization(null, null, null);
        this.clearPersistedAuthentication();
    }

    /**
     * Clears the current persisted authentication from the local store for the current {{site.bs}} JavaScript SDK instance. Will not logout or modify the current authentication of the Javascript SDK.
     * @method clearPersistedAuthentication
     * @memberOf Authentication.prototype
     */
    clearPersistedAuthentication() {
        if (this._localStore) {
            var localStoreKey = this._getLocalStoreKey();
            this._localStore.removeItem(localStoreKey);
            this.sdk.setup.setAuthorizationProperties(null, null, null);
        }
    }

    /**
     * @memberOf Authentication.prototype
     * Returns whether authentication requirement is enabled for the current instance of the {{site.bs}} JavaScript SDK.
     * @returns {boolean} whether an onAuthenticationRequired function is provided
     */
    isAuthenticationInProgress() {
        return typeof this.authSetup.onAuthenticationRequired === 'function';
    }

    /**
     * A method that should be called with the authentication result.
     * @memberOf Authentication.prototype
     * @param authentication authentication object containing information about the
     * @param authentication.access_token
     * @param authentication.token_type
     * @param authentication.principal_id
     */
    completeAuthentication(authentication) {
        this.sdk.authentication.setAuthorization(authentication.access_token, authentication.token_type, authentication.principal_id);
    }

    /**
     * Gets the current authentication status of the {{site.TelerikBackendServices}} JavaScript SDK instance.
     * @memberOf Authentication.prototype
     * @method getAuthenticationStatus
     * @name getAuthenticationStatus
     * @returns {Promise} A promise to the authentication status.
     */
    /**
     * Gets the current authentication status of the {{site.TelerikBackendServices}} JavaScript SDK instance.
     * @memberOf Authentication.prototype
     * @method getAuthenticationStatus
     * @name getAuthenticationStatus
     * @param {Everlive.Callbacks.authenticationStatusSuccess} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
     getAuthenticationStatus(success?: SuccessCallback<AuthInfoResult>, error?: ErrorCallback): Promise<AuthInfoResult> {
        return buildPromise((success, error) => {
            var setup = this.sdk.setup;
            if (setup.masterKey) {
                return success({status: Constants.AuthStatus.masterKey});
            }

            if (!setup.token) {
                return success({status: Constants.AuthStatus.unauthenticated});
            }

            if (this.isAuthenticationInProgress()) {
                return success({status: Constants.AuthStatus.authenticating});
            }

            return this.sdk.users
                .skipAuth(true)
                .currentUser()
                .then(function (res) {
                    return success({status: Constants.AuthStatus.authenticated, user: res.result});
                }, err => {
                    if (this.isAuthenticationInProgress()) {
                        return success({status: Constants.AuthStatus.authenticating});
                    } else if (err.code === EverliveErrors.invalidRequest.code || err.code === EverliveErrors.invalidToken.code) { // invalid request, i.e. the access token is invalid or missing
                        return success({status: Constants.AuthStatus.invalidAuthentication});
                    } else if (err.code === EverliveErrors.expiredToken.code) {
                        return success({status: Constants.AuthStatus.expiredAuthentication});
                    } else {
                        return error(err);
                    }
                });
        }, success, error);
     }

    /** Returns whether the {{site.TelerikBackendServices}} is currently waiting for authentication to be completed. See {{@link Everlive.prototype.completeAuthentication}}.
     * @memberOf Everlive.prototype
     * @returns {boolean}
     */
    isAuthenticating() {
        return !!this._authenticationCallbacks;
    }
}
