define([
    'Titan',
    './LogViewerPresenter'
], function (Titan, LogViewerPresenter) {

    return Titan.Place.extend({
        name: 'Log Viewer',
        pattern: 'tor-logviewer/:params',
        Presenter: LogViewerPresenter,
        fn: 'params',
        init: function (params) {
            this.paramString = (params.length > 0) ? params[0].substring(1) : '';
            var params = this.paramString.split('&');
            this.params = {};
            for (var i = 0; i < params.length; i++) {
                var paramKeyVal = params[i].split('=');
                if (paramKeyVal[1] != undefined) {
                    var paramKeyValArray = paramKeyVal[1].split(',');
                    this.params[paramKeyVal[0]] = paramKeyValArray.length <= 1 ? paramKeyVal[1] : paramKeyValArray;
                }
            }
            if (this.params.from == undefined || this.params.from == '') {
                this.params.from = 0;
            }
            if (this.params.size == undefined || this.params.size == '') {
                this.params.size = 50;
            }
        }
    });

});