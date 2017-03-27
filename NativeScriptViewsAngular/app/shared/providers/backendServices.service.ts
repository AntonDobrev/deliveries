import { Injectable } from '@angular/core';
import Everlive from 'everlive-sdk';
import { constants } from '../../shared';

@Injectable()
export class BackendServicesService {
	private _everlive: Everlive;
	private _everliveQuery: any;
	private _options: {};

	constructor() {
		this._options = {
			appId: constants.appId,
			scheme: constants.httpScheme,
			offline: {
				syncUnmodified: constants.shouldSyncItemsFromServer,
				conflicts: {
					strategy: Everlive.Constants.ConflictResolutionStrategy.ClientWins
				},
				storage: {
					provider: Everlive.Constants.StorageProvider.SQLite,
					storagePath: constants.deliveriesStoragePathName
				},
				typeSettings: constants.deliveriesMappingScheme
			}
		}

		this._everlive = new Everlive(this._options);
		this._everliveQuery = new Everlive.Query();
	}

	get instance() {
		return this._everlive;
	}

	get query() {
		return this._everliveQuery;
	}
}

// START_CUSTOM_CODE_backendServices
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_backendServices