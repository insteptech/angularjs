'use strict';

define(['services/routeResolver'], function () {
    // Declare app level module which depends on filters, and services


    var modules = [
    "ngRoute",
    'ngAnimate',
    "ui.bootstrap",
    "easypiechart",
    "mgo-angular-wizard",
    "textAngular",
    "angular-loading-bar",
    "exGeo.ui.directives",
    "exGeo.ui.services",
    "exGeo.directives",
    "exGeo.ui.form.directives",
    "exGeo.localization.services",
    "exGeo.chart.directives",
    'exGeo.exGeoPages',
    'exGeo.exGeoHttp',
    'exGeo.utils',
    'routeResolverServices',
    'ngCookies',
    'auth0',
    'angular-storage',
    'angular-jwt',
    'exGeo.exGeoAuthenticate'
    ];



    var app = angular.module('exGeoApp', modules);

    app.config([
        '$exGeoPagesProvider', '$routeProvider', 'routeResolverProvider', '$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide', '$httpProvider', 'authProvider', 'jwtInterceptorProvider', function ($exGeoPagesProvider, $routeProvider, routeResolverProvider, $controllerProvider,
            $compileProvider, $filterProvider, $provide, $httpProvider, authProvider, jwtInterceptorProvider) {

            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };
            var route = routeResolverProvider.route;
            var renderPages = $exGeoPagesProvider.$get();
            //     
            angular.forEach(renderPages.pages, function (page, key) {
                $routeProvider.when(page.path, route.resolve(page.route.url, page.route.dir, page.route.requiresLogin));
            });

            angular.forEach(renderPages.errorPages, function (page, key) {
                $routeProvider.when(page.path, page.route);
            });

            $routeProvider.otherwise({ redirectTo: renderPages.error404Page });

            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

            authProvider.init({
                domain: AUTH0_DOMAIN,
                clientID: AUTH0_CLIENT_ID,
                loginUrl: renderPages.landingPage
            });

            jwtInterceptorProvider.tokenGetter = function (store) {
                return store.get('token');
            };

            $httpProvider.interceptors.push('jwtInterceptor');
        }
    ]).run([
        '$exGeoAuthenticate', 'auth', function ($exGeoAuthenticate, auth) {
            auth.hookEvents();
            $exGeoAuthenticate.getLocationChange();

            $exGeoAuthenticate.getRouteChange();
        }
    ]);
    return app;
});

