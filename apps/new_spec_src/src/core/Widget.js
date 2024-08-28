/**
 * Widgets are highly reusable components that only contain presentation logic. Widgets should expose action callbacks
 * so that regions and application classes may interact with them. Examples of widgets include buttons, tables, maps etc.
 *
 * @module core
 * @class Widget
 * @constructor
 *
 */

	var Widget = function () {
	};

	/**
	 * Allows the class to be extend for more complex functionality
	 *
	 * @method extend
	 */
	Widget.extend = function(object) {
		return Facade.extend(this, object);
	}

	Widget.prototype = {
		/**
		* If not null, template DOM is initialised and loaded into the DOM that's holding the Widget.
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
		 * Removes the widget from the component that added it
		 *
		 * @method remove
		 */
		remove: function() {
			Facade.dom.empty(this.el);
		},
		
		/**
		 * Returns the element that's holding the DOM for the Widget. 
		 *
		 * @method getElement
		 */
		getElement: function() {
			return this.el;
		},
		
		 /**
		 * Set reference to the element that's holding the DOM for the Widget. 
		 *
		 * @method setElement
		 * @param element {HTMLElement}
		 */
		setElement: function(element) {
			this.el = element;
		}
	};
	
	JSCore.Widget = Widget;