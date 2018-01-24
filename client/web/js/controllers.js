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

    .filter('timeAtRiskFilter', function() {
        return function(items, checkModel) {
            var filtered = [];

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (checkModel.day && checkModel.yes && item.time_at_risk_id == 1 && item.requires_full_time_at_risk == 'Yes') {
                    filtered.push(item);
                }
                if (checkModel.day && checkModel.no && item.time_at_risk_id == 1 && item.requires_full_time_at_risk == 'No') {
                    filtered.push(item);
                }
                if (checkModel.month && checkModel.yes && item.time_at_risk_id == 30 && item.requires_full_time_at_risk == 'Yes') {
                    filtered.push(item);
                }
                if (checkModel.month && checkModel.no && item.time_at_risk_id == 30 && item.requires_full_time_at_risk == 'No') {
                    filtered.push(item);
                }
                if (checkModel.year && checkModel.yes && item.time_at_risk_id == 365 && item.requires_full_time_at_risk == 'Yes') {
                    filtered.push(item);
                }
                if (checkModel.year && checkModel.no && item.time_at_risk_id == 365 && item.requires_full_time_at_risk == 'No') {
                    filtered.push(item);
                }
                if (checkModel.all && checkModel.yes && item.time_at_risk_id == 9999 && item.requires_full_time_at_risk == 'Yes') {
                    filtered.push(item);
                }
                if (checkModel.all && checkModel.no && item.time_at_risk_id == 9999 && item.requires_full_time_at_risk == 'No') {
                    filtered.push(item);
                }
            }

            return filtered;
        }
    })

    .controller('AppCtrl', ['$scope', '$state', 'drugList',
        function($scope, $state, drugList){
            console.log('app');

            $scope.reloadPage = function() {
                window.location = window.location.href.split("#")[0];
            };

            $scope.clear = function () {
                // We use an object as the model to enable access by child states. When used, the dot
                // (i.e. in appModel.treatment) distinguishes the model as belonging to parent state.
                // See https://stackoverflow.com/a/27699798
                $scope.appModel = {treatment: null, outcome: null, conditionList: null, drugList: drugList};
            };

            $scope.clear();

            if($state.current.name == 'app') {
                $state.go('app.home');
            }
        }
    ])

    .controller('HomeCtrl', ['$scope', 'ohdsiService',
        function ($scope, ohdsiService) {
            console.log('home');

            $scope.selectDrug = function(item, model, label) {
                ohdsiService.getConditionList($scope.appModel.treatment.drug_concept_id).then(function (data) {
                        $scope.appModel.conditionList = data;
                    });
            };

            // user may be coming back from splicer view
            // this ensures same experience on this view
            if ($scope.appModel.treatment) {
                ohdsiService.getConditionList($scope.appModel.treatment.drug_concept_id).then(function (data) {
                        $scope.appModel.conditionList = data;
                    });
            }
        }])

    .controller('ConditionsByDrugCtrl', ['$scope', 'treatment', 'conditionList',
        function ($scope, treatment, conditionList) {
            $scope.appModel.treatment = treatment;
            $scope.appModel.conditionList = conditionList;
            $scope.evidence = conditionList;
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
        }])

    .controller('IrListCtrl', ['$scope', 'ohdsiService', 'treatment', 'outcome', '$filter',
        function ($scope, ohdsiService, treatment, outcome, $filter) {
            console.log('IrListCtrl');
            $scope.appModel.treatment = treatment;
            $scope.appModel.outcome = outcome;
            $scope.incidenceRate = [];
            $scope.incidenceRateSource = [];
            $scope.incidenceRateSourceFiltered = [];
            $scope.timeAtRisk = 365;
            $scope.formatDecimal = function (d) {
                return Math.round(+d * 1000) / 1000;
            };

            $scope.checkModel = {
                 day: false,
                 month: false,
                 year: true,
                 all: false,
                 yes: true,
                 no: true
              };

            $scope.chartOptions = function() {
                return chartOptions;
            };

            var MarkerSymbol = 'square';
            var chartOptions = null;

            var roundNumber = function (n) {
                return Math.round(n * 100) / 100;
            };

            var onGetIncidentRate = function (success) {
                $scope.incidenceRate = success;
                $scope.incidenceRateSource = success['source_details'];
                $scope.incidenceRateSourceFiltered = $filter('timeAtRiskFilter')($scope.incidenceRateSource, $scope.checkModel);

                var proportionsData = [];
                $.each($scope.incidenceRateSourceFiltered, function (index, value) {
                    var series = {
                        data: [[roundNumber(value.incidence_proportion * 100), 1]],
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
                        height: 230,
                        marginRight: 100,
                        marginLeft: 100,
                        zoomType: 'x',
                        borderColor: '#f39c12',
                        borderWidth: 2
                    },
                    title: {
                        text: 'Incidence'
                    },
                    subtitle: {
                        text: document.ontouchstart === undefined ?
                            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                    },
                    xAxis: {
                        title: {
                            enabled: true,
                            text: 'Percentage (%)'
                        },
                        min: 0,
                        max: 100,
                        gridLineColor: 'rgb(204, 214, 235)',
                        gridLineWidth: 1,
                        plotLines: [{
                            value: roundNumber($scope.incidenceRate.incidence_proportion_range_high * 100),
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
                                value: roundNumber($scope.incidenceRate.incidence_proportion_range_low * 100),
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
                            text: [$scope.appModel.outcome.outcome_concept_name]
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

            ohdsiService.getIncidentRate(treatment.drug_concept_id, outcome.outcome_concept_id, $scope.timeAtRisk)
                        .then(onGetIncidentRate)

        }]);