define([
    'jscore/0.1/ext/mvp/main',
    'text!./pie.html',
    'text!./pie.css'
], function (mvp, template, css) {
    return mvp.View.extend({
        init: function () {
        },
        getTemplate: function () {
            return template;
        },
        getStyle: function () {
            return css;
        },
        events: {
            'click .pieCharta': 'pieClicked',
            'mouseenter .pieChartb': 'pieClicked',
            'mouseleave .pieChartb': 'pieLived'
        },
        setText:function(text){
            this.element.find('.text').text(text);

        }


    });
});