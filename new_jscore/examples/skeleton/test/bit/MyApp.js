/*global define, describe, it, expect */
define([
	"MyApp/MyApp"
], function (MyApp) {
    'use strict';

    describe("someTest", function () {

        it("MyApp should be defined", function () {
            expect(MyApp).not.to.be.undefined;
        });

    });

});