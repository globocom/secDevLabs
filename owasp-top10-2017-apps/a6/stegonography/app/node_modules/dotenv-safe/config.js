(function () {
    var options = {};
    process.argv.forEach(function (val) {
        var matches = val.match(/^dotenv_config_(.+)=(.+)/);
        if (matches) {
            options[matches[1]] = matches[2];
        }
    });
    require('.').config(options);
})();
