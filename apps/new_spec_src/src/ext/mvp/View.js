/**
 * The View (part of the MVP pattern) represents the DOM elements. The View should be very minimal, and should ideally only refer to a HTML template
 * and CSS stylesheets.
 *
 * @module ext.mvp
 * @class View
 * @constructor
 *
 */
var View = Backbone.View;

/**
* If not null, template DOM is initialised and loaded into the DOM that's holding the View.
* 
* @property template
* @type {String}
* @default null
*/

/**
* If not null, style is initialised and loaded.
* 
* @property style
* @type {String}
* @default null
*/

/**
 * Automatically called when the "new" operator is used.
 *
 * @method init
 */
View.prototype.initialize = function() {
	this.init();
}

/**
 * Returns the element that's holding the DOM for the View. 
 *
 * @method getElement
 */
View.prototype.getElement = function() {
	return this.el;
}

View.prototype.start = function(element) {
	Facade.startObject(this, element);
}

View.prototype.init = function() {
}

View.extend = function(object) {
	return Facade.extend(this, object);
}

/**
 * Overwritten by the developer. Whenever the model changes, this method should be called. Any DOM manipulation should be done here only, using
 * the model as a basis for rendering.
 *
 * @method render
 * @param model {Model}
 */
 
 /**
 * Set reference to the element that's holding the DOM for the View. 
 *
 * @method setElement
 * @param element {HTMLElement}
 */

/**
	 * Allows the class to be extend for more complex functionality
	 *
	 * @method extend
	 * @param object {Object} Class definition
	 */


JSCore.ext.mvp.View = View;