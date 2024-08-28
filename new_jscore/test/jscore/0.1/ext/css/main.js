define([
    '../../base/jquery'
], function ($) {
	/**
	* The css class is a utility for style manipulation.
	* 
	* @class ext.css
	*/
    return{
		/**
		* Sets style specified in CSS as a string on an Element.
		*
		* @method addStyle
		* @param styles {String}
		* @param Object {Object}
		*/
        addStyle: function (styles, Object) {
            if (Object && Object.__proto__.styles === undefined) {
                var style = $($.parseHTML('<style/>'));
                style.html(styles)
                $('head').append(style);

                Object.__proto__.styles = true;
            }
        }
    }
});