define([
    'Titan',
    'template!./TableHeader.html',
    'styles!./TableHeader.less'
], function (Titan, template, styles) {

    return Titan.View.extend({

        template:template,

        styles: styles,

        getRoot: function () {
            return this.root;
        }

    });

});