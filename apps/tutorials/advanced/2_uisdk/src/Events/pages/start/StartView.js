// View should be as dumb as possible, only holds DOM
define([
    'Titan',
    'template!./start.html',
    'styles!./start.less'
], function (Titan, template, style) {

    return Titan.View.extend({

        template: template,
        styles: style,

        init:function(){}
    });
});