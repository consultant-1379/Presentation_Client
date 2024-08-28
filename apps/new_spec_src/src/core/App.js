/**
 * Encapsulates the entire application. Apps are ran inside a container DOM element, and inside that container
 * element, they can load different regions and widgets, and use some logic on handling those.
 *
 * @module core
 * @class App
 *
 */
 
	var App = function() {
	};

	/**
	 * Allows the class to be extend for more complex functionality
	 *
	 * @method extend
	 * @param object {Object} Class definition
	 */
	App.extend = function(object) {
		return Facade.extend(this, object);
	}

	App.prototype = {

		/**
		* If not null, template DOM is initialised and loaded into the DOM that's holding the App.
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
		 * The init method should be overridden by the app developer. It's always called on the creation of the
		 * App class. Useful for loading different regions and setting them up.
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
		 * Stops the apps and the services it uses
		 *
		 * @method stop
		 */
		stop: function () {
		},
		
		/**
		 * Returns the element that's holding the DOM for the App. 
		 *
		 * @method getElement
		 */
		getElement: function() {
			return this.el;
		},
		
		 /**
		 * Set reference to the element that's holding the DOM for the App. 
		 *
		 * @method setElement
		 * @param element {HTMLElement}
		 */
		setElement: function(element) {
			this.el = element;
		}

	};

	JSCore.App = App;