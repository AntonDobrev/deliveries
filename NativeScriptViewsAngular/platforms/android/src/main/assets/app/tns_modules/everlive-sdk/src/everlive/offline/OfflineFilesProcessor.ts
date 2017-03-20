import * as _ from 'underscore';
import * as path from 'path'; //TODO: not sure that this is correct, the typings just seem off

import { EverliveError, EverliveErrors } from '../EverliveError';
import { FileStore, getFileStore } from '../storages/FileStore';
import * as platform from '../../common/platform';
import { Utils } from '../utils';
import { Everlive } from '../Everlive';

const FILES_METADATA_FILE_NAME = 'filesMetadataMap';

export class OfflineFilesProcessor {
    fileStore:FileStore;
    filesMetaStore:FileStore;

    private _offlineFilesData:any;

    constructor(public setup:any,
                private _everlive:Everlive) {

        this.fileStore = getFileStore(setup.files.storagePath, setup);
        this.filesMetaStore = getFileStore(setup.files.metaPath, setup);
    }

    validateFileCreateObject(obj, isSync) {
        return new Promise(function (resolve, reject) {
            if (!obj.base64 && !isSync) {
                return reject(new EverliveError(EverliveErrors.missingOrInvalidFileContent));
            } else if (!obj.ContentType) {
                return reject(new EverliveError(EverliveErrors.missingContentType));
            } else if (!obj.Filename) {
                //TODO: [offline] add an appropriate error
                return reject(new EverliveError(EverliveErrors.invalidRequest));
            }

            resolve();
        });
    }

    getOfflineFilesData() {
        var self = this;

        return new Promise(function (resolve, reject) {
            if (!self._offlineFilesData) {
                return self.filesMetaStore.getFile(FILES_METADATA_FILE_NAME)
                    .then(function (metadataFileHandle) {
                        return self.filesMetaStore.readFileAsText(metadataFileHandle);
                    })
                    .then(function (metadataText) {
                        if (!metadataText) {
                            metadataText = '[]';
                        }

                        self._offlineFilesData = JSON.parse(metadataText);
                        resolve(self._offlineFilesData);
                    }).catch(reject);
            } else {
                resolve(self._offlineFilesData);
            }
        });
    }

    saveOfflineFilesData() {
        var self = this;

        return self.getOfflineFilesData()
            .then(function (offlineFilesData) {
                return self.filesMetaStore.writeText(FILES_METADATA_FILE_NAME, JSON.stringify(offlineFilesData));
            });
    }

    upsertFileFromObject(obj, isCreate, isSync) {
        //TODO: make separate offline files processors when we start supporting nativescript
        if (platform.isDesktop || platform.isNativeScript) {
            //we will not support files in desktop and nativescript, only their metadata
            return Utils.successfulPromise();
        }

        var self = this;

        if (!isSync) {
            if (isCreate) {
                if (!obj.base64) {
                    return Utils.rejectedPromise(new EverliveError(EverliveErrors.missingOrInvalidFileContent));
                }

                if (!obj.ContentType) {
                    return Utils.rejectedPromise(new EverliveError(EverliveErrors.missingContentType));
                }
            } else {
                if (!obj.base64) {
                    return Utils.successfulPromise();
                }
            }
        }

        if (!obj.base64) {
            var id = Utils.getId(obj);
            var uri;
            var downloadFilePromise = obj.Uri ? Utils.successfulPromise(obj.Uri) :
                self._everlive.files
                    .isSync(isSync)
                    .applyOffline(false)
                    .getDownloadUrlById(id);

            return downloadFilePromise.then(function (_uri) {
                uri = _uri;
                return self._everlive.offlineStorage.files.existsOffline(id);
            }).then(function (exists) {
                if (!exists) {
                    return self._everlive.offlineStorage.files._saveFile(uri, obj.Filename);
                }
            });
        }

        obj.Storage = 'internal';
        return Utils.successfulPromise().then(function () {
            if (!isSync) {
                return self.validateFileCreateObject(obj, isSync);
            }
        }).then(function () {
            var onlineLocation = obj.Uri;
            var filename = self.getFilenameForObject(obj);

            var offlineFileInfo;
            var base64Contents = obj.base64;
            delete obj.base64;

            var contents = Utils.b64toBlob(base64Contents, obj.ContentType);

            return self.writeFile(filename, contents)
                .then(function (fileInfo) {
                    offlineFileInfo = fileInfo;
                    return self.getOfflineFilesData();
                })
                .then(function (offlineFilesData) {
                    offlineFilesData.push({
                        offlineLocation: offlineFileInfo.offlineLocation,
                        onlineLocation: onlineLocation,
                        id: obj._id
                    });

                    obj.Length = offlineFileInfo.size;
                    return self.saveOfflineFilesData();
                });
        });
    }

    purge(localLocation) {
        var self = this;

        return this.getOfflineFilesData()
            .then(function (offlineFilesData: any) {
                var offlineFile = _.where(offlineFilesData, {offlineLocation: localLocation});

                // TODO: [offline] check if the length of offlineFile === 0
                var offlineInfoIndex = offlineFilesData.indexOf(offlineFile[0]);
                if (offlineInfoIndex !== -1) {
                    offlineFilesData.splice(offlineInfoIndex, 1);
                }

                return self.saveOfflineFilesData();
            })
            .then(function () {
                return self.fileStore.getFileByAbsolutePath(localLocation);
            }).then(function (file) {
                if (file) {
                    return self.fileStore.removeFile(file);
                }
            });
    }

    writeFile(filename, contents, folder?) {
        var self = this;
        var offlineLocation;

        return self.fileStore.writeText(filename, contents, folder)
            .then(function (locationOnDisk) {
                offlineLocation = locationOnDisk;
                return self.saveOfflineFilesData();
            })
            .then(function () {
                return self.fileStore.getFileSize(filename, folder);
            })
            .then(function (size) {
                return {
                    size: size,
                    offlineLocation: offlineLocation
                };
            });
    }

    getFilenameForObject(obj) {
        var extension = path.extname(obj.Filename);
        return obj._id + extension;
    }

    getOfflineLocation(url, id) {
        return this.getOfflineFilesData()
            .then(function (offlineFilesData: any[]) {
                if (!url && !id) {
                    return;
                }

                for (var i = 0; i < offlineFilesData.length; i++) {
                    var fileEntry = offlineFilesData[i];
                    var urlMatches = (url && (fileEntry.offlineLocation === url || fileEntry.onlineLocation === url));
                    var idMatches = (id && fileEntry.id === id);
                    if (urlMatches || idMatches) {
                        return fileEntry.offlineLocation;
                    }
                }
            });
    }
}