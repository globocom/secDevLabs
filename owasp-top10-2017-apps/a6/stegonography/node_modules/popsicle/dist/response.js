"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var Response = (function (_super) {
    __extends(Response, _super);
    function Response(options) {
        var _this = _super.call(this, options) || this;
        _this.body = options.body;
        _this.status = options.status;
        _this.statusText = options.statusText;
        return _this;
    }
    Response.prototype.statusType = function () {
        return ~~(this.status / 100);
    };
    Response.prototype.toJSON = function () {
        return {
            url: this.url,
            headers: this.headers,
            body: this.body,
            status: this.status,
            statusText: this.statusText
        };
    };
    return Response;
}(base_1.Base));
exports.Response = Response;
//# sourceMappingURL=response.js.map