'use strict';

/* Directives */

angular.module('exGeo.ui.form.directives', [])
    .directive("uiRangeSlider", [
        function () {
            return {
                restrict: "A",
                link: function (scope, ele) {
                    return ele.slider()
                }
            };
        }
    ])
    .directive("uiFileUpload", [
        function () {
            return {
                restrict: "A",
                link: function (scope, ele) {
                    return ele.bootstrapFileInput()
                }
            };
        }
    ])
    .directive("uiSpinner", [
        function () {
            return {
                restrict: "A",
                compile: function (ele) {
                    return ele.addClass("ui-spinner"), {
                        post: function () {
                            return ele.spinner();
                        }
                    };
                }
            };
        }
    ])
    .directive("uiWizardForm", [
        function () {
            return {
                link: function (scope, ele) {
                    return ele.steps();
                }
            };
        }
    ])

    .directive('requiredField', ['$utils', '$timeout', function ($utils, $timeout) {
        return {
            require: "ngModel",
            link: function (scope, elm, attrs, ctrl) {

                var verificationFunction = function (viewValue) {
                    if ($utils.isNullOrWhiteSpace(viewValue)) {
                        ctrl.$setValidity('requiredField', false);
                        return undefined;
                    }
                    else {
                        ctrl.$setValidity('requiredField', true);
                        return viewValue;
                    }
                };

                ctrl.$parsers.unshift(verificationFunction);
                verificationFunction();
                // ctrl.$formatters.unshift(verificationFunction);
            }
        };
    }])

    .directive('emailPatternValidator', ['$utils', function ($utils) {
        return {
            require: "ngModel",
            link: function (scope, elm, attrs, ctrl) {
                var regex = new RegExp(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/);

                var verificationFunction = function (viewValue) {
                    if (!$utils.isNullOrWhiteSpace(viewValue)) {
                        if (!regex.test(viewValue)) {
                            ctrl.$setValidity('emailPatternValidator', false);
                            return viewValue;
                        } else {
                            ctrl.$setValidity('emailPatternValidator', true);
                            return viewValue;
                        }
                    }
                    return viewValue;
                };

                ctrl.$formatters.unshift(verificationFunction);
              
                elm.bind('blur', function (event) {
                    scope.$apply(function () {
                        verificationFunction(ctrl.$modelValue);
                    });
                });

            }
        };
    }]);
