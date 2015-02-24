'use strict';

define(['app'], function (app) {

    ///App Controller Parent
    var injectParamsAppCtrl = ["$scope", "$location"];

    var AppCtrl = function ($scope, $location) {

        return $scope.isSpecificPage = function () {
            var path;
            
            return path = $location.path(), _.contains(["/pages/404", "/pages/500", "/pages/login", "/pages/signin", "/pages/signin1", "/pages/signin2", "/pages/signup", "/pages/signup1", "/pages/signup2", "/pages/lock-screen"], path);
        }, $scope.main = {
            brand: "Flatify",
            name: "Lisa Doe"
        };
    };

    AppCtrl.$inject = injectParamsAppCtrl;

    app.controller('AppCtrl', AppCtrl);

    //Nav Controller 
    var injectParamsNavCtrl = ["$scope", "filterFilter"];

    var NavCtrl = function ($scope,  filterFilter) {

        var tasks = 0;
        return tasks;
        //return tasks = $scope.tasks = taskStorage.get(), $scope.taskRemainingCount = filterFilter(tasks, {
        //    completed: !1
        //}).length, $scope.$on("taskRemaining:changed", function(event, count) {
        //    return $scope.taskRemainingCount = count;
        //});

    };

    NavCtrl.$inject = injectParamsNavCtrl;

    app.controller('NavCtrl', NavCtrl);

    //DashBoardController

    var injectParamsDashboardCtrl = ["$scope"];

    var DashboardCtrl = function ($scope) {

        return $scope.comboChartData = [
                ["Month", "Bolivia", "Ecuador", "Madagascar", "Papua New Guinea", "Rwanda", "Average"],
                ["2014/05", 165, 938, 522, 998, 450, 614.6],
                ["2014/06", 135, 1120, 599, 1268, 288, 682],
                ["2014/07", 157, 1167, 587, 807, 397, 623],
                ["2014/08", 139, 1110, 615, 968, 215, 609.4],
                ["2014/09", 136, 691, 629, 1026, 366, 569.6]
        ], $scope.salesData = [
                ["Year", "Sales", "Expenses"],
                ["2010", 1e3, 400],
                ["2011", 1170, 460],
                ["2012", 660, 1120],
                ["2013", 1030, 540]
        ]
    };

    DashboardCtrl.$inject = injectParamsDashboardCtrl;

    app.controller('DashboardCtrl', DashboardCtrl);
  

});
