define([
    'Titan',
    './LogViewerPresenter'
], function (Titan, LogViewerPresenter) {

    return Titan.Place.extend({
        name: 'Log Viewer',
        pattern: 'tor-logviewer',
        Presenter: LogViewerPresenter,
        fn: 'launch',
        defaultPlace: true
    });

});