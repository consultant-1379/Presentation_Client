define([
    '../../base/jquery'
], function ($) {

    return {
        extend: $.extend,
        getEventBus: function () {
            return $({});
        }
    }

});