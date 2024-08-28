define([
    'Titan',
    './UserPresenter'
], function (Titan, UserPresenter) {

    return Titan.Place.extend({
        name: 'Second Place',
        pattern: 'user(/)(:name)(/)(:def)',
        Presenter: UserPresenter,
        fn: 'updateWorkspace'  // also associates this with executing function in Presenter
    });
});