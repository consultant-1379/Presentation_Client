define([
    'Titan',
    'app-red/pages/main/Main'
], function (Titan, Main) {
    Titan.extension(function(env){
        console.log(env._private);
    });
    var presenter,
        app,
        View;

    describe("Main Presenter", function () {

        beforeEach(function () {
            app = new Titan.Application({
                namespace:'app-red'
            });
            spyOn(app.localEvents, 'on');

            presenter = new Main({
                app:app
            });

            View = presenter.View;

            presenter.view = new View();




        });




        it("1 Check that presenter is defined", function () {
            expect(presenter).toBeDefined();
        });

        it("2 Check that View class is defined", function () {
            expect(presenter.View).toBeDefined();
        });

        it('3 Check that presenter.init() method is called and app.localEvents.on() added', function () {
            expect(app.localEvents.on).toHaveBeenCalledWith(View.EVENT_CLICK_CHANGE_PARAM, presenter.onAppParamChange, presenter);
        });

        it('4 Check that presenter.onPlaceChanged() method calls to another methods in the class', function () {
            var place = {id: 'id', name: 'name'};
            spyOn(presenter, 'changeAppName');
            spyOn(presenter, 'updateAppParam');

            presenter.onPlaceChanged(place);

            expect(presenter.changeAppName).toHaveBeenCalledWith(place);
            expect(presenter.updateAppParam).toHaveBeenCalledWith('');
        });

        it('5 Check that presenter.onAnotherPlace() method calls to another methods in the class', function () {
            var place = {id: 'id', name: 'name'};
            spyOn(presenter, 'changeAppName');
            spyOn(presenter, 'updateAppParam');

            presenter.onAnotherPlace(place);

            expect(presenter.changeAppName).toHaveBeenCalledWith(place);
            expect(presenter.updateAppParam).toHaveBeenCalledWith(place.id);
        });

        describe('6 Check presenter.onAppParamChange() method', function () {

            it('6.1 Param field is empty', function () {
                spyOn(presenter.view.getInputParam(), 'val').andReturn('');
                spyOn(presenter, 'redirect');

                presenter.onAppParamChange();
                expect(presenter.redirect).toHaveBeenCalledWith('#');

            });

            it('6.2 Param field is not empty', function () {
                var param = 'param';
                spyOn(presenter.view.getInputParam(), 'val').andReturn(param);
                spyOn(presenter, 'redirect');

                presenter.onAppParamChange();
                expect(presenter.redirect).toHaveBeenCalledWith('#app-red/anotherPlace/' + param);
            });

        });

        it('7 Check that presenter.changeAppName() method works correctly', function () {
            spyOn(presenter.view.getAppName(), 'html');

            var place = {id: 'id', name: 'name'};
            presenter.changeAppName(place);

            expect(presenter.view.getAppName().html).toHaveBeenCalledWith(presenter.appName + ' "' + place.name + '"');
        });

        describe('8 Check presenter.updateAppParam() method', function () {

            it('8.1 Param value is empty', function () {
                spyOn(presenter.view.getAppParam(), 'html');
                spyOn(presenter.view.getInputParam(), 'val');

                var param = '';
                presenter.updateAppParam(param);

                expect(presenter.view.getAppParam().html).toHaveBeenCalledWith(param);
                expect(presenter.view.getInputParam().val).toHaveBeenCalledWith(param);

            });

            it('8.2 Param value is not empty', function () {
                spyOn(presenter.view.getAppParam(), 'html');
                spyOn(presenter.view.getInputParam(), 'val');

                var param = 'param';
                presenter.updateAppParam(param);

                expect(presenter.view.getAppParam().html).toHaveBeenCalledWith('App param is "' + param + '"');
                expect(presenter.view.getInputParam().val).toHaveBeenCalledWith(param);
            });

        });

    });

});