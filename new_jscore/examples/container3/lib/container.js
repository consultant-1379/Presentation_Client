(function () {
    var root;

    root = typeof exports !== "undefined" && exports !== null ? exports : this;

    root.container = {
        load: function (appId) {
            var _this = this;

            return require({
            }, [appId + '/app.nocache'], (function (config) {
                for (key in config.paths) {
                    if (key !== "app") {
                        config.paths[key] = config.paths.app + "/" + config.paths[key];
                    }
                }
                return require({
                    context: appId,
                    baseUrl: '',
                    resources: config.paths.app + 'resources',
                    paths: config.paths
                }, [config.entryPoint], _this.callback);
            }), this.error);
        },
        callback: function (App) {
            return console.log(App);
        },
        error: function () {
            throw "Can't load application";
        }
    };

}).call(this);
