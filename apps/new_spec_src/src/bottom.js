	
	define("core", function() {
		return JSCore;
	});
	
	define("facade", function(){
		return Facade;
	});
	
	JSCore.DefineWithTemplatesStyles = function() {
		var template = "text!./template.html";
		var style = "text!./style.css";
	
		for (var i = 0; i < arguments.length; i++) {
			if (arguments[i] instanceof Array) {
				arguments[i].push(template);
				arguments[i].push(style);
			} else if (typeof arguments[i] != "string" && typeof arguments[i] == "function") {
				var callback = arguments[i];
				
				var wrappedCallback = (function() {
					return function() {
						var result = callback.apply(this, arguments);
						result.prototype.template = arguments[arguments.length - 2];
						result.prototype.style = arguments[arguments.length - 1];
						return result;
					}
				})();
				
				arguments[i] = wrappedCallback;
			}
		}
		
		define.apply(this, arguments);
	}
	
	JSCore.DefineWithRequire = function() {
	
		for (var i = 0; i < arguments.length; i++) {
			if (arguments[i] instanceof Array) {
				arguments[i].push("require");
			} else if (typeof arguments[i] != "string" && typeof arguments[i] == "function") {
				var callback = arguments[i];
				
				var wrappedCallback = (function() {
					return function() {
						var result = callback.apply(this, arguments);
						var localRequire = arguments[arguments.length - 1];
						if (result.prototype.template && JSCore.ext.utils.isFilePath(result.prototype.template)) {
							result.prototype.template = localRequire.toUrl(result.prototype.template);
						}
						if (result.prototype.style && JSCore.ext.utils.isFilePath(result.prototype.style)) {
							result.prototype.style = localRequire.toUrl(result.prototype.style);
						}
						return result;
					}
				})();
				
				arguments[i] = wrappedCallback;
			}
		}
		
		define.apply(this, arguments);
	}
	
	window.require = require;
	window.define = JSCore.DefineWithRequire;
	
	
	
	return JSCore;
})();