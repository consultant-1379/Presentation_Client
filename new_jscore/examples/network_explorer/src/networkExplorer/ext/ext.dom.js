define([
    'jquery-2.0.2',
    'jscore/ext/dom'
], function($, dom) {

    dom.findAll = function (selector, element) {
        var $el;
        if (element) {
            $el = $($.find(selector, element._getHTMLElement()));
        }
        var results = [];
        $el.each(function () {
            var $value = $(this);
            var result = $value.data('element');

            if (!result) {
                results.push(dom.Element.wrap(this));
                $value.data('element', result);
            } else {
                results.push(result);
            }
        });
        return results;
    };

    dom.animate = function (element, options) {
        $(element._getHTMLElement()).animate(options);
    };

    dom.slideDown = function (element, duration, complete) {
        $(element._getHTMLElement()).slideDown(duration, complete);
    };

    dom.slideUp = function (element, duration, complete) {
        $(element._getHTMLElement()).slideUp(duration, complete);
    };

    dom.getProperty = function (element, property) {
        return $(element._getHTMLElement()).prop(property);
    };

    dom.setProperty = function (element, property, value) {
        $(element._getHTMLElement()).prop(property, value);
    };

    dom.addClass = function (element, className) {
        $(element._getHTMLElement()).addClass(className);
    };

    dom.removeClass = function (element, className) {
        $(element._getHTMLElement()).removeClass(className);
    };

    return dom;

});