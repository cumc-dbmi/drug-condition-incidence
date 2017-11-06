angular.module('controllers', [])

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

    .controller('AppCtrl', ['$scope', '$state',
        function($scope, $state){
            console.log('app');
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

            $scope.setTreatment = function (name, code) {
                $scope.treatment.name = name;
                $scope.treatment.code = code;
            };

            $scope.setOutcome = function (name, code) {
                $scope.outcome.name = name;
                $scope.outcome.code = code;
            };

            $scope.clear();

            if($state.current.name == 'app') {
                $state.go('app.home');
            }
        }
    ])

    .controller('HomeCtrl', ['$scope', 'ohdsiService', '$timeout', '$http', '$state', 'vocabularyService',
        function ($scope, ohdsiService, $timeout, $http, $state, vocabularyService) {
            console.log('home');

            $scope.lookupComparator = function () {
                if ($scope.treatment.code && $scope.treatment.code.length > 0) {
                    var conditionConceptId = parseInt($scope.treatment.code);
                    var data = {
                        CONCEPT_ID: [conditionConceptId],
                        VOCABULARY_ID: ["ATC"],
                        CONCEPT_CLASS_ID: ["ATC 3rd", "ATC 4th", "ATC 2nd"]
                    };
                    //vocabularyService.relatedConcepts(data);
                }
            };

            $("#treatmentName").autocomplete({
                source: function (request, response) {
                    var data = {
                        QUERY: request.term,
                        VOCABULARY_ID: ['RxNorm'],
                        CONCEPT_CLASS_ID: ['Ingredient', 'Brand Name']
                    };
                    vocabularyService.search(data).then(response);
                },
                minLength: 5,
                select: function (event, ui) {
                    $('#treatmentName').val(ui.item.label);
                    $scope.setTreatment(ui.item.label, ui.item.value);
                    $scope.lookupComparator();
                    $("#outcomeName").focus();
                    return false;
                }
            });

            $("#outcomeName").autocomplete({
                source: function (request, response) {
                    var data = {
                        QUERY: request.term,
                        VOCABULARY_ID: ['SNOMED'],
                        CONCEPT_CLASS_ID: ['Clinical Finding']
                    };
                    vocabularyService.search(data).then(response);
                },
                minLength: 5,
                select: function (event, ui) {
                    $('#outcomeName').val(ui.item.label);
                    $scope.setOutcome(ui.item.label, ui.item.value);
                    $scope.lookupComparator();
                    return false;
                }
            });
        }])


    .controller('ConditionsByDrugCtrl', ['$scope', 'ohdsiService', '$timeout', '$http', '$state', 'vocabularyService',
        function ($scope, ohdsiService, $timeout, $http, $state, vocabularyService) {
            $scope.pagesShown = 1;
            $scope.pageSize = 100; // load 100 items at once
            $scope.currentCounter = 100;
            $scope.itemsLimit = $scope.pageSize * $scope.pagesShown;
            $scope.loadMoreItems = function () {
                $scope.pagesShown++;
                $scope.itemsLimit = $scope.pageSize * $scope.pagesShown;

                if ($scope.evidence.length > $scope.itemsLimit) {
                    $scope.currentCounter = $scope.itemsLimit;
                } else if ($scope.evidence.length < $scope.itemsLimit) {
                    $scope.currentCounter = $scope.evidence.length;
                }
            };

            vocabularyService.concept($state.params.drugConceptId).then(function(data){
                $scope.setTreatment(data.CONCEPT_NAME, data.CONCEPT_ID);
            });

            ohdsiService.getEvidence($state.params.drugConceptId).then(function(data) {
                $scope.evidence = data;
            });
        }])

    .controller('IrListCtrl', ['$scope', 'ohdsiService', '$timeout', '$http', '$state', '$q', 'vocabularyService',
        function ($scope, ohdsiService, $timeout, $http, $state, $q, vocabularyService) {
            console.log('IrListCtrl');
            $scope.incidenceRate = [];
            $scope.incidenceRateSource = [];
            $scope.timeAtRisk = 365;
            $scope.formatDecimal = function (d) {
                return Math.round(+d * 1000) / 1000;
            };
            $scope.chartOptions = function() {
                return chartOptions;
            };
            $scope.chartOptionsZoom = function () {
                return chartOptionsZoom;
            };

            var MarkerSymbol = 'square';
            var chartOptionsZoom = null;
            var chartOptions = null;

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

                chartOptions = {
                    chart: {
                        type: 'scatter',
                        width: 900,
                        height: 220,
                        marginRight: 100,
                        marginLeft: 100
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

            var p1 = vocabularyService.concept($state.params.drugConceptId).then(function(data){
                $scope.setTreatment(data.CONCEPT_NAME, data.CONCEPT_ID);
            });
            var p2 = vocabularyService.concept($state.params.conditionConceptId).then(function(data){
                $scope.setOutcome(data.CONCEPT_NAME, data.CONCEPT_ID);
            });
            var ps = [p1, p2];

            // Get incidence rates after treatment and outcome have resolved
            $q.all(ps).then(function(){
                ohdsiService.getIncidentRate($scope.treatment.code, $scope.outcome.code, $scope.timeAtRisk)
                            .then(onGetIncidentRate)
            })

        }]);