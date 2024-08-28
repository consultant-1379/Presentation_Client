/**
 * Contains methods to allow functions to emulate classes
 *
 * @module ext
 * @class klass
 *
 */
 
	var klass = (function () {
	
		/**
		 * Extends a function prototype with the properties passed in.
		 *
		 * @method extend
		 * @param obj {Function}
		 * @param extObj {Object}
		 */
		var extend = function(obj, extObj) {
			var JSCoreObject = function(){
				this.init.apply(this, arguments);
			};
			JSCoreObject.prototype = new obj();
			for (var prop in extObj) {
				JSCoreObject.prototype[prop] = extObj[prop];
			}
			JSCoreObject.extend = function(extObj) {
				return extend(JSCoreObject, extObj);
			}
			JSCoreObject.prototype._super = _super;
			JSCoreObject.prototype.__super__ = obj.prototype;
			return JSCoreObject;
		};
	
		/**
		 * Used by function objects to simulate the super() command as in other languages.
		 * Allows a function to call its parent prototype functions/properties.
		 *
		 * @method _super
		 * @param methodName {String}
		 */
		var _super = function(methodName) {
			this._superCallObjects || (this._superCallObjects = {});
			var currentObject = this._superCallObjects[methodName] || this,
				parentObject  = findSuper(methodName, currentObject);
			this._superCallObjects[methodName] = parentObject;
		 
			var args = Array.prototype.slice.call(arguments).splice(1);
			var result = parentObject[methodName].apply(this, args);
			delete this._superCallObjects[methodName];
			return result;
		}
 
		/**
		 * Iterates through the prototype chain to find the super method.
		 *
		 * @method findSuper
		 * @param methodName {String}
		 * @param childObject {Function/Object}
		 */
		var findSuper = function(methodName, childObject) {
			var object = childObject;
			while (object[methodName] === childObject[methodName]) {
				object = object.__super__;
			}
			return object;
		}
		
		return {
			extend: extend,
			_super: _super,
			findSuper: findSuper
		}
	
	})();
	
	JSCore.ext.klass = klass;