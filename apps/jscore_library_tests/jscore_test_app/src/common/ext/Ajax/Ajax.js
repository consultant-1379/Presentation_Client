define([
	"jquery-1.8.0"
], function(jquery) {
	
	var Ajax = function(url, type, dataType, success, error) {
        jquery.ajax({
            url: url,
            type: type,
            dataType: dataType,
            success: success,
            error: error
        });
    }
	
	return Ajax;

});