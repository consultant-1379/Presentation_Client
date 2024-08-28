define([
    'Titan',
    'pages/start/StartPresenter'
], function (Titan, Presenter) {

    describe("Launcher Presenter", function() {

        var app,
            presenter;

        beforeEach(function () {

            presenter = new Presenter();


        });


        it("1 Check that presenter is defined", function () {
            expect(presenter).toBeDefined();
        });

    });
});