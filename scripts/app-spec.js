"use strict";

beforeEach(module("app"));

describe("App RootScope tests", function() {
    var scope;

    beforeEach(inject(function($rootScope) {
        scope = $rootScope.$new();
    }));

    describe("Copyright Date", function() {
        it("should set the copyright year to the current year", function() {
            expect(scope.copyrightYear).toBe(new Date().getFullYear());
        });
    });
});
