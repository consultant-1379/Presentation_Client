define([
    'Titan',
    'app-blue/pages/second/SecondView'
], function (Titan, SecondView) {

    describe("Second View", function () {

        var view = new SecondView();

        it("1 Check that view is defined", function () {
            expect(view).toBeDefined();
        });

        describe('2 Check that view contain fields', function () {
            var templateFields = [
                'root',
                'template',
                'styles',
                SecondView.EL_INPUT_PARAM,
                SecondView.EL_CHANGE_PARAM
            ];

            var currIndex = 1;
            templateFields.forEach(function(fieldName) {
                var itTitle = '2.' + currIndex + ' Contains field ' + fieldName;
                it(itTitle, function() {
                    expect(view[fieldName]).toBeDefined();
                });
                currIndex++;
            });
        });

        describe('3 Check that view contains method', function () {
            var viewMethods = [
                'getInputParam',
                'getChangeParam'
            ];

            var currIndex = 1;
            viewMethods.forEach(function(methodName) {
                var itTitle = '3.' + currIndex + ' Contains method ' + methodName;
                it(itTitle, function() {
                    expect(view[methodName]).toBeDefined();
                });
                currIndex++;
            });
        });

        describe('4 Check that correct field is returned by', function() {
            var methodFieldPairs = [
                {
                    method: 'getInputParam',
                    field: SecondView.EL_INPUT_PARAM
                },
                {
                    method: 'getChangeParam',
                    field: SecondView.EL_CHANGE_PARAM
                }
            ];

            var currIndex = 1;
            methodFieldPairs.forEach(function(pair) {
                var itTitle = '4.' + currIndex + ' Method ' + pair.method + '() returns field ' + pair.field;
                it(itTitle, function() {
                    expect(view[pair.method]()).toEqual(view[pair.field]);
                });
                currIndex++;
            });
        });

        describe('5 Check view.init() method', function () {

            var app,
                view;

            beforeEach(function () {
                app = new Titan.Application();
                spyOn(app.localEvents, 'trigger');

                view = new SecondView();
            });

            it('5.1 Check that eventListeners added', function () {
                spyOn(view.getChangeParam(), 'on');
                spyOn(view.getInputParam(), 'on');

                view.init(app);

                expect(view.getChangeParam().on.calls.length).toEqual(1);
                expect(view.getInputParam().on.calls.length).toEqual(1);
                expect(view.getChangeParam().on).toHaveBeenCalledWith('click', jasmine.any(Function));
                expect(view.getInputParam().on).toHaveBeenCalledWith('keyup', jasmine.any(Function));
            });

            // TODO: Need to understand how to trigger events
            // TODO: is it possible with jasmine unit tests ?
            xit('5.2 Check that view.getChangeParam() triggers "click" event', function () {
                view.init(app);
                view.getChangeParam().trigger('click');

                expect(app.localEvents.trigger).toHaveBeenCalledWith(SecondView.EVENT_CLICK_CHANGE_PARAM);
            });

            // TODO: Need to understand how to trigger events
            // TODO: is it possible with jasmine unit tests ?
            xit('5.3 Check that view.getInputParam() triggers "keyup" event with Enter', function () {
                view.init(app);
                view.getInputParam().trigger('keyup', {which:13});

                expect(app.localEvents.trigger).toHaveBeenCalledWith(SecondView.EVENT_CLICK_CHANGE_PARAM);
            });

            // TODO: Need to understand how to trigger events
            // TODO: is it possible with jasmine unit tests ?
            xit('5.4 Check that view.getInputParam() triggers "keyup" event with any value', function () {
                view.init(app);
                view.getInputParam().trigger('keyup', {which:55});

                expect(app.localEvents.trigger).toHaveBeenCalledWith(SecondView.EVENT_CLICK_CHANGE_PARAM);
            });

        });

    });

});