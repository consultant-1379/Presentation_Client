define([
    'Titan',
    'template!./LogViewer.html',
    'styles!./LogViewer.less'
], function (Titan, template, styles) {

    var Launcher = Titan.View.extend({

        template: template,

        styles: styles,

        getRoot: function () {
            return this.root;
        },

        getSidebarHolder: function () {
            return this[Launcher.EL_SIDEBAR_HOLDER];
        },

        getTableHolder: function () {
            return this[Launcher.EL_TABLE_HOLDER];
        },

        getSearchHolder: function () {
            return this[Launcher.EL_SEARCH_HOLDER];
        }

    }, {
        'EL_SEARCH_HOLDER': 'searchHolder',
        'EL_SIDEBAR_HOLDER': 'sidebarHolder',
        'EL_TABLE_HOLDER': 'tableHolder'
    });

    return Launcher;

});