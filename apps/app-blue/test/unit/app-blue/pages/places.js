define([
    'app-blue/pages/places'
], function (places) {

    describe("places", function () {

        it("1 Check that there are 2 places in the list", function () {
            expect(places).toBeDefined();
            expect(places.length).toEqual(2);
        });

    });

});