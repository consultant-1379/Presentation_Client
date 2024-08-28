define([
    '../../base/jquery',
], function ($) {
    return{
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