/**
 * Contains methods for helping with CSS manipulations
 *
 * @module ext
 * @class css
 * @constructor
 *
 */
 
	var css = (function () {
	
		/**
		 * Creates a style attribute and appends it to the head, using the text that's passed into the function.
		 *
		 * @method load
		 * @param cssText {String}
		 */
		var load = function(cssText) {

				var head = document.getElementsByTagName("head")[0];
				var style = document.createElement("style");
				style.type = "text/css";
				if (style.styleSheet){
					style.styleSheet.cssText = cssText;
				} else {
					style.appendChild(document.createTextNode(cssText));
				}
				head.appendChild(style);
		}
		
		return {
			load: load
		}
	
	})();
	
	JSCore.ext.css = css;