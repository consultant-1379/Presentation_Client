define([
    'Titan',
    'template!./LogDetails.html',
    'styles!./LogDetails.less'
], function (Titan, template, styles) {

    var LogDetails = Titan.View.extend({

        template:template,

        styles: styles,

        getRoot: function () {
            return this.root;
        },

        getLogEntryDetailsHeader: function() {
            return this[LogDetails.EL_LOG_ENTRY_DETAILS_HEADER];
        },

        getLogEntryDetailsEntry: function () {
            return this[LogDetails.EL_LOG_ENTRY_DETAILS_ENTRY];
        }

    }, {
        EL_LOG_ENTRY_DETAILS_HEADER: 'logEntryDetailsHeader',
        EL_LOG_ENTRY_DETAILS_ENTRY: 'logEntryDetailsEntry'
    });

    return LogDetails;

});