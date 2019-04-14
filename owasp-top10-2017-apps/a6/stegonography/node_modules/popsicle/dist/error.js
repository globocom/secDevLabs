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
var makeErrorCause = require("make-error-cause");
var PopsicleError = (function (_super) {
    __extends(PopsicleError, _super);
    function PopsicleError(message, code, original, popsicle) {
        var _this = _super.call(this, message, original) || this;
        _this.name = 'PopsicleError';
        _this.code = code;
        _this.popsicle = popsicle;
        return _this;
    }
    return PopsicleError;
}(makeErrorCause.BaseError));
exports.default = PopsicleError;
//# sourceMappingURL=error.js.map