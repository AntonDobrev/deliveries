import * as path from 'path';
import * as _ from 'underscore';

import { Utils } from '../../utils';
import { EverliveErrors, EverliveError } from '../../EverliveError';
import { HtmlHelper } from "./htmlHelper";

export class HtmlHelperOfflineModule {
    htmlHelper: HtmlHelper;

    constructor(htmlHelper: HtmlHelper) {
        this.htmlHelper = htmlHelper;
    }

    processOffline(url) {
        var self = this;

        if (!self.htmlHelper.sdk.offlineStorage.files) {
            return Utils.rejectedPromise(new EverliveError({message: 'Offline storage must be enabled in order to use the offline features of the images component.'}));
        }

        return self.htmlHelper.sdk.offlineStorage.files.downloadOffline(url)
            .then(function (localUrl) {
                return localUrl;
            })
            .catch(function (err) {
                if (err.code !== EverliveErrors.cannotDownloadOffline.code) {
                    throw err;
                }

                return self.htmlHelper.sdk.offlineStorage.offlineFilesProcessor
                    .getOfflineFilesData()
                    .then(function (offlineFilesData:any) {
                        var basename = path.basename(url);
                        const oldFile:any = _.find(offlineFilesData, function (entry:any) {
                            if (entry.onlineLocation && entry.offlineLocation) {
                                var onlineLocation = entry.onlineLocation;
                                var basenameIndex = onlineLocation.lastIndexOf(basename);
                                return basenameIndex !== -1;
                            }
                        });

                        if (oldFile) {
                            return oldFile.offlineLocation;
                        }

                        throw new EverliveError({message: `Cannot find offline image ${url}`, code: EverliveErrors.missingOrInvalidFileContent.code});
                    });
            });
    }
}