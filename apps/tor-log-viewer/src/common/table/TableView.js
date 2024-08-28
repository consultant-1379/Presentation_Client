define([
    'Titan',
    'template!./Table.html',
    'styles!./Table.less'
], function (Titan, template, styles) {

    var Content = Titan.View.extend({

        template: template,

        styles: styles,

        getRoot: function () {
            return this.root;
        },

        getResultsStats: function () {
            return this[Content.EL_RESULTS_STATS];
        },

        getLogTable: function () {
            return this[Content.EL_LOG_TABLE];
        },

        getResultDetails: function () {
            return this[Content.EL_RESULT_DETAILS];
        },

        getOlderResultsLink: function () {
            return this[Content.EL_OLDER_RESULTS_LINK];
        },

        getNewerResultsLink: function () {
            return this[Content.EL_NEWER_RESULTS_LINK];
        },

        addElement: function (element) {
            this.getRoot().addWidget(element);
        }

    }, {
        EL_RESULTS_STATS: 'resultsStats',
        EL_LOG_TABLE: 'logTable',
        EL_RESULT_DETAILS: 'resultDetails',
        EL_OLDER_RESULTS_LINK: 'olderResultsLink',
        EL_NEWER_RESULTS_LINK: 'newerResultsLink'
    });

    return Content;

});