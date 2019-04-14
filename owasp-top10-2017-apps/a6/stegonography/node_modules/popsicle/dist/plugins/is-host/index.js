"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isHostObject(object) {
    return typeof object.pipe === 'function' || Buffer.isBuffer(object);
}
exports.default = isHostObject;
//# sourceMappingURL=index.js.map