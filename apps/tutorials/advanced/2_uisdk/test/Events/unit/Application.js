define(['Application'], function (Application) {

    describe("Application", function () {

        it("1 Check that Places is defined", function () {
            expect(Application.prototype.places).toBeDefined();
        });

        it("2 Check that Namespace is defined", function () {
            expect(Application.prototype.namespace).toBeDefined();
        });

        it("3 Check that Namespace is equals to Events", function () {
            expect(Application.prototype.namespace).toEqual('Events');
        });
    });

});