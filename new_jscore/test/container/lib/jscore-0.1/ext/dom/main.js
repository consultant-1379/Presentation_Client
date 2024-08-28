define([
    '../../base/jquery'
], function ($) {

    return {
        parse: function () {
            var el = $.parseHTML.apply(this, arguments);
            $(el).css('border', '2px solid #d00');
            return el[0];
        },
        find: function () {
            return $.find.apply(this, arguments)[0];
        },
        append: function (target, element) {
            $(target).append(element);
        },
        remove: function (element) {
            $(element).remove();
        },
        text: function (element, text) {
            $(element).text(text);
        },
        on: function (event, element, fn) {
            $(element).on(event, fn);
        }
    }

});