'use strict';

beforeEach(module('app'));

describe('Welcome Component', function() {
    var scope;

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('WelcomeCtrl', {$scope: scope});
    }));

    describe('WelcomeCtrl', function() {
        it('should set the content title', function() {
            expect(scope.appTitle).toBe('Welcome to Project Seed Project');
        });
    });
});
