(function () {
    var root;

    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    var styles = {};


    function replaceStyles(prevConfig, config) {

        if (prevConfig !== undefined) {
            var styleTags = document.getElementsByTagName('style');

            if (styleTags.length > 0) {
                if (!styles[prevConfig.entryPoint]) {
                    styles[prevConfig.entryPoint] = {};
                }

                for (var i = 0; i < styleTags.length; i++) {
                    var style = styleTags[i];
                    var attribute = style.getAttribute('id');

                    if (!styles[prevConfig.entryPoint][attribute]) {
                        styles[prevConfig.entryPoint][attribute] = style;
                    }
                    if (attribute) {
                        style.parentNode.removeChild(style);
                    }
                }

            }

            var currentStyles = styles[config.entryPoint];

            if (currentStyles != undefined && Object.keys(currentStyles).length) {
                for (key in currentStyles) {
                    document.getElementsByTagName("head")[0].appendChild(currentStyles[key]);
                }
            }
        }
    }

    var assets = {};
    var activeStyle = '';

    function addAssets(config) {
        if (config.assets !== undefined) {
            var head = document.getElementsByTagName("head")[0];
            if (assets[config.assets] === undefined) {
                var url = config.assets + "/style.css",
                    link = document.createElement('link');
                link.setAttribute("rel", "stylesheet");
                link.setAttribute("href", url);
                assets[config.assets] = link;
            }

            for (key in assets) {
                var style = assets[key];
                if (key !== config.assets) {
                    if (style.parentNode === head) {
                        style.parentNode.removeChild(style);
                    }
                }
            }
            if (activeStyle !== config.assets) {
                head.appendChild(assets[config.assets]);
                activeStyle = config.assets
            }
        }

    }

    var prevConfig;
    root.container = {
        load: function (appId) {
            if (this.appId !== appId) {
                this.appId = appId;
                var _this = this;
                return require({
                }, [appId + '/app.nocache'], (function (config) {
                    replaceStyles(prevConfig, config);
                    addAssets(config);

                    prevConfig = config;

                    return require({
                        context: appId,
                        baseUrl: '',
                        resources: config.paths.app + 'resources',
                        paths: config.paths
                    }, [config.entryPoint], _this.callback.bind(_this));

                }), this.error);
            }
        },
        callback: function (App) {
            return console.log(App);
        },
        error: function () {
            throw "Can't load application";
        }
    };

}).call(this);