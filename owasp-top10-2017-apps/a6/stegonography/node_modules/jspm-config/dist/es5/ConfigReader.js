"use strict";
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var Promise = require("any-promise");
/**
 * Read jspm config in separate process.
 * Should call `close()` when you are done.
 */
var ConfigReader = (function () {
    function ConfigReader() {
        this.child = child_process_1.fork(__dirname + "/readJspmConfig");
        this.startTimeBomb();
    }
    ConfigReader.prototype.read = function (filePath) {
        var _this = this;
        this.restartTimeBomb();
        if (!fs_1.existsSync(filePath)) {
            return Promise.resolve();
        }
        else {
            return new Promise(function (resolve, _reject) {
                _this.child.on('message', function (config) {
                    resolve(config);
                });
                _this.child.send(filePath);
            });
        }
    };
    ConfigReader.prototype.close = function () {
        this.stopTimeBomb();
        this.child.kill();
    };
    ConfigReader.prototype.startTimeBomb = function () {
        var _this = this;
        this.timer = setTimeout(function () {
            _this.child.kill();
        }, 10000);
    };
    ConfigReader.prototype.stopTimeBomb = function () {
        clearTimeout(this.timer);
    };
    ConfigReader.prototype.restartTimeBomb = function () {
        this.stopTimeBomb();
        this.startTimeBomb();
    };
    return ConfigReader;
}());
exports.ConfigReader = ConfigReader;
//# sourceMappingURL=ConfigReader.js.map