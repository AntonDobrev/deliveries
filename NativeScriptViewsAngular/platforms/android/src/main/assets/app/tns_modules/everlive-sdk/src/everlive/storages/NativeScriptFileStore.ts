import { FileStore } from './FileStore';

export class NativeScriptFileStore implements FileStore {
    fs: any;
    dataDirectoryPath: string;
    filesDirectoryPath: string;

    constructor(
        public storagePath: string,
        public options: any
    ) {
        this.options = options;
        try {
            this.fs = require('file-system');
        } catch (err) { throw err; } // because of webpack external dependency declaration - this marks it as optional
        this.dataDirectoryPath = this.fs.knownFolders.documents().path;
        this.filesDirectoryPath = this.fs.path.join(this.dataDirectoryPath, storagePath);
    }

    getErrorHandler(callback: Function) {
        return function (e) {
            callback && callback(e);
        }
    }

    removeFilesDirectory() {
        var self = this;

        return self.getFilesDirectory()
            .then(function (filesDirectory: any) {
                return filesDirectory.remove();
            });
    }

    removeFile(fileEntry) {
        return fileEntry.remove();
    }

    readFileAsText(fileEntry) {
        return fileEntry.readText();
    }

    writeTextToFile(fileEntry, content) {
        return fileEntry.writeText(content);
    }

    getFile(path) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.resolveDataDirectory()
                .then(function (directoryEntry: any) {
                    var fullFilePath = self.fs.path.join(directoryEntry.path, path);
                    var file = self.fs.File.fromPath(fullFilePath);
                    resolve(file);
                })
                .catch(reject);
        });
    }

    getFilesDirectory() {
        var self = this;

        return new Promise(function (resolve) {
            var filesDirectory = self.fs.Folder.fromPath(self.filesDirectoryPath);
            resolve(filesDirectory);
        });
    }

    resolveDataDirectory() {
        var self = this;

        return new Promise(function (resolve) {
            var dataDirectory = self.fs.Folder.fromPath(self.dataDirectoryPath);
            resolve(dataDirectory);
        });
    }

    ensureFilesDirectory() {
        var self = this;

        return new Promise(function (resolve, reject) {
            self.resolveDataDirectory()
                .then(function (directoryEntry: any) {
                    var fileDirectoryPath = self.fs.path.join(directoryEntry.path, self.filesDirectoryPath);
                    self.fs.Folder.fromPath(fileDirectoryPath);
                    resolve();
                })
                .catch(reject);
        });
    }

    getFilesDirectoryPath(): string {
        return this.filesDirectoryPath;
    }

    // TODO: [offline] Implement
    writeText(fileName: string, text: string, path?: string) {
        throw new Error('Not implemented');
    }

    // TODO: [offline] Implement
    createDirectory() {
        throw new Error('Not implemented');
    }

    // TODO: [offline] Implement
    getFileSize(file: string, getFileSize: string) {
        throw new Error('Not implemented');
    }

    // TODO: [offline] Implement
    getFileByAbsolutePath(path: string) {
        throw new Error('Not implemented');
    }

    readFileAsBase64(file) {
        throw new Error('Not implemented');
    }

    renameFile() {
        throw new Error('Not implemented');
    }
}