'use strict';

/* Controllers */
'use strict';

define(['app'], function (app) {
    var glbHotelArray = [];

    var injectParams = ['$scope', '$exGeoLogin', '$utils', 'logger', '$q', 'auth', 'store', '$location'];

    var SigninController = function ($scope, $exGeoLogin, $utils, logger, $q, auth, store,$location) {

        init();

        function init() {
            try {
                $scope.loginInfo = {};
                $scope.loginInfo.email = "";
                $scope.loginInfo.password = "";
            } catch (e) {
                logger.logError(e.message);
            } 
        }

        $scope.authlogin = function() {
            auth.signin({}, function(profile, token) {
                store.set('profile', profile);
                store.set('token', token);
                $location.path("/dashboard");
            }, function(error) {
                console.log("There was an error logging in", error);
            });
        };

        $scope.login = function (loginForm) {
            if (validate(loginForm)) {
                loginDetail();
            }
        };

        function loginDetail() {
            var promises = [];
            promises.push(doQuery());

            $q.all(promises).then(function (data) {
               // console.log(data);
            });
        }

        function doQuery() {
            var d = $q.defer();
          
            $exGeoLogin.signInUp($scope.loginInfo, $utils.getConfigApiPath().signIn)
                          .success(function (result, status, headers, config) {
                              d.resolve(result);
                              
                          }).error(function (data, status, headers, config) {
                              logger.logError("Service Error");
                          });
            return d.promise;
        }

        function validate(loginForm) {
            if (!validateField($scope.loginInfo.email, 'Email')) {
                loginForm.email.$setValidity('required', false);
                logger.logError("Email is Required!");

            } else {
                if (!$utils.validatePattern($scope.loginInfo.email,
                    'Email', /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
                    loginForm.email.$setValidity('emailPatternValidator', false);
                    logger.logError("Enter valid email!");
                }
            }

            if (!validateField($scope.loginInfo.password, 'Password')) {
                loginForm.password.$setValidity('required', false);
                logger.logError("Password is required!");
            }
          
            return loginForm.$valid;
        }

        function validateField(value, placeholder) {
            value = $utils.stripPrompt(value, placeholder);

            if ($utils.isNullOrWhiteSpace(value)) {
                return false;
            }
            return true;
        }
    };


    SigninController.$inject = injectParams;

    app.register.controller('SigninController', SigninController);

});



