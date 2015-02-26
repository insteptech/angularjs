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
                        $exGeoAuthenticate.login();
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
                        $exGeoAuthenticate.signUp();
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
                        $exGeoAuthenticate.signUp();
                    };

                    $scope.logoutAuth = function () {
                        $exGeoAuthenticate.logoutAuth();
                    };

                    $scope.authlogin = function () {
                        $exGeoAuthenticate.login();
                    };

                    return $scope.isLogin = function () {
                        var showLogin;

                        return showLogin = $exGeoAuthenticate.isLogin();
                    };
                }
            ]
        };
    })

.directive('loginSignUp', ['$compile', function ($compile) {

    var templateLoginHeader = '<ul class="nav navbar-nav navbar-right login-register small-text">' +
        ' <li ng-show="isLogin()" class="login "><a ng-show="isLogin()" ng-click="authlogin();">Sign In</a></li>' +
        ' <li ng-show="isLogin()" class="login "><a  ng-click="registerAuth();">Sign Up</a></li>' +
        ' <li ng-show="!isLogin()" class="login "><a ng-show="!isLogin()" ng-click="logoutAuth();">Log Out</a></li> </ul>';

    var templateSubHeader = '<ol class="breadcrumb-alt">'+
                '<li><a href="javascript:;" class="active">Explore Options</a></li>'+
                '<li  ng-show="isLogin()"><a ng-click="registerAuth();">Sign Up</a></li>' +
                '<li><a href="javascript:;">Recepient</a></li>'+
                '<li><a href="javascript:;">Payment</a></li>'+
                '<li><a href="javascript:;">Review</a></li>'+
                '</ol>';

    var templateSignUpButton = '<button ng-show="isLogin()" ng-click="registerAuth();" class="btn btn-w-md btn-gap-v btn-primary right">Sign Up</button>';

    var templateSignInLink = '<div ng-show="isLogin()" class="control-label">' +
        'Already have an account? <a ng-click="authlogin();" >Log in</a> to send to an existing recipient' +
        '</div>';

    var getTemplate = function (contentType) {
        var template = '';

        switch (contentType) {
            case 'loginheader':
                template = templateLoginHeader;
                break;
            case 'subheader':
                template = templateSubHeader;
                break;
            case 'signupbutton':
                template = templateSignUpButton;
                break;
            case 'signinlink':
                template = templateSignInLink;
                break;

        }

        return template;
    };

    var linker = function (scope, element, attrs) {
        console.log(scope.content);
        element.html(getTemplate(scope.content));

        $compile(element.contents())(scope);
    };

    return {
        restrict: "E",
        replace: true,
        scope: {
            content: "@",
        },
        link: linker,

        controller: [
            '$scope', '$location', 'auth', 'store', '$cookies', '$utils', 'logger', '$exGeoAuthenticate',
            function ($scope, $location, auth, store, $cookies, $utils, logger, $exGeoAuthenticate) {
                console.log('call');
                console.log($scope.content);
                $scope.registerAuth = function () {
                    $exGeoAuthenticate.signUp();
                };

                $scope.logoutAuth = function () {
                    $exGeoAuthenticate.logoutAuth();
                };

                $scope.authlogin = function () {
                    $exGeoAuthenticate.login();
                };

                return $scope.isLogin = function () {
                    var showLogin;

                    return showLogin = $exGeoAuthenticate.isLogin();
                };
            }
        ]
    };
}]);