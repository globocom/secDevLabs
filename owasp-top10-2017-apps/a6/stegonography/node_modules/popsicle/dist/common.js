"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var FormData = require("form-data");
exports.FormData = FormData;
var request_1 = require("./request");
var plugins = require("./plugins/index");
exports.plugins = plugins;
var form_1 = require("./form");
exports.form = form_1.default;
var jar_1 = require("./jar");
exports.jar = jar_1.default;
var error_1 = require("./error");
exports.PopsicleError = error_1.default;
var index_1 = require("./index");
exports.createTransport = index_1.createTransport;
function defaults(defaultsOptions) {
    var transport = index_1.createTransport({ type: 'text' });
    var defaults = Object.assign({}, { transport: transport }, defaultsOptions);
    return function popsicle(options) {
        var opts = Object.assign({}, defaults, typeof options === 'string' ? { url: options } : options);
        if (typeof opts.url !== 'string') {
            throw new TypeError('The URL must be a string');
        }
        return new request_1.Request(opts);
    };
}
exports.defaults = defaults;
exports.request = defaults({});
exports.get = defaults({ method: 'get' });
exports.post = defaults({ method: 'post' });
exports.put = defaults({ method: 'put' });
exports.patch = defaults({ method: 'patch' });
exports.del = defaults({ method: 'delete' });
exports.head = defaults({ method: 'head' });
__export(require("./base"));
__export(require("./request"));
__export(require("./response"));
exports.default = exports.request;
//# sourceMappingURL=common.js.map