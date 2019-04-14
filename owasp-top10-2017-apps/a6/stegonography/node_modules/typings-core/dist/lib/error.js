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
var make_error_cause_1 = require("make-error-cause");
var TypingsError = (function (_super) {
    __extends(TypingsError, _super);
    function TypingsError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'TypingsError';
        return _this;
    }
    return TypingsError;
}(make_error_cause_1.BaseError));
exports.default = TypingsError;
//# sourceMappingURL=error.js.map