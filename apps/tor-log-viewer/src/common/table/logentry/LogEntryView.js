define([
    'Titan',
    'template!./LogEntry.html',
    'styles!./LogEntry.less'
], function (Titan, template, styles) {

    var LogEntry = Titan.View.extend({

        template:template,

        styles: styles,

        getRoot: function () {
            return this.root;
        },

        getLogEntryRow: function() {
            return this[LogEntry.EL_LOG_ENTRY_ROW];
        },

        getLogEntryDetailsRow: function () {
            return this[LogEntry.EL_LOG_ENTRY_DETAILS_ROW];
        },

        getLogEntryDetailsPanel: function () {
            return this[LogEntry.EL_LOG_ENTRY_DETAILS_PANEL];
        }

    }, {
        EL_LOG_ENTRY_ROW: 'logEntryRow',
        EL_LOG_ENTRY_DETAILS_ROW: 'logEntryDetailsRow',
        EL_LOG_ENTRY_DETAILS_PANEL: 'logEntryDetailsPanel'
    });

    return LogEntry;

});