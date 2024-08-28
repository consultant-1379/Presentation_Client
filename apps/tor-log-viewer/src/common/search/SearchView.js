define([
    'Titan',
    'template!./Search.html',
    'styles!./Search.less'
], function (Titan, template, styles) {

    var Content = Titan.View.extend({

        template: template,

        styles: styles,

        getRoot: function () {
            return this.root;
        },

        getSearchBox: function () {
            return this[Content.EL_SEARCH_BOX];
        }

    }, {
        EL_SEARCH_BOX: 'searchBox'
    });

    return Content;

});