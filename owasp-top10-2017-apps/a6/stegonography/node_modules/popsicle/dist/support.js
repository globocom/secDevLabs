"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function splice(arr, start, count) {
    if (count === void 0) { count = 1; }
    for (var i = start; i < arr.length - count; i++) {
        arr[i] = arr[i + count];
    }
    arr.length -= count;
}
exports.splice = splice;
//# sourceMappingURL=support.js.map