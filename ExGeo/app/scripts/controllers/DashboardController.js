'use strict';

/* Controllers */
'use strict';

define(['app'], function (app) {
    var glbHotelArray = [];

    var injectParams = ['$scope'];

    var DashboardController = function ($scope) {

         $scope.comboChartData = [
            ["Month", "Bolivia", "Ecuador", "Madagascar", "Papua New Guinea", "Rwanda", "Average"],
            ["2014/05", 165, 938, 522, 998, 450, 614.6],
            ["2014/06", 135, 1120, 599, 1268, 288, 682],
            ["2014/07", 157, 1167, 587, 807, 397, 623],
            ["2014/08", 139, 1110, 615, 968, 215, 609.4],
            ["2014/09", 136, 691, 629, 1026, 366, 569.6]
        ];
        $scope.salesData = [
            ["Year", "Sales", "Expenses"],
            ["2010", 1e3, 400],
            ["2011", 1170, 460],
            ["2012", 660, 1120],
            ["2013", 1030, 540]
        ];

        $scope.comboData = [
            {
                year: "2008",
                a: 20,
                b: 16,
                c: 12
            }, {
                year: "2009",
                a: 10,
                b: 22,
                c: 30
            }, {
                year: "2010",
                a: 5,
                b: 14,
                c: 20
            }, {
                year: "2011",
                a: 5,
                b: 12,
                c: 19
            }, {
                year: "2012",
                a: 20,
                b: 19,
                c: 13
            }, {
                year: "2013",
                a: 28,
                b: 22,
                c: 20
            }
        ];

        $scope.donutChart2 = {};
        $scope.donutChart2.data = [
            {
                label: "Download Sales",
                data: 12
            }, {
                label: "In-Store Sales",
                data: 30
            }, {
                label: "Mail-Order Sales",
                data: 20
            }, {
                label: "Online Sales",
                data: 19
            }, {
                label: "Direct Sales",
                data: 15
            }
        ];
        $scope.donutChart2.options = {
            series: {
                pie: {
                    show: !0,
                    innerRadius: .45
                }
            },
            legend: {
                show: !1
            },
            grid: {
                hoverable: !0,
                clickable: !0
            },
            colors: ["#176799", "#2F87B0", "#42A4BB", "#5BC0C4", "#78D6C7"],
            tooltip: !0,
            tooltipOpts: {
                content: "%p.0%, %s",
                defaultTheme: !1
            }
        };

    };


    DashboardController.$inject = injectParams;

    app.register.controller('DashboardController', DashboardController);

});



