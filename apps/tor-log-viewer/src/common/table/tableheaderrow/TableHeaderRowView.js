define([
    'Titan',
    'template!./TableHeaderRow.html',
    'styles!./TableHeaderRow.less'
], function (Titan, template, styles) {

    var TableHeaderRow = Titan.View.extend({

        template:template,

        styles: styles,

        getRoot: function () {
            return this.root;
        },

        getLogEntryHeaderRow: function () {
            return this[TableHeaderRow.EL_LOG_ENTRY_HEADER_ROW];
        }

    }, {
        EL_LOG_ENTRY_HEADER_ROW: 'logEntryHeaderRow'
    });

    return TableHeaderRow;

});