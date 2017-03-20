import * as _ from 'underscore';

import { Utils } from '../utils';
import { EverliveError, EverliveErrors } from '../EverliveError';
import { Data } from '../types/Data';
import { DataQueryOperation } from '../constants';

import { User } from '../interfaces/User';
import { UserInfo } from '../interfaces/UserInfo';
import { SingleResult } from "../interfaces/SingleResult";
import { SuccessCallback } from "../interfaces/SuccessCallback";
import { CreateItemResult } from "../interfaces/CreateItemResult";
import { ErrorCallback } from "../interfaces/ErrorCallback";
import { UserLoginResult } from "../interfaces/UserLoginResult";
import { SocialLoginResult } from "../interfaces/SocialLoginResult";
import { UserSocialIdentity } from "../interfaces/UserSocialIdentity";
import { SetUserPasswordBySecretAnswerPayload } from "../interfaces/SetUserPasswordBySecretAnswerPayload";
import { SetUserPasswordByResetCodePayload } from "../interfaces/SetUserPasswordByResetCodePayload";

export class Users extends Data<User> {
    /**
     * @class Users
     * @extends Data
     * @protected
     */
    constructor(sdk) {
        super(sdk, 'Users');
    }

    /**
     * Registers a new user with username and password.
     * @memberOf Users.prototype
     * @method register
     * @name register
     * @param {string} username The new user's username.
     * @param {string} password The new user's password.
     * @param {object} userInfo Additional information for the user (ex. DisplayName, Email, etc.)
     * @returns {Promise} The promise for the request.
     */
    /**
     * Registers a new user using a username and a password.
     * @memberOf Users.prototype
     * @method register
     * @name register
     * @param {string} username The new user's username.
     * @param {string} password The new user's password.
     * @param attrs
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    register(username: string, password: string, attrs?: UserInfo, success?: SuccessCallback<CreateItemResult>, error?: ErrorCallback): Promise<CreateItemResult> {
        Utils.guardUnset(username, 'username');
        Utils.guardUnset(password, 'password');
        const user = _.extend({
            Username: username,
            Password: password,
        }, attrs);

        return this.create(user, success, error);
    }

    /**
     * Gets information about the user that is currently authenticated to the {{site.bs}} JavaScript SDK. The success function is called with [Users.ResultTypes.currentUserResult]{@link Users.ResultTypes.currentUserResult}.
     * @memberOf Users.prototype
     * @method currentUser
     * @name currentUser
     * @returns {Promise} The promise for the request.
     */
    /**
     * Gets information about the user that is currently authenticated to the {{site.bs}} JavaScript SDK. The success function is called with [Users.ResultTypes.currentUserResult]{@link Users.ResultTypes.currentUserResult}.
     * @memberOf Users.prototype
     * @method currentUser
     * @name currentUser
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    currentUser(success?, error?): Promise<SingleResult<User>> {
        var id = (this.sdk._isOfflineStorageEnabled() && this.sdk.isOffline()) ? this.sdk.setup.principalId : 'me';
        return Utils.buildPromise<SingleResult<User>>((success, error) => {
            if (id === 'me' && !this.sdk.setup.token && !this.sdk.setup.masterKey || !id) {
                return success({result: null});
            }

            this.getById(id).then(
                (res) => {
                    if (typeof res.result !== 'undefined') {
                        success({result: res.result});
                    } else {
                        success({result: null});
                    }
                },
                (err) => {
                    if (this.sdk.authentication && this.sdk.authentication.isAuthenticationInProgress()) {
                        success({result: null});
                    } else if (err.code === 601) { // invalid request, i.e. the access token is missing
                        success({result: null});
                    } else if (err.code === 801) {
                        error(new EverliveError(EverliveErrors.invalidToken));
                    } else {
                        error(err);
                    }
                }
            );
        }, success, error);
    }

    /**
     * Changes the password of a user.
     * @memberOf Users.prototype
     * @method changePassword
     * @name changePassword
     * @param {string} username The user's username.
     * @param {string} password The user's password.
     * @param {string} newPassword The user's new password.
     * @param {boolean=false} [keepTokens] If set to true, the user tokens will be preserved even after the password change.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Changes the password of a user.
     * @memberOf Users.prototype
     * @method changePassword
     * @name changePassword
     * @param {string} username The user's username.
     * @param {string} password The user's password.
     * @param {string} newPassword The user's new password.
     * @param {boolean=false} [keepTokens] If set to true, the user tokens will be preserved even after the password change.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    changePassword(username: string, password: string, newPassword: string, keepTokens = false, success?: SuccessCallback<SingleResult<boolean>>, error?: ErrorCallback): Promise<SingleResult<boolean>> {
        const data = {
            Username: username,
            Password: password,
            NewPassword: newPassword
        };
        const additionalOptions = { keepTokens };
        const dataQuery = this.buildDataQuery({ data, additionalOptions }, DataQueryOperation.UserChangePassword);
        return Utils.buildPromise<SingleResult<boolean>>((success, error) => {
            this.processDataQuery<SingleResult<boolean>>(dataQuery)
                .then(data => {
                    if (data && data.result) {
                        if (!keepTokens) {
                            this.clearAuthorization();
                        }
                    }

                    return success(data);
                })
                .catch(error);
        }, success, error);
    }

    /**
     *
     * Logs in a user using a username and a password to the current {{site.bs}} JavaScript SDK instance. All requests initiated by the current {{site.bs}} JavaScript SDK instance will be authenticated with that user's credentials.
     * @memberOf Users.prototype
     * @method login
     * @name login
     * @deprecated
     * @see [authentication.login]{@link ../Authentication/authentication.login}
     * @param {string} username The user's username.
     * @param {string} password The user's password.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Logs in a user using a username and a password to the current {{site.bs}} JavaScript SDK instance. All requests initiated by the current {{site.bs}} JavaScript SDK instance will be authenticated with that user's credentials.
     * @memberOf Users.prototype
     * @method login
     * @name login
     * @deprecated
     * @see [authentication.login]{@link ../Authentication/authentication.login}
     * @param {string} username The user's username.
     * @param {string} password The user's password.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    login(username: string, password: string, success?: SuccessCallback<UserLoginResult>, error?: ErrorCallback): Promise<UserLoginResult> {
        return this.sdk.authentication.login(username, password, success, error);
    }

    /**
     * Log out the user who is currently logged in.
     * @memberOf Users.prototype
     * @method logout
     * @name logout
     * @deprecated
     * @see [authentication.login]{@link ../Authentication/authentication.logout}
     * @returns {Promise} The promise for the request.
     */
    /**
     * Log out the user who is currently logged in.
     * @memberOf Users.prototype
     * @method logout
     * @name logout
     * @deprecated
     * @see [authentication.login]{@link ../Authentication/authentication.logout}
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    logout(success?: SuccessCallback<{}>, error?: ErrorCallback): Promise<{}> {
        return this.sdk.authentication.logout(success, error);
    }

    /**
     * Log in a user using an Facebook access token.
     * @memberOf Users.prototype
     * @method loginWithFacebook
     * @name loginWithFacebook
     * @deprecated
     * @see [authentication.login]{@link ../Authentication/authentication.loginWithFacebook}
     * @param {string} accessToken Facebook access token.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Log in a user using an Facebook access token.
     * @memberOf Users.prototype
     * @method loginWithFacebook
     * @name loginWithFacebook
     * @deprecated
     * @see [authentication.login]{@link ../Authentication/authentication.loginWithFacebook}
     * @param {string} accessToken Facebook access token.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    loginWithFacebook(accessToken: string, success?: SuccessCallback<SocialLoginResult>, error?: ErrorCallback): Promise<SocialLoginResult> {
        return this.sdk.authentication.loginWithFacebook(accessToken, success, error);
    }

    /**
     * Links a {{site.TelerikBackendServices}} user account to a Facebook access token.
     * @memberOf Users.prototype
     * @method linkWithFacebook
     * @name linkWithFacebook
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {string} accessToken The Facebook access token that will be linked to the {{site.bs}} user account.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Links a Backend Services user with a Facebook access token.
     * @memberOf Users.prototype
     * @method linkWithFacebook
     * @name linkWithFacebook
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {string} accessToken The Facebook access token that will be linked to the {{site.bs}} user account.         * @param {Function} [success] a success callback.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    linkWithFacebook(userId: string, accessToken: string, success?: SuccessCallback<{}>, error?: ErrorCallback): Promise<{}> {
        const identity = {
            Provider: 'Facebook',
            Token: accessToken
        };
        return this._linkWithProvider(identity, userId, success, error);
    }

    /**
     * Unlinks a {{site.TelerikBackendServices}} user account from the Facebook token that it is linked to.
     * @memberOf Users.prototype
     * @method unlinkFromFacebook
     * @name unlinkFromFacebook
     * @param {string} userId The user's ID in {{site.bs}}.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Unlinks a {{site.TelerikBackendServices}} user account from the Facebook token that it is linked to.
     * @memberOf Users.prototype
     * @method unlinkFromFacebook
     * @name unlinkFromFacebook
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    unlinkFromFacebook(userId: string, success?: SuccessCallback<{}>, error?: ErrorCallback): Promise<{}> {
        return this._unlinkFromProvider('Facebook', userId, success, error);
    }

    /**
     * Log in a user using an ADFS access token.
     * @memberOf Users.prototype
     * @method loginWithADFS
     * @name loginWithADFS
     * @deprecated
     * @see [authentication.login]{@link ../Authentication/authentication.loginWithADFS}
     * @param {string} accessToken ADFS access token.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Log in a user using an ADFS access token.
     * @memberOf Users.prototype
     * @method loginWithADFS
     * @name loginWithADFS
     * @deprecated
     * @see [authentication.login]{@link ../Authentication/authentication.loginWithADFS}
     * @param {string} accessToken ADFS access token.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    loginWithADFS(accessToken: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        return this.sdk.authentication.loginWithADFS(accessToken, success, error);
    }

    /**
     * Links a {{site.TelerikBackendServices}} user account to an ADFS access token.
     * @memberOf Users.prototype
     * @method linkWithADFS
     * @name linkWithADFS
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {string} accessToken The ADFS access token that will be linked to the {{site.bs}} user account.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Links a {{site.TelerikBackendServices}} user account to an ADFS access token.
     * @memberOf Users.prototype
     * @method linkWithADFS
     * @name linkWithADFS
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {string} accessToken The ADFS access token that will be linked to the {{site.bs}} user account.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    linkWithADFS(userId: string, accessToken: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        const identity = {
            Provider: 'ADFS',
            Token: accessToken
        };
        return this._linkWithProvider(identity, userId, success, error);
    }

    /**
     * Unlinks a {{site.TelerikBackendServices}} user account from the ADFS token that it is linked to.
     * @memberOf Users.prototype
     * @method unlinkFromADFS
     * @name unlinkFromADFS
     * @param {string} userId The user's ID in {{site.bs}}.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Unlinks a {{site.TelerikBackendServices}} user account from the ADFS token that it is linked to.
     * @memberOf Users.prototype
     * @method unlinkFromADFS
     * @name unlinkFromADFS
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    unlinkFromADFS(userId: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        return this._unlinkFromProvider('ADFS', userId, success, error);
    }

    /**
     * Links a {{site.TelerikBackendServices}} user account to an SAML access token.
     * @memberOf Users.prototype
     * @method linkWithSAML
     * @name linkWithSAML
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {string} accessToken The SAML access token that will be linked to the {{site.bs}} user account.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Links a {{site.TelerikBackendServices}} user account to an SAML access token.
     * @memberOf Users.prototype
     * @method linkWithSAML
     * @name linkWithSAML
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {string} accessToken The SAML access token that will be linked to the {{site.bs}} user account.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    linkWithSAML(userId: string, accessToken: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        var identity = {
            Provider: 'SAML',
            Token: accessToken
        };
        return this._linkWithProvider(identity, userId, success, error);
    }

    /**
     * Unlinks a {{site.TelerikBackendServices}} user account from the SAML token that it is linked to.
     * @memberOf Users.prototype
     * @method unlinkFromSAML
     * @name unlinkFromSAML
     * @param {string} userId The user's ID in {{site.bs}}.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Unlinks a {{site.TelerikBackendServices}} user account from the SAML token that it is linked to.
     * @memberOf Users.prototype
     * @method unlinkFromSAML
     * @name unlinkFromSAML
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    unlinkFromSAML(userId: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        return this._unlinkFromProvider('SAML', userId, success, error);
    }

    /**
     * Log in a user using a Microsoft Account access token.
     * @memberOf Users.prototype
     * @method loginWithLiveID
     * @name loginWithLiveID
     * @deprecated
     * @see [authentication.login]{@link ../Authentication/authentication.loginWithLiveID}
     * @param {string} accessToken Microsoft Account access token.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Log in a user using a Microsoft Account access token.
     * @memberOf Users.prototype
     * @method loginWithLiveID
     * @name loginWithLiveID
     * @deprecated
     * @see [authentication.login]{@link ../Authentication/authentication.loginWithLiveID}
     * @param {string} accessToken Microsoft Account access token.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    loginWithLiveID(accessToken: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        return this.sdk.authentication.loginWithLiveID(accessToken, success, error);
    }

    /**
     * Links a {{site.TelerikBackendServices}} user account to a Microsoft Account access token.
     * @memberOf Users.prototype
     * @method linkWithLiveID
     * @name linkWithLiveID
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {string} accessToken The Microsoft Account access token that will be linked to the {{site.bs}} user account.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Links a {{site.TelerikBackendServices}} user account to a Microsoft Account access token.
     * @memberOf Users.prototype
     * @method linkWithLiveID
     * @name linkWithLiveID
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {string} accessToken The Microsoft Account access token that will be linked to the {{site.bs}} user account.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    linkWithLiveID(userId: string, accessToken: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        const identity = {
            Provider: 'LiveID',
            Token: accessToken
        };
        return this._linkWithProvider(identity, userId, success, error);
    }

    /**
     * Unlinks a {{site.TelerikBackendServices}} user account from the Microsoft Account access token that it is linked to.
     * @memberOf Users.prototype
     * @method unlinkFromLiveID
     * @name unlinkFromLiveID
     * @param {string} userId The user's ID in {{site.bs}}.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Unlinks a {{site.TelerikBackendServices}} user account from the Microsoft Account access token that it is linked to.
     * @memberOf Users.prototype
     * @method unlinkFromLiveID
     * @name unlinkFromLiveID
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    unlinkFromLiveID(userId: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        return this._unlinkFromProvider('LiveID', userId, success, error);
    }

    /**
     * Log in a user using a Google access token.
     * @memberOf Users.prototype
     * @method loginWithGoogle
     * @name loginWithGoogle
     * @deprecated
     * @see [authentication.login]{@link ../Authentication/authentication.loginWithGoogle}
     * @param {string} accessToken Google access token.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Log in a user using a Google access token.
     * @memberOf Users.prototype
     * @method loginWithGoogle
     * @name loginWithGoogle
     * @deprecated
     * @see [authentication.login]{@link ../Authentication/authentication.loginWithGoogle}
     * @param {string} accessToken Google access token.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    loginWithGoogle(accessToken: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        return this.sdk.authentication.loginWithGoogle(accessToken, success, error);
    }

    /**
     * Links a {{site.TelerikBackendServices}} user account to a Google access token.
     * @memberOf Users.prototype
     * @method linkWithGoogle
     * @name linkWithGoogle
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {string} accessToken The Google access token that will be linked to the {{site.bs}} user account.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Links a {{site.TelerikBackendServices}} user account to a Google access token.
     * @memberOf Users.prototype
     * @method linkWithGoogle
     * @name linkWithGoogle
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {string} accessToken The Google access token that will be linked to the {{site.bs}} user account.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    linkWithGoogle(userId: string, accessToken: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        const identity = {
            Provider: 'Google',
            Token: accessToken
        };
        return this._linkWithProvider(identity, userId, success, error);
    }

    /**
     * Unlinks a {{site.TelerikBackendServices}} user account from the Google access token that it is linked to.
     * @memberOf Users.prototype
     * @method unlinkFromGoogle
     * @name unlinkFromGoogle
     * @param {string} userId The user's ID in {{site.bs}}.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Unlinks a {{site.TelerikBackendServices}} user account from the Google access token that it is linked to.
     * @memberOf Users.prototype
     * @method unlinkFromGoogle
     * @name unlinkFromGoogle
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    unlinkFromGoogle(userId: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        return this._unlinkFromProvider('Google', userId, success, error);
    }

    /**
     * Log in a user with a Twitter token. A secret token needs to be provided.
     * @memberOf Users.prototype
     * @method loginWithTwitter
     * @name loginWithTwitter
     * @param {string} token Twitter token.
     * @param {string} tokenSecret Twitter secret token.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Log in a user with a Twitter token. A secret token needs to be provided.
     * @memberOf Users.prototype
     * @method loginWithTwitter
     * @name loginWithTwitter
     * @param {string} token Twitter token.
     * @param {string} tokenSecret Twitter secret token.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    loginWithTwitter(token: string, tokenSecret: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        return this.sdk.authentication.loginWithTwitter(token, tokenSecret, success, error);
    }

    /**
     * Links a {{site.TelerikBackendServices}} user to a Twitter token. A secret token needs to be provided.
     * @memberOf Users.prototype
     * @method linkWithTwitter
     * @name linkWithTwitter
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {string} token The Twitter access token that will be linked to the {{site.bs}} user account.
     * @param {string} tokenSecret The Twitter secret token.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Links a {{site.TelerikBackendServices}} user to a Twitter token. A secret token needs to be provided.         * Links a Backend Services user with a Twitter token. A secret token needs to be provided.
     * @memberOf Users.prototype
     * @method linkWithTwitter
     * @name linkWithTwitter
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {string} token The Twitter access token that will be linked to the {{site.bs}} user account.
     * @param {string} tokenSecret The Twitter secret token.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    linkWithTwitter(userId: string, token: string, tokenSecret: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        const identity = {
            Provider: 'Twitter',
            Token: token,
            TokenSecret: tokenSecret
        };
        return this._linkWithProvider(identity, userId, success, error);
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
    loginWithSAML(accessToken: string, success?: SuccessCallback<any>, error?: ErrorCallback) {
        return this.sdk.authentication.loginWithGoogle(accessToken, success, error);
    };

    /**
     * Unlinks a {{site.TelerikBackendServices}} user account from the Twitter access token that it is linked to.
     * @memberOf Users.prototype
     * @method unlinkFromTwitter
     * @name unlinkFromTwitter
     * @param {string} userId The user's ID in {{site.bs}}.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Unlinks a {{site.TelerikBackendServices}} user account from the Twitter access token that it is linked to.
     * @memberOf Users.prototype
     * @method unlinkFromTwitter
     * @name unlinkFromTwitter
     * @param {string} userId The user's ID in {{site.bs}}.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    unlinkFromTwitter(userId: string, success?: SuccessCallback<any>, error?: ErrorCallback): Promise<any> {
        return this._unlinkFromProvider('Twitter', userId, success, error);
    }

    /**
     * Sets the token and token type that the {{site.TelerikBackendServices}} JavaScript SDK will use for authorization.
     * @memberOf Users.prototype
     * @method setAuthorization
     * @deprecated
     * @see [authentication.login]{@link ../Authentication/authentication.setAuthorization}
     * @param {string} token Token that will be used for authorization.
     * @param {Everlive.TokenType} tokenType Token type. Currently only 'bearer' token is supported.
     * @param {string} principalId The id of the user that is logged in.
     */
    setAuthorization(token: string, tokenType: string, principalId: string): void {
        this.sdk.authentication.setAuthorization(token, tokenType, principalId);
    }

    /**
     * Clears the authentication token that the {{site.bs}} JavaScript SDK currently uses. Note that this is different than logging out, because the current authorization token is not invalidated.
     * @method clearAuthorization
     * @deprecated
     * @see [authentication.login]{@link ../Authentication/authentication.clearAuthorization}
     * @memberOf Users.prototype
     */
    clearAuthorization(): void {
        this.sdk.authentication.setAuthorization(null, null, null);
    }

    /**
     * Sends a password reset email to a specified user.
     * @memberOf Users.prototype
     * @method resetPassword
     * @name resetPassword
     * @param {Object} user The user object, which must contain either username or email address.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Sends a password reset email to a specified user.
     * @memberOf Users.prototype
     * @method resetPassword
     * @name resetPassword
     * @param {Object} user The user object, which must contain either username or email address.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    resetPassword(user: { Email?: string; Username: string }, success?: SuccessCallback<SingleResult<boolean>>, error?: ErrorCallback): Promise<SingleResult<boolean>> {
        const dataQuery = this.buildDataQuery(user, DataQueryOperation.UserResetPassword);
        return this.processDataQuery<SingleResult<boolean>>(dataQuery, success, error);
    }

    /**
     * Set a new password for a user using a password reset code.
     * @memberOf Users.prototype
     * @method setPassword
     * @name setPassword
     * @param {object} setPasswordObject The object, which contains information necessary for changing the user password.
     * @param {string} setPasswordObject.Username The username that the password will be changed.
     * @param {number} setPasswordObject.SecretQuestionId The id of the secret question.
     * @param {string} setPasswordObject.SecretAnswer The answer to the secret question.
     * @param {string} setPasswordObject.NewPassword The new password for the user.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Set a new password for a user using a password reset code.
     * @memberOf Users.prototype
     * @method setPassword
     * @name setPassword
     * @param {object} setPasswordObject The object, which contains information necessary for changing the user password.
     * @param {string} setPasswordObject.Username The username that the password will be changed.
     * @param {number} setPasswordObject.SecretQuestionId The id of the secret question.
     * @param {string} setPasswordObject.SecretAnswer The answer to the secret question.
     * @param {string} setPasswordObject.NewPassword The new password for the user.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */
    /**
     * Set a new password for a user using a password reset code.
     * @memberOf Users.prototype
     * @method setPassword
     * @name setPassword
     * @param {object} setPasswordObject The object, which contains information necessary for changing the user password.
     * @param {string} setPasswordObject.ResetCode The reset code obtained using a password reset email.
     * @param {string} setPasswordObject.NewPassword The new password for the user.
     * @returns {Promise} The promise for the request.
     */
    /**
     * Set a new password for a user using a password reset code.
     * @memberOf Users.prototype
     * @method setPassword
     * @name setPassword
     * @param {object} setPasswordObject The object, which contains information necessary for changing the user password.
     * @param {string} setPasswordObject.ResetCode The reset code obtained using a password reset email.
     * @param {string} setPasswordObject.NewPassword The new password for the user.
     * @param {Function} [success] A success callback.
     * @param {Function} [error] An error callback.
     */

    setPassword(setPasswordObject: SetUserPasswordBySecretAnswerPayload, success?: SuccessCallback<SingleResult<boolean>>, error?: ErrorCallback): Promise<SingleResult<boolean>>;
    setPassword(setPasswordObject: SetUserPasswordByResetCodePayload, success?: SuccessCallback<SingleResult<boolean>>, error?: ErrorCallback): Promise<SingleResult<boolean>>;
    setPassword(setPasswordObject: SetUserPasswordBySecretAnswerPayload|SetUserPasswordByResetCodePayload, success?: SuccessCallback<SingleResult<boolean>>, error?: ErrorCallback): Promise<SingleResult<boolean>> {
        const dataQuery = this.buildDataQuery(setPasswordObject, DataQueryOperation.UserSetPassword);
        return this.processDataQuery<SingleResult<boolean>>(dataQuery, success, error);
    }

    skipAuth(options: boolean): this {
        return super.skipAuth(options);
    }

    private _linkWithProvider(identity: UserSocialIdentity, userId: string, success?: SuccessCallback<{}>, error?: ErrorCallback): Promise<{}> {
        const dataQuery = this.buildDataQuery({
            additionalOptions: {
                id: userId
            },
            data: identity
        }, DataQueryOperation.UserLinkWithProvider);
        return this.processDataQuery<{}>(dataQuery, success, error);
    }

    private _unlinkFromProvider(providerName: string, userId: string, success?: SuccessCallback<{}>, error?: ErrorCallback): Promise<{}> {
        const dataQuery = this.buildDataQuery({
            additionalOptions: {id: userId},
            data: {
                Provider: providerName
            }
        }, DataQueryOperation.UserUnlinkFromProvider);
        return this.processDataQuery<{}>(dataQuery, success, error);
    }
}
