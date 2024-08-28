/**
 * URLController allows manipulation of the browser URL without changing the page. This can be useful for allowing
 * the use of the browser's back/forward functionality, even though you don't want to change the page, and allows you
 * to have single-page applications.
 *
 * @module ext
 * @class URLController
 * @constructor
 *
 */
	var URLController = function () {
	};

    /**
     * Gets the current URL for the browser window.
     *
     * @method getUrl
     */
    URLController.getUrl = function () {
		return window.location.hash.substring(1, window.location.hash.length);
    };

    /**
     * Changes the URL of the browser window without changing the page. onURLChanged event is emitted after this method
     * is called, which components of the application may react to/
     *
     * @method setUrl
     * @param url {String} The url to change to
     */
    URLController.setUrl = function(url) {
		window.location.hash = url;
    };
	
	JSCore.ext.URLController = URLController;