// View should be as dumb as possible, only holds DOM
define([
    'Titan',
    'template!./nameWidget.html',
    'styles!./nameWidget.less'
], function (Titan, template, style) {

    return Titan.View.extend({

        template: template,
        styles: style,

        init:function(app){
        }
    });
});