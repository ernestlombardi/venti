var Application = Application || {};
var angular = angular || {};

Application.Services = angular.module('app.services', []);
Application.Controllers = angular.module('app.controllers', []);
Application.Directives = angular.module('app.directives', []);
Application.Constants = angular.module('app.constants', []);

var app = angular.module('app',
    ['ngRoute',
    'ngResource',
    'ngAnimate',
    'ngAria',
    'ngMaterial',        
    'app.controllers',
    'app.services',
    'app.directives',
    'app.constants']);

var WelcomeCtrl = 'WelcomeCtrl';
var SignInCtrl = 'SignInCtrl';

app.config([
    '$routeProvider',
    function ($routeProvider) {
        'use strict';
        $routeProvider
            .when('/', {
                templateUrl: 'components/sign-in/sign-in.html',
                controller: SignInCtrl,
                resolve: SignInCtrl.resolve
            })
            .when('/welcome', {
                templateUrl: 'components/welcome/welcome.html',
                controller: WelcomeCtrl,
                resolve: WelcomeCtrl.resolve
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);

app.run(['$rootScope',
    function ($rootScope) {
        'use strict';
        $rootScope.title = '';
        $rootScope.brand = 'Quicksilver Workshop';
        $rootScope.copyrightYear = new Date().getFullYear();

        //Push route change event to google analytics
        /*
        $rootScope.$on('$routeChangeSuccess', function(event) {
            $window.ga('set', 'page', $location.path());
            $window.ga('send', 'pageview');
        });
        */
    }]);
