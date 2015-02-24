'use strict';

/* Directives */

angular.module('exGeo.chart.directives', [])
    .directive("gaugeChart", [
        function() {
            return {
                restrict: "A",
                scope: {
                    data: "=",
                    options: "="
                },
                link: function(scope, ele) {
                    var data, gauge, options;
                    return data = scope.data, options = scope.options, gauge = new Gauge(ele[0]).setOptions(options), gauge.maxValue = data.maxValue, gauge.animationSpeed = data.animationSpeed, gauge.set(data.val)
                }
            }
        }
    ])
    .directive("flotChart", [
        function() {
            return {
                restrict: "A",
                scope: {
                    data: "=",
                    options: "="
                },
                link: function(scope, ele) {
                    var data, options, plot;
                    return data = scope.data, options = scope.options, plot = $.plot(ele[0], data, options)
                }
            }
        }
    ])
    .directive("flotChartRealtime", [
        function() {
            return {
                restrict: "A",
                link: function(scope, ele) {
                    var data, getRandomData, plot, totalPoints, update, updateInterval;
                    return data = [], totalPoints = 300, getRandomData = function() {
                        var i, prev, res, y;
                        for (data.length > 0 && (data = data.slice(1)); data.length < totalPoints;) prev = data.length > 0 ? data[data.length - 1] : 50, y = prev + 10 * Math.random() - 5, 0 > y ? y = 0 : y > 100 && (y = 100), data.push(y);
                        for (res = [], i = 0; i < data.length;) res.push([i, data[i]]), ++i;
                        return res
                    }, update = function() {
                        plot.setData([getRandomData()]), plot.draw(), setTimeout(update, updateInterval)
                    }, data = [], totalPoints = 300, updateInterval = 200, plot = $.plot(ele[0], [getRandomData()], {
                        series: {
                            lines: {
                                show: !0,
                                fill: !0
                            },
                            shadowSize: 0
                        },
                        yaxis: {
                            min: 0,
                            max: 100
                        },
                        xaxis: {
                            show: !1
                        },
                        grid: {
                            hoverable: !0,
                            borderWidth: 1,
                            borderColor: "#eeeeee"
                        },
                        colors: ["#5BC0C4"]
                    }), update()
                }
            }
        }
    ])
    .directive("sparkline", [
        function() {
            return {
                restrict: "A",
                scope: {
                    data: "=",
                    options: "="
                },
                link: function(scope, ele) {
                    var data, options, sparkResize, sparklineDraw;
                    return data = scope.data, options = scope.options, sparkResize = void 0, sparklineDraw = function() {
                        return ele.sparkline(data, options)
                    }, $(window).resize(function() {
                        return clearTimeout(sparkResize), sparkResize = setTimeout(sparklineDraw, 200)
                    }), sparklineDraw()
                }
            }
        }
    ])
    .directive("morrisChart", [
        function() {
            return {
                restrict: "A",
                scope: {
                    data: "="
                },
                link: function(scope, ele, attrs) {
                    var colors, data, func, options;
                    switch (data = scope.data, attrs.type) {
                    case "line":
                        return colors = void 0 === attrs.lineColors || "" === attrs.lineColors ? null : JSON.parse(attrs.lineColors), options = {
                            element: ele[0],
                            data: data,
                            xkey: attrs.xkey,
                            ykeys: JSON.parse(attrs.ykeys),
                            labels: JSON.parse(attrs.labels),
                            lineWidth: attrs.lineWidth || 2,
                            lineColors: colors || ["#0b62a4", "#7a92a3", "#4da74d", "#afd8f8", "#edc240", "#cb4b4b", "#9440ed"],
                            resize: !0
                        }, new Morris.Line(options);
                    case "area":
                        return colors = void 0 === attrs.lineColors || "" === attrs.lineColors ? null : JSON.parse(attrs.lineColors), options = {
                            element: ele[0],
                            data: data,
                            xkey: attrs.xkey,
                            ykeys: JSON.parse(attrs.ykeys),
                            labels: JSON.parse(attrs.labels),
                            lineWidth: attrs.lineWidth || 2,
                            lineColors: colors || ["#0b62a4", "#7a92a3", "#4da74d", "#afd8f8", "#edc240", "#cb4b4b", "#9440ed"],
                            behaveLikeLine: attrs.behaveLikeLine || !1,
                            fillOpacity: attrs.fillOpacity || "auto",
                            pointSize: attrs.pointSize || 4,
                            resize: !0
                        }, new Morris.Area(options);
                    case "bar":
                        return colors = void 0 === attrs.barColors || "" === attrs.barColors ? null : JSON.parse(attrs.barColors), options = {
                            element: ele[0],
                            data: data,
                            xkey: attrs.xkey,
                            ykeys: JSON.parse(attrs.ykeys),
                            labels: JSON.parse(attrs.labels),
                            barColors: colors || ["#0b62a4", "#7a92a3", "#4da74d", "#afd8f8", "#edc240", "#cb4b4b", "#9440ed"],
                            stacked: attrs.stacked || null,
                            resize: !0
                        }, new Morris.Bar(options);
                    case "donut":
                        return colors = void 0 === attrs.colors || "" === attrs.colors ? null : JSON.parse(attrs.colors), options = {
                            element: ele[0],
                            data: data,
                            colors: colors || ["#0B62A4", "#3980B5", "#679DC6", "#95BBD7", "#B0CCE1", "#095791", "#095085", "#083E67", "#052C48", "#042135"],
                            resize: !0
                        }, attrs.formatter && (func = new Function("y", "data", attrs.formatter), options.formatter = func), new Morris.Donut(options)
                    }
                }
            }
        }
    ]);
