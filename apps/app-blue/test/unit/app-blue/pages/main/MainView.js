define([
    'app-blue/pages/main/MainView'
], function (MainView) {

    describe("Main View", function () {

        var view = new MainView();

        it("1 Check that view is defined", function () {
            expect(view).toBeDefined();
        });
        describe('2 Check that view contain fields', function () {
            var templateFields = [
                'root',
                'template',
                'styles'
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

    });

});