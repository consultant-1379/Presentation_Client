define([
    'Titan',
    'app-blue/pages/second/Second'
], function (Titan, Second) {

    var presenter,
        app,
        View;

    describe('Second Presenter', function () {

        beforeEach(function () {
            app = new Titan.Application({
                namespace:'app-blue'
            });

            spyOn(app.localEvents, 'on');

            presenter = new Second({app:app});
            View = presenter.View;
            presenter.view = new View();
        });

        it('1 Check that presenter is defined', function () {
            expect(presenter).toBeDefined();
        });

        it('2 Check that View class is defined', function () {
            expect(presenter.View).toBeDefined();
        });

        it('3 Check that presenter.init() method is called and app.localEvents.on() added', function () {
            expect(app.localEvents.on).toHaveBeenCalledWith(View.EVENT_CLICK_CHANGE_PARAM, presenter.onAppParamChange, presenter);
        });

        it('4 Check presenter.onPlaceChanged() method', function () {
            var place = {
                id: 'id', name: 'name'
            };
            spyOn(presenter.view.getInputParam(), 'val');
            
            presenter.onPlaceChanged(place);
            expect(presenter.view.getInputParam().val).toHaveBeenCalledWith(place.id);
        });

        describe('5 Check presenter.onAppParamChange() method', function () {

            it('5.1 Param field is empty', function () {
                spyOn(presenter.view.getInputParam(), 'val').andReturn('');
                spyOn(presenter, 'redirect');

                presenter.onAppParamChange();
                expect(presenter.redirect).toHaveBeenCalledWith('#');

            });

            it('5.2 Param field is not empty', function () {
                spyOn(presenter.view.getInputParam(), 'val').andReturn('param');
                spyOn(presenter, 'redirect');

                presenter.onAppParamChange();
                expect(presenter.redirect).toHaveBeenCalledWith('#app-blue/second/param');
            });

        });

    });

});