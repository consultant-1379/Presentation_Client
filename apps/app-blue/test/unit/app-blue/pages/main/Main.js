define([
    'Titan',
    'app-blue/pages/main/Main'
], function (Titan, Main) {
    describe("Main Presenter", function () {
        app = new Titan.Application();

        spyOn(app.localEvents, 'on');

        var presenter = new Main({app: app});

        it("1 Check that presenter is defined", function () {
            expect(presenter).toBeDefined();
        });

        it("2 Check that View class is defined", function () {
            expect(presenter.View).toBeDefined();
        });

    });

});