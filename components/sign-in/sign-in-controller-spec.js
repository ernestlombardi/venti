"use strict";

beforeEach(module("app"));

describe("Sign-in Component Controller", function() {
    var scope;

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller("SignInCtrl", {$scope: scope});
    }));

    describe("SignInCtrl", function() {
        it("should set the content title", function() {
            expect(scope.pageTitle).toBe("Sign-in to Project Seed Project");
        });
    });
});