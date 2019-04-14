'use strict';
var extend = require("xtend");
process.on('message', function (filePath) {
    var g = global;
    var config;
    g.System = {
        config: function (conf) {
            config = extend(config, conf);
        }
    };
    g.SystemJS = g.System;
    require(filePath);
    process.send(config);
});
//# sourceMappingURL=readJspmConfig.js.map