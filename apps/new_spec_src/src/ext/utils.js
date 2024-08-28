/**
 * Misc. utility functions that don't fall under any other categories.
 *
 * @module ext
 * @class utils
 *
 */
 
	var utils = (function () {
		
		var isFilePath = function(text) {
			if (text.match(/^(?:(?:\.)?(?:\.)?(?:\/)?)*[a-zA-Z0-9\/]*(?:\.)?(?:[a-zA-Z0.9]*)?$/))
				return true;
			else
				return false;
		};
		
		var ajax = function(url, callback, async) {
			$.ajax({
				 url: url,
				 success: callback,
				 async: async
			});  
		};

		return {
			isFilePath: isFilePath,
			ajax: ajax
		};
	})();
	
	JSCore.ext.utils = utils;