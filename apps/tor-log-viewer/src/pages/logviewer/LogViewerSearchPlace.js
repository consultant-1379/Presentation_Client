define([
    'Titan',
    './LogViewerPresenter'
], function (Titan, LogViewerPresenter) {

    return Titan.Place.extend({
        name: 'Log Viewer',
        pattern: 'tor-logviewer/:searchTerm',
        Presenter: LogViewerPresenter,
        fn: 'search',
        init: function (searchTerm) {
            this.searchTerm = (searchTerm.length > 0) ? searchTerm[0] : '';
        }
    });

});