'use strict';

/* Services To Call Server Side Methods*/
angular.module('exGeo.exGeoHttp', [])

    .factory('$exGeoLogin', ['$utils', '$http', function ($utils, $http) {

        var factory = {};

        factory.signInUp = function (obj, path) {

            var url = $utils.getApiUrl(path);

            return $http.post(url, obj);
        };


        factory.postSecure = function (url, params) {
            return $http({
                method: 'POST',
                url: url,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                data: $.param(params)
            });
        };
        return factory;

    }])

    .factory('$exGeoCountries', ['$utils', '$http', function ($utils, $http) {
        var factory = {};

        factory.getCountries = function (path) {
            var url = $utils.getApiUrl(path);
            return $http.get(url);
        };

        factory.getCountryDetail = function (path, param) {
            var url = $utils.getApiUrl(path);
            url = url + "/" + param.country + "/" + param.action;
            return $http.get(url);
        };

        factory.postSecure = function (url, params) {
            return $http({
                method: 'POST',
                url: url,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                data: $.param(params)
            });
        };

        return factory;
    }]);

