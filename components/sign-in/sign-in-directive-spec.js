describe("Sign-In Component Directive", function() {
    var scope, httpBackend, el, template, form;

    beforeEach(module("app"));
    beforeEach(module("templates"));

    beforeEach(inject(function($rootScope, $controller, $injector, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;

        /*The Angular Material $mdIcon directive makes its own call for images*/
        $httpBackend
            .whenGET("images/icons/ic_post_gplus_48px.svg")
            .respond("");

        $httpBackend
            .whenGET("images/icons/ic_post_twitter_48px.svg")
            .respond("");

        $httpBackend
            .whenGET("images/icons/ic_post_facebook_48px.svg")
            .respond("");
    }));

    describe("Sign-In Form", function() {
        beforeEach(inject(function ($rootScope, $controller, $templateCache, $compile) {
            $controller("SignInCtrl", {$scope: scope});
            $templateCache.put("sign-in/sign-in-form.html", $templateCache.get("components/sign-in/sign-in-form.html"));
            template = $templateCache.get("sign-in/sign-in-form.html");
            el = $compile(angular.element(template))(scope);
            scope.$digest();
            form = scope.signInForm;
        }));

        describe("Email validation", function () {
            it("should flag an error on invalid email address", function () {
                scope.email = "1234";
                scope.$digest();
                expect(form.email.$invalid).toBeTruthy();
                scope.email = "test@isp.com";
                scope.$digest();
                expect(form.email.$invalid).toBeFalsy();
            });
        });
    });
});
