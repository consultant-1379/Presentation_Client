define([
    'Titan',
    './LogViewerPresenter'
], function (Titan, LogViewerPresenter) {

    return Titan.Place.extend({
        name: 'Log Viewer',
        pattern: 'tor-logviewer/:columns',
        Presenter: LogViewerPresenter,
        fn: 'setColumns',
        init: function (columns) {
            this.columns = (columns.length > 0) ? columns[0] : 'timestamp,message';
        }
    });

});