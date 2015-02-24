'use strict';


angular.module('exGeo.exGeoAuthenticate', [])

    .factory('$exGeoAuthenticate', ['$http', '$rootScope', '$location', 'auth', 'store', 'jwtHelper', '$cookies','$utils','$exGeoPages',
        function ($http, $rootScope, $location, auth, store, jwtHelper, $cookies, $utils, $exGeoPages) {

            var factory = {};

            factory.getLocationChange = function() {
                $rootScope.$on('$locationChangeStart', function() {

                    if (!auth.isAuthenticated) {
                        var token = store.get($utils.storeConfig().token);
                        if (token) {
                            if (!jwtHelper.isTokenExpired(token)) {
                                auth.authenticate(store.get($utils.storeConfig().profile), token);
                            } else {
                                $location.path($exGeoPages.landingPage);
                            }
                        }
                    }
                });
            };

            factory.getRouteChange = function() {
                $rootScope.$on("$routeChangeStart", function(event, next, current) {
                    if ($location.path() == "/") {
                        $location.path($exGeoPages.landingPage);
                        event.preventDefault();
                    } else if (next.requiresLogin) {
                        var token = store.get($utils.storeConfig().token);
                        if (token) {
                            console.log(store.get('profile'));
                            if (!jwtHelper.isTokenExpired(token)) {
                                
                                if (factory.isLogin()) {
                                    factory.logoutAuth();
                                }
                            } else {
                                factory.logoutAuth();
                            }
                        } else {
                            factory.logoutAuth();
                        }
                    }
                });
            };

            factory.logoutAuth = function() {
                auth.signout();
                store.remove($utils.storeConfig().profile);
                store.remove($utils.storeConfig().token);
                $cookies.token = "";
                $location.path($exGeoPages.landingPage);
                
            };

            factory.isLogin = function() {
                return $utils.isNullOrWhiteSpace($cookies.token);
            };

            factory.setSignIn = function(profile, token) {
                store.set($utils.storeConfig().profile, profile);
                store.set($utils.storeConfig().token, token);
                $cookies.token = token;
            };
       
        return factory;
    
    }]);



