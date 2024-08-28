/**
 * Regions encapsulate some business logic, and may use widgets to provide functionality. While widgets inside a region
 * can communicate with each other directly through action callbacks, regions can only communicate with each other by
 * using subscribing to particular events and publishing events for other regions to react to.
 *
 * @module core
 * @class Region
 * @constructor
 *
 */
	var Region = function () {
	};

	/**
	 * Allows the class to be extend for more complex functionality
	 *
	 * @method extend
	 */
	Region.extend = function(object) {
		return Facade.extend(this, object);
	}

	Region.prototype = {

		/**
		* If not null, template DOM is initialised and loaded into the DOM that's holding the Region.
		* 
		* @property template
		* @type {String}
		* @default null
		*/
		template: null,
		/**
		* If not null, style is initialised and loaded.
		* 
		* @property style
		* @type {String}
		* @default null
		*/
		style:null,
		/**
		 * The init method should be overridden by the developer. It's always called on the creation of the class.
		 *
		 * @method init
		 * */
		init: function () {
			
		},

		/**
		 * Starts all of the internal functionality of the App class.
		 *
		 * @method start
		 * @param element {HTMLElement} Reference to element in which to run the application
		 */
		start: function (element) {
			Facade.startObject(this, element);
		},

		/**
		 * Stops the class and any internal functionality it uses
		 *
		 * @method stop
		 */
		stop: function () {
		},

		/**
		 * Removes the specified widget from the region
		 *
		 * @method remove
		 * @param widget {Widget} The widget to be removed
		 */
		remove: function (widget) {
			Facade.dom.empty(widget.el);
		},
		
		/**
		 * Returns the element that's holding the DOM for the Region. 
		 *
		 * @method getElement
		 */
		getElement: function() {
			return this.el;
		},
		
		 /**
		 * Set reference to the element that's holding the DOM for the Region. 
		 *
		 * @method setElement
		 * @param element {HTMLElement}
		 */
		setElement: function(element) {
			this.el = element;
		}
	};
	
	JSCore.Region = Region;