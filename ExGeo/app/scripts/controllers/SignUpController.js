'use strict';

/* Controllers */
'use strict';

define(['app'], function (app) {
    var glbHotelArray = [];

    var injectParams = ['$scope', '$exGeoLogin', '$utils', 'logger', '$q', 'auth', 'store'];

    var SignupController = function ($scope, $exGeoLogin, $utils, logger, $q,auth, store) {

        init();

        function init() {
            try {
                $scope.registerInfo = {};

                $scope.registerInfo.email = "";
                $scope.registerInfo.password = "";
                $scope.registerInfo.userName = "";
            } catch (e) {
                logger.logError(e.message);
            } 
        }


        $scope.registerAuth = function () {
            auth.signup({}, function (profile, token) {
                logger.log('sign up done');
                //store.set('profile', profile);
                //store.set('token', token);
                //$location.path("/dashboard");
            }, function (error) {
                console.log("There was an error logging in", error);
            });
        };

        $scope.register = function (registerForm) {
            if (validate(registerForm)) {
                registerDetail();
            }
        };

        function registerDetail() {
            var promises = [];
            promises.push(doQuery());

            $q.all(promises).then(function (data) { 
                logger.log(data[0].data.detail);
            });
        }

        function doQuery() {
            var d = $q.defer();
          
            $exGeoLogin.signInUp($scope.registerInfo, $utils.getConfigApiPath().signUp)
                          .success(function (result, status, headers, config) {
                              d.resolve(result);
                              
                          }).error(function (data, status, headers, config) {
                              logger.logError("Service Error");
                          });
            return d.promise;
        }

        function validate(registerForm) {

            if (!validateField($scope.registerInfo.userName, 'User name')) {
                registerForm.username.$setValidity('required', false);
                logger.logError("Username is required!");
            }

            if (!validateField($scope.registerInfo.email, 'Email')) {
                registerForm.email.$setValidity('required', false);
                logger.logError("Email is Required!");

            } else {
                if (!$utils.validatePattern($scope.registerInfo.email,
                    'Email', /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
                    registerForm.email.$setValidity('emailPatternValidator', false);
                    logger.logError("Enter valid email!");
                }
            }

            if (!validateField($scope.registerInfo.password, 'password')) {
                registerForm.password.$setValidity('required', false);
                logger.logError("Password is required!");
            }
          
            return registerForm.$valid;
        }

        function validateField(value, placeholder) {
            value = $utils.stripPrompt(value, placeholder);

            if ($utils.isNullOrWhiteSpace(value)) {
                return false;
            }
            return true;
        }
    };


    SignupController.$inject = injectParams;

    app.register.controller('SignupController', SignupController);

});



