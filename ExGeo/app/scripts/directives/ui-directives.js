'use strict';

/* Directives */

angular.module('exGeo.ui.directives', [])
    .directive("uiTime", [
        function () {
            return {
                restrict: "A",
                link: function (scope, ele) {
                    var checkTime, startTime;
                    return startTime = function () {
                        var h, m, s, t, time, today;
                        return today = new Date, h = today.getHours(), m = today.getMinutes(), s = today.getSeconds(), m = checkTime(m), s = checkTime(s), time = h + ":" + m + ":" + s, ele.html(time), t = setTimeout(startTime, 500)
                    }, checkTime = function (i) {
                        return 10 > i && (i = "0" + i), i
                    }, startTime()
                }
            }
        }
    ])
    .directive("uiWeather", [
        function () {
            return {
                restrict: "A",
                link: function (scope, ele, attrs) {
                    var color, icon, skycons;
                    return color = attrs.color, icon = Skycons[attrs.icon], skycons = new Skycons({
                        color: color,
                        resizeClear: !0
                    }), skycons.add(ele[0], icon), skycons.play()
                }
            }
        }
    ])
    .directive('signIn', function () {
        return {
            restrict: "E",
            replace: true,
            //scope: {              // set up directive's isolated scope
            //    type: "@",          // name var passed by value (string, one-way)
            //},
            template: ' <a ng-show="isLogin()" ng-click="authlogin();">Sign In</a>',
            controller: [
                '$scope', '$location', 'auth', 'store', '$cookies', '$utils', '$exGeoAuthenticate', 'logger',
                function ($scope, $location, auth, store, $cookies, $utils, $exGeoAuthenticate, logger) {

                    $scope.authlogin = function () {
                        auth.signin({}, function (profile, token) {
                            $exGeoAuthenticate.setSignIn(profile, token);

                        }, function (error) {
                            logger.logError("There was an error logging in");
                        });
                    };

                    return $scope.isLogin = function () {
                        var showLogin;

                        return showLogin = $exGeoAuthenticate.isLogin();
                    };
                }
            ]
        };
    })
    .directive('signUp', function () {
        return {
            restrict: "E",
            replace: true,
            //scope: {              // set up directive's isolated scope
            //    type: "@",          // name var passed by value (string, one-way)
            //},
            template: ' <a ng-show="isLogin()" ng-click="registerAuth();">Sign Up</a>',
            controller: [
                '$scope', '$location', 'auth', 'store', '$cookies', '$utils', 'logger', '$exGeoAuthenticate',
                function ($scope, $location, auth, store, $cookies, $utils, logger, $exGeoAuthenticate) {

                    $scope.registerAuth = function () {
                        auth.signup({}, function (profile, token) {
                            logger.log('sign up done');

                        }, function (error) {
                            logger.logError("There was an error in sign up");
                        });
                    };

                    return $scope.isLogin = function () {
                        var showLogin;

                        return showLogin = $exGeoAuthenticate.isLogin();
                    };
                }
            ]
        };
    })
    .directive('logout', function () {
        return {
            restrict: "E",
            replace: true,
            //scope: {              // set up directive's isolated scope
            //    type: "@",          // name var passed by value (string, one-way)
            //},
            template: ' <a ng-show="!isLogin()" ng-click="logoutAuth();">Logout</a>',
            controller: [
                '$scope', '$location', 'auth', 'store', '$cookies', '$utils', 'logger', '$exGeoAuthenticate',
                function ($scope, $location, auth, store, $cookies, $utils, logger, $exGeoAuthenticate) {

                    $scope.logoutAuth = function () {
                        $exGeoAuthenticate.logoutAuth();
                    };

                    return $scope.isLogin = function () {
                        var showLogin;
                        return showLogin = $exGeoAuthenticate.isLogin();
                    };
                }
            ]
        };
    })
    .directive('loginHeader', function () {
        return {
            restrict: "E",
            replace: true,
            //scope: {              // set up directive's isolated scope
            //    type: "@",          // name var passed by value (string, one-way)
            //},
            template: '<ul class="nav navbar-nav navbar-right login-register small-text">' +
                 ' <li ng-show="isLogin()" class="login "><a ng-show="isLogin()" ng-click="authlogin();">Sign In</a></li>' +
                ' <li ng-show="isLogin()" class="login "><a  ng-click="registerAuth();">Sign Up</a></li>' +
                 ' <li ng-show="!isLogin()" class="login "><a ng-show="!isLogin()" ng-click="logoutAuth();">Logout</a></li> </ul>'
                ,
            controller: [
                '$scope', '$location', 'auth', 'store', '$cookies', '$utils', 'logger', '$exGeoAuthenticate',
                function ($scope, $location, auth, store, $cookies, $utils, logger, $exGeoAuthenticate) {

                    $scope.registerAuth = function () {
                        auth.signup({}, function (profile, token) {
                            logger.log('sign up done');

                        }, function (error) {
                            logger.logError("There was an error in sign up");
                        });
                    };

                    $scope.logoutAuth = function () {
                        $exGeoAuthenticate.logoutAuth();
                    };

                    $scope.authlogin = function () {
                        auth.signin({}, function (profile, token) {
                            $exGeoAuthenticate.setSignIn(profile, token);

                        }, function (error) {
                            logger.logError("There was an error logging in");
                        });
                    };

                    return $scope.isLogin = function () {
                        var showLogin;

                        return showLogin = $exGeoAuthenticate.isLogin();
                    };
                }
            ]
        };
    });