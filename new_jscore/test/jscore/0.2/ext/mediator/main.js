define(['./base/mediator'], function (Mediator) {

	/**
	* The EventBus allows objects to subscribe and publish events that other components may react to.
	*	
	* @class ext.mediator.EventBus
	*/
    function EventBus() {
        this._mediator = Mediator.apply(this, arguments);

    }

    EventBus.prototype = {
	
		/**
         * Subscribe to events on a channel. Provide a callback function to handle the event. Returns a Subscription handle that can be used to cancel the Subscription. 
         *
         * @method subscribe
         * @param channel {String}
		 * @param callback {Function}
		 * @param options {Object}
		 * @param context {Object}
		 * @return subscription {Object}
         */
        subscribe: function (channel, callback, options, context) {
            var response = this._mediator.subscribe.apply(this._mediator, arguments);
            return {
                id: response.id,
                fn: response.fn
            }

        },
   /*     once: function (channel, callback, options, context) {
            this._mediator.once.apply(this._mediator, arguments);

        },*/
		/**
         * Publish data on a channel on the EventBus. If the channel does not exist it is created.
         *
         * @method publish
         * @param channel {String}
		 * @param data {*}
         */
        publish: function (channel, data) {
            this._mediator.publish.apply(this._mediator, arguments);

        },
		
		/**
         * Removes a subscription from the EventBus so that subscription will no longer receive any events.
         *
         * @method remove
         * @param channel {String}
		 * @param identifier {Object}
         */
        remove: function (channel, identifier) {
            this._mediator.remove.apply(this._mediator, arguments);

        }

    }

    return {
        EventBus: EventBus
    };
});