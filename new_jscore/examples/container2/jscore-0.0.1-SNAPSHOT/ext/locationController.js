
/*global define*/
define('jscore/ext/locationController',[
], function () {
    /**
     * LocationController is a utility object that manages events based on the hash value of the URL
     *
     * @class ext.LocationController
     */
    
    function LocationController() {
        this.handlers = [];
    }
    
    LocationController.prototype = {

        /**
         * Gets the string after the hash value in the URL
         *
         * @method getLocation
         * @return {String} location 
		 *
		 * @example
		 *	lc.getLocation();
         */
        getLocation: function () {
            return window.location.hash.split('#')[1];
        },

        /**
         * Sets the string after the hash value in the URL
         *
         * @method setLocation
         * @param {String} location 
		 * @example
		 *	lc.setLocation("some/location");
         */
        setLocation: function (location) {
            window.location.hash = location;
        },

        /**
         * Adds an event handler that execute when the URL hash value changes
         *
         * @method addLocationListener
         * @param {Function} fn 
         * @param {Object} [context] 
		 * @example
		 *	lc.addLocationListener(function(hash) {
		 *		if (hash == "some/location") {
		 *			console.log("url is set to some/location");
		 *		}
		 *	});
         */
        addLocationListener: function (fn, context) {
            var handler = {
                fn: fn,
                context: context || this
            };
            this.handlers.push(handler);

        },

        /**
         * Starts listening for changes to the hash value in the URL. It will also check the hash immediately and execute existing handlers.
         *
         * @method start
		 * @example
		 *	lc.start();
         */
        start: function () {
            this._execHandlers();
            this._routeChange();
        },
        _execHandlers: function () {
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
                console.log("hashchanging not supported!");
            }
        }
    };

    return LocationController;
});