define([
    'Titan',
    'template!./user.html',
    'styles!./user.less'
], function (Titan, template, style) {

    return Titan.View.extend({

        template: template,
        styles: style,
        init:function(){}
    });
});