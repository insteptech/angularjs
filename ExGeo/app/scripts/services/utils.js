'use strict';

/* Services To Create Utility Methods*/
angular.module('exGeo.utils', [])

    .factory('$utils', function () {

        var factory = {};

        factory.getUtcDate = function (date) {
            if (!date) {
                date = new Date();
            }

            var utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

            return utcDate;
        };

        factory.isNullOrEmpty = function (str) {
            return (!str || 0 == str.length);
        };

        factory.isNullOrWhiteSpace = function (str) {
            return (!str || /^\s*$/.test(str));
        };

        factory.trim = function (value) {
            if (!factory.isNullOrEmpty(value)) {
                return $.trim(value);
            }

            return value;
        };

        factory.ensureValidString = function (value, defValue) {
            if (factory.isNullOrEmpty(defValue)) {
                defValue = '';
            }

            return factory.isNullOrWhiteSpace(value) ? defValue : value;
        };

        factory.stripPrompt = function (value, prompt) {
            if (factory.isNullOrEmpty(prompt)) {
                prompt = '[prompt]';
            }

            if (value === prompt) {
                return '';
            }

            return factory.trim(value);
        };

        factory.toFullUrl = function (url) {

            if (url && url.length > 0) {
                var prefix = window.location.protocol + '//' + window.location.host;
                if (window.location.hostname == 'localhost') {
                    var i = window.location.pathname.indexOf('/', 0);
                    if (i > 0) {
                        var domain = window.location.pathname.substr(1, i - 1);
                        prefix += '/' + domain;
                    }
                }

                var absoluteUrl;
                if (url.substr(0, 2) == '~/') {
                    absoluteUrl = prefix + url.substr(1);   //  include the '/' char
                }
                else {
                    absoluteUrl = prefix + url;
                }

                return absoluteUrl;
            }

            return url;
        };

        factory.fillResult = function (objResult, promptText, value) {
            var prompt = [{ Text: promptText, Value: value }];
            if (objResult != null) {


                if (objResult.length > 0) {
                    objResult = prompt.concat(objResult);
                } else if (objResult.length == 0) {
                    objResult = prompt;
                }
            } else {
                objResult = new Array();
                objResult = prompt;
            }
            return objResult;
        };

        factory.getApiUrl = function (path) {
            var baseUrl = "http://public-api.neural-medium-818.appspot.com/v1/";
            return baseUrl + path;
        };

        factory.getConfigApiPath = function () {
            var apiPath = {
                signIn: "login",
                signUp: "register",
                getCountries: "country"
            };
            return apiPath;
        };

        factory.validatePattern = function (value, placeholder, reGPattern) {
            value = factory.stripPrompt(value, placeholder);
            var pattern = new RegExp(reGPattern);
            if (!factory.isNullOrWhiteSpace(value)) {

                if (!pattern.test(value)) {
                    return false;
                }
            }
            return true;
        };

    factory.storeConfig = function() {
        var storeCon = {
            token: 'token',
            profile: 'profile'
        };


        return storeCon;
    };
        return factory;

    });
