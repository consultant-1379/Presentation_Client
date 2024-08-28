define(function () {

    var LocationController = {
        handlers:[],
        getLocation: function () {
          return window.location.hash.split('#')[1];
        },
        setLocation: function (location) {
            window.location.hash=location;
        },
        addLocationListener: function (fn, context) {
            var handler = {
                fn: fn,
                context: context || this
            }
            this.handlers.push(handler);

        },
        start: function () {
            this._execHandlers();
           this._routeChange();
        },
        _execHandlers:function(){
            var hash = this.getLocation();
            if (this.handlers.length > 0) {
                this.handlers.forEach(function (handler) {
                    handler.fn.call(handler.context, hash);
                });
            }
        },
        _routeChange: function () {
            if ("onhashchange" in window) {
                window.onhashchange = function () {
                      this._execHandlers();

                }.bind(this);
            }
            else {
                console.log("hashchanging not supported!")
            }
        }
    }

    return LocationController;
});