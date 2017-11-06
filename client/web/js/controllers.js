angular.module('controllers', ['config'])

// Directive for range horizontal bar chart, pass in chart options
    .directive('hcChart', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
                options: '='
            },
            link: function (scope, element) {
                Highcharts.chart(element[0], scope.options);
            }
        };
    })

    .controller('ohdsiInformerCtrl', ['$scope', 'ohdsiService', '$timeout', '$http', '$location', 'VocabBaseUrl',
        function ($scope, ohdsiService, $timeout, $http, $location, VocabBaseUrl) {
            var MarkerSymbol = 'square';

            $scope.chartOptions = function () {
                return chartOptions;
            };
            var chartOptions = null;

            $scope.chartOptionsZoom = function () {
                return chartOptionsZoom;
            };
            var chartOptionsZoom = null;

            $scope.view = "main";

            $scope.timeAtRisk = 365;
            //$scope.outcome = {name: 'Mass of skin', code: '4183953'};
            //$scope.treatment = {name: 'Simvastatin', code: '1539403'};
            $scope.comparator = {};
            $scope.patient = {
                id: 1
            };

            $scope.comparators = [];

            $scope.evidence = [];

            $scope.setView = function (v) {
                $scope.view = v;
            };

            $scope.reloadPage = function(){
                location.reload();
            }

            $scope.clear = function () {
                $scope.outcome = {};
                $scope.treatment = {};
                $scope.comparator = {};
                $scope.comparators = [];
                $scope.patFilter = "";
                $scope.evidence = [];
                $scope.incidenceRate = [];
                $scope.incidenceRateSource = [];
            };

            $scope.formatDecimal = function (d) {
                return Math.round(+d * 1000) / 1000;
            };
            //var chartWidth= $("#rangechart").width();
            var roundNumber = function (n) {
                return Math.round(n * 10000) / 10000;
            };

            var onGetIncidentRate = function (success) {
                $scope.incidenceRate = success;
                $scope.incidenceRateSource = success['source_details'];

                var proportionsData = [];
                $.each($scope.incidenceRateSource, function (index, value) {
                    var series = {
                        data: [[roundNumber(value.incidence_proportion), 1]],
                        name: value.source_short_name,
                        marker: {
                            symbol: MarkerSymbol
                        }
                    };
                    proportionsData.push(series);
                });

                chartOptions =
                    {
                        chart: {
                            type: 'scatter',
                            width: 900,
                            height: 220,
                            marginRight: 100,
                            marginLeft: 100,
                            zoomType: 'x'
                            //borderColor: '#f39c12',
                            //borderWidth: 2
                        },
                        title: {
                            text: 'Incidence Proportion'
                        },
                        subtitle: {
                            text: 'Risk of ' + $scope.outcome.name + ' with ' + $scope.treatment.name
                        },
                        xAxis: {
                            title: {
                                enabled: true,
                                text: 'Incidence Proportion'
                            },
                            min: 0,
                            max: 1,
                            tickInterval: 0.1,
                            gridLineColor: 'rgb(204, 214, 235)',
                            gridLineWidth: 1,
                            plotLines: [{
                                value: roundNumber($scope.incidenceRate.incidence_proportion_range_high),
                                color: 'red',
                                width: 2,
                                dashStyle: 'shortdot',
                                label: {
                                    text: 'high',
                                    align: 'center',
                                    rotation: 0
                                }
                            },
                            {
                                value: roundNumber($scope.incidenceRate.incidence_proportion_range_low),
                                color: 'red',
                                width: 2,
                                dashStyle: 'shortdot',
                                label: {
                                    text: 'low',
                                    align: 'center',
                                    rotation: 0
                                }
                            }]
                        },
                        yAxis: {
                            title: {
                                text: [$scope.outcome.name]
                            },
                            visible: false
                        },
                        legend: {
                            enabled: false
                        },
                        plotOptions: {
                            scatter: {
                                marker: {
                                    radius: 5,
                                    states: {
                                        hover: {
                                            enabled: true,
                                            lineColor: 'rgb(100,100,100)'
                                        }
                                    }
                                },
                                states: {
                                    hover: {
                                        marker: {
                                            enabled: false
                                        }
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<b>{series.name}</b><br>',
                                    pointFormat: '{point.x}'
                                }
                            }
                        },
                        series: proportionsData
                    };

                chartOptionsZoom =
                    {
                        chart: {
                            type: 'scatter',
                            width: 900,
                            height: 200,
                            marginRight: 100,
                            marginLeft: 100,
                            zoomType: 'x'
                            //borderColor: '#f39c12',
                            //borderWidth: 2
                        },
                        title: {
                            text: ''
                        },
                        subtitle: {
                            text: document.ontouchstart === undefined ?
                            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                        },
                        xAxis: {
                            title: {
                                enabled: true,
                                text: 'Incidence Proportion'
                            },
                            min: 0,
                            //max: 1,
                            //tickInterval: 0.1,
                            gridLineColor: 'rgb(204, 214, 235)',
                            gridLineWidth: 1,
                            plotLines: [{
                                value: roundNumber($scope.incidenceRate.incidence_proportion_range_high),
                                color: 'red',
                                width: 2,
                                dashStyle: 'shortdot',
                                label: {
                                    text: 'high',
                                    align: 'center',
                                    rotation: 0
                                }
                            },
                            {
                                value: roundNumber($scope.incidenceRate.incidence_proportion_range_low),
                                color: 'red',
                                width: 2,
                                dashStyle: 'shortdot',
                                label: {
                                    text: 'low',
                                    align: 'center',
                                    rotation: 0
                                }
                            }]
                        },
                        yAxis: {
                            title: {
                                text: [$scope.outcome.name]
                            },
                            visible: false
                        },
                        legend: {
                            enabled: false
                        },
                        plotOptions: {
                            scatter: {
                                marker: {
                                    radius: 5,
                                    states: {
                                        hover: {
                                            enabled: true,
                                            lineColor: 'rgb(100,100,100)'
                                        }
                                    }
                                },
                                states: {
                                    hover: {
                                        marker: {
                                            enabled: false
                                        }
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<b>{series.name}</b><br>',
                                    pointFormat: '{point.x}'
                                }
                            }
                        },
                        series: proportionsData
                    };

            };

            $scope.callShowTable = function (condition) {
                $scope.setOutcome (condition.condition, condition.condition_concept_id);
                $scope.showTable();
            }

            $scope.showTable = function (treatment, outcome, timeAtRisk) {
                $scope.setView('table');
                $scope.incidenceRate = [];
                $scope.incidenceRateSource = [];

                var obj = {};
                obj.CONCEPT_ID = [];
                obj.CONCEPT_ID.push(parseInt($scope.treatment.code, 10));
                obj.VOCABULARY_ID = ["RxNorm"];
                //obj.CONCEPT_CLASS_ID = ["Ingredient"];
                obj.CONCEPT_CLASS_ID = ['Clinical Drug', 'Quant Branded Drug', 'Branded Drug'];

                $.ajax({
                    url: VocabBaseUrl + "/relatedconcepts",
                    dataType: "json",
                    type: "POST",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        ohdsiService.getIncidentRate($scope.treatment.code, $scope.outcome.code, $scope.timeAtRisk)
                            .then(onGetIncidentRate)
                    },
                    error: function () {
                        ohdsiService.getIncidentRate($scope.treatment.code, $scope.outcome.code, $scope.timeAtRisk)
                            .then(onGetIncidentRate)
                    }
                });
            };

             $scope.showCondition = function (treatment) {
                 $scope.setView('condition');
                 $scope.evidence = [];
                 $scope.outcome = {};

                 ohdsiService.getEvidence($scope.treatment.code)
                     .then(function (success) {
                         $scope.evidence = success;
                     }, function (error) {
                     })

                 $scope.pagesShown = 1;
                 $scope.pageSize = 100; // load 100 items at once
                 $scope.currentCounter = 100;
                 $scope.itemsLimit = $scope.pageSize * $scope.pagesShown;

                 $scope.loadMoreItems = function () {
                     $scope.pagesShown++;
                     $scope.itemsLimit = $scope.pageSize * $scope.pagesShown;

                     if ($scope.evidence.length > $scope.itemsLimit) {
                         $scope.currentCounter = $scope.itemsLimit;
                     } else if ($scope.evidence.length < $scope.itemsLimit){
                         $scope.currentCounter = $scope.evidence.length;
                     }

                 };
             };

            $scope.medicationClicked = function (item) {
                $scope.treatment.name = item.resource.medicationCodeableConcept.coding[0].display;
                $scope.treatment.code = item.resource.medicationCodeableConcept.coding[0].code;
                $scope.treatment.system = item.resource.medicationCodeableConcept.coding[0].system;
                $scope.patFilter = "";
                $scope.lookupComparator();
                $("#outcomeName").focus();
            };

            $scope.conditionClicked = function (item) {
                $scope.outcome.name = item.resource.code.coding[0].display;
                $scope.outcome.code = item.resource.code.coding[0].code;
                $scope.outcome.system = item.resource.code.coding[0].system;
                $scope.patFilter = "";
                $scope.lookupComparator();
            };

            $scope.setTreatment = function (name, code) {
                $scope.treatment.name = name;
                $scope.treatment.code = code;
            };

            $scope.setOutcome = function (name, code) {
                $scope.outcome.name = name;
                $scope.outcome.code = code;
            };

            $scope.lookupComparator = function () {
                if ($scope.treatment.code && $scope.treatment.code.length > 0) {
                    var obj = {};
                    obj.CONCEPT_ID = [];
                    obj.CONCEPT_ID.push(parseInt($scope.treatment.code, 10));
                    obj.VOCABULARY_ID = ["ATC"];
                    obj.CONCEPT_CLASS_ID = ["ATC 3rd", "ATC 4th", "ATC 2nd"];
                    $.ajax({
                        url: VocabBaseUrl + "/relatedconcepts",
                        dataType: "json",
                        type: "POST",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            $scope.comparators = data;
                            try {
                                $scope.$apply();
                            } catch (e) {
                                console.log(e);
                            }

                        }
                    });
                }
            };

            $("#treatmentName").autocomplete({
                source: function (request, response) {
                    var obj = {};
                    obj.QUERY = request.term;
                    obj.VOCABULARY_ID = ["RxNorm"];
                    obj.CONCEPT_CLASS_ID = ['Ingredient', 'Brand Name'];
                    //obj.CONCEPT_CLASS_ID = ['Clinical Drug', 'Quant Branded Drug', 'Branded Drug'];

                    $.ajax({

                        url: VocabBaseUrl + "/search/",
                        dataType: "json",
                        type: "POST",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            var res = data.map(function (d) {
                                var obj = {};
                                obj.label = d.CONCEPT_NAME;
                                obj.value = d.CONCEPT_ID + "";
                                return obj;
                            });
                            response(res);
                        }
                    });
                },
                minLength: 5,
                select: function (event, ui) {
                    $('#treatmentName').val(ui.item.label);
                    $scope.setTreatment(ui.item.label, ui.item.value);
                    try {
                        $scope.$apply();
                    } catch (e) {
                        console.log(e);
                    }
                    $scope.lookupComparator();
                    $("#outcomeName").focus();
                    return false;
                }
            });

            $("#outcomeName").autocomplete({
                source: function (request, response) {
                    var obj = {};
                    obj.QUERY = request.term;
                    obj.VOCABULARY_ID = ["SNOMED"];
                    obj.CONCEPT_CLASS_ID = ["Clinical Finding"];

                    $.ajax({
                        url: VocabBaseUrl + "/search/",
                        dataType: "json",
                        type: "POST",
                        data: JSON.stringify(obj),
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            var res = data.map(function (d) {
                                var obj = {};
                                obj.label = d.CONCEPT_NAME;
                                obj.value = d.CONCEPT_ID + "";
                                return obj;
                            });
                            response(res);
                        }
                    });
                },
                minLength: 5,
                select: function (event, ui) {
                    $('#outcomeName').val(ui.item.label);
                    $scope.setOutcome(ui.item.label, ui.item.value);
                    try {
                        $scope.$apply();
                    } catch (e) {
                        console.log(e);
                    }
                    $scope.lookupComparator();
                    return false;
                }
            });
        }]);