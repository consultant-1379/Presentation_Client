/**
 * The EventBus allows objects to subscribe and publish events that other components may react to.
 *
 * @module ext
 * @class EventBus
 * @constructor
 *
 */
 
	var EventBus = (function () {
		
		var topics = {};
		
		/**
		 * Allows a component to subscribe to a particular topic on the EventBus, passing a function to be executed when
		 * that topic occurs on the EventBus
		 *
		 * @method subscribe
		 * @param topic {String} The topic to subscribe to
		 * @param fn {Function} Callback
		 */
		var subscribe = function( topic, fn ){

			if ( !topics[topic] ){ 
			  topics[topic] = [];
			}

			topics[topic].push( { context: this, callback: fn } );

			return this;
		};

		/**
		 * Sends an event with a message to the EventBus which will subsequently send that message to subscribers.
		 *
		 * @method publish
		 * @param topic {String} The topic to send on the bus
		 * @param optionalArguments {*} Additional arguments can be sent which will be passed into the callback
		 */
		var publish = function( topic ){

			var args;

			if ( !topics[topic] ){
			  return false;
			} 

			args = Array.prototype.slice.call( arguments[1], 1 );
			for ( var i = 0, l = topics[topic].length; i < l; i++ ) {
				var subscription = topics[topic][i];
				subscription.callback.apply( subscription.context, args );
			}
			return this;
		};

		return {
			publish: publish,
			subscribe: subscribe,
		};
	})();
	
	JSCore.ext.EventBus = EventBus;