/**
 * The Model (part of the MVP pattern) represents the data. The model should contain a definition of the data, and should contain helper functions
 * for when a user wants to work with that data.
 *
 * @module ext.mvp
 * @class Model
 * @constructor
 *
 */
	var Model = function() {
	}
	Model = Backbone.Model;	
 
	/**
	 * Automatically called when the "new" operator is used. Model should initialise arrays and other default data properties here.
	 *
	 * @method init
	 */
	 Model.prototype.initialize = function() {
		this.init();
	}
	
	Model.prototype.init = function() {
	}
	
	Model.extend = function(object) {
		return Facade.extend(this, object);
	}
	
	/**
	 * Allows the class to be extend for more complex functionality
	 *
	 * @method extend
	 * @param object {Object} Class definition
	 */

	JSCore.ext.mvp.Model = Model;