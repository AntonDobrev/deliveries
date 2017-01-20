import {
	Injectable
}
	from '@angular/core';

import Everlive from 'everlive-sdk';

@
	Injectable()

export class backendServicesService {
	private _everlive: Everlive;
	private _everliveQuery: any;
	private _options: {};

	constructor() {
		this._options = {
			appId: 'y1awicxxgmw0vtrc',
			scheme: 'https',
			offline: {
				storage: {
					provider: Everlive.Constants.StorageProvider.SQLite,
					storagePath: 'deliveries'
				},
				typeSettings: {
					'DeliveryOrder': {
						'Scheme': [
							{
								'Name': 'Status',
								'Type': 'INT'
							},
							{
								'Name': 'Comments',
								'Type': 'TEXT'
							},
							{
								'Name': 'DeliveryItem',
								'Type': 'TEXT'
							},
							{
								'Name': 'DeliveryItemType',
								'Type': 'TEXT'
							},
							{
								'Name': 'DeliveryName',
								'Type': 'TEXT'
							},
							{
								'Name': 'DeliveryAddressCity',
								'Type': 'TEXT'
							},
							{
								'Name': 'DeliveryAddressLine1',
								'Type': 'TEXT'
							},
							{
								'Name': 'DeliveryAddressPostcode',
								'Type': 'TEXT'
							},
							{
								'Name': 'DeliveryAddressLine2',
								'Type': 'TEXT'
							}
						]
					}
				}
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