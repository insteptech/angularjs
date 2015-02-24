'use strict';

/* Controllers */
'use strict';

define(['app'], function (app) {
    var glbHotelArray = [];

    var injectParams = ['$scope', '$exGeoCountries', '$utils', 'logger', '$q', 'auth', 'store'];

    var sendMoneyController = function ($scope, $exGeoCountries, $utils, logger, $q, auth, store) {

        init();

        function init() {
            try {
                $scope.SendMoneyInfo = {};
                getCountries();
                getCountryDetail();

            } catch (e) {
                logger.logError(e.message);
            }
        }

        function getCountries() {
            var promises = [];
            promises.push(queryCountires());

            $q.all(promises).then(function (data) {
                console.log(data);
            });
        }

        function getCountryDetail() {
            var promises = [];
            promises.push(queryCountryDetail());

            $q.all(promises).then(function (data) {
                //do your stuff.
            });
        }
        function queryCountires() {
            var d = $q.defer();

            $exGeoCountries.getCountries($utils.getConfigApiPath().getCountries)
                .success(function (result, status, headers, config) {
                    d.resolve(result);

                }).error(function (data, status, headers, config) {
                    logger.logError("Service Error");
                });

            return d.promise;
        }

        function queryCountryDetail() {
            var d = $q.defer();
            var param = {};
            param.country = "indonesia";
            param.action = "details";

            $exGeoCountries.getCountryDetail($utils.getConfigApiPath().getCountries, param)
                .success(function (result, status, headers, config) {
                    d.resolve(result);

                }).error(function (data, status, headers, config) {
                    logger.logError("Service Error");
                });

            return d.promise;
        }

    };


    sendMoneyController.$inject = injectParams;

    app.register.controller('SendMoneyController', sendMoneyController);

});



