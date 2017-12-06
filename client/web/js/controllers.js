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

            $scope.reloadPage = function() {
                window.location = window.location.href.split("#")[0];
            };

            $scope.clear = function () {
                // We use an object as the model to enable access by child states. When used, the dot
                // (i.e. in appModel.treatment) distinguishes the model as belonging to parent state.
                // See https://stackoverflow.com/a/27699798
                $scope.appModel = {treatment: null, outcome: null, conditionList: null, drugList: null};
                $scope.patFilter = "";
                $scope.evidence = [];
                $scope.incidenceRate = [];
                $scope.incidenceRateSource = [];
            };

            $scope.clear();

            ohdsiService.getDrugList().then(function (data) {
               $scope.appModel.drugList = data;
           });

            if($state.current.name == 'app') {
                $state.go('app.home');
            }
        }
    ])

    .controller('HomeCtrl', ['$scope', 'ohdsiService', '$timeout', '$http', '$state', 'vocabularyService',
        function ($scope, ohdsiService, $timeout, $http, $state, vocabularyService) {
            console.log('home');

            $scope.selectDrug = function(item, model, label) {
                ohdsiService.getConditionList($scope.appModel.treatment.drug_concept_id).then(function (data) {
                        $scope.appModel.conditionList = data;
                    });
            };
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

            if (!$scope.appModel.treatment) {
                var drugFilter = function(drug) { return drug.drug_concept_id = $state.params.drugConceptId; };
                $scope.appModel.treatment = $scope.appModel.drugList.find(drugFilter);
            }

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

            var MarkerSymbol = 'square';
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
                        height: 230,
                        marginRight: 100,
                        marginLeft: 100,
                        zoomType: 'x',
                        borderColor: '#f39c12',
                        borderWidth: 2
                    },
                    title: {
                        text: 'Incidence Proportion'
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
                        max: 1,
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
                            text: [$scope.outcome.CONCEPT_NAME]
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

            var p2 = vocabularyService.concept($state.params.conditionConceptId).then(function(data){
                $scope.outcome = data;
            });


            if (!$scope.appModel.treatment) {
                var drugFilter = function(drug) { return drug.drug_concept_id = $state.params.drugConceptId; };
                $scope.appModel.treatment = $scope.appModel.drugList.find(drugFilter);
            }

            if (!$scope.appModel.outcome) {
                var drugFilter = function(drug) { return drug.drug_concept_id = $state.params.drugConceptId; };
                $scope.appModel.outcome = $scope.appModel.find(drugFilter);
                ohdsiService.getConditionList($scope.appModel.treatment.drug_concept_id).then(function (data) {
                    $scope.appModel.conditionList = data;
                });
            }

            var ps = [p1, p2];

            // Get incidence rates after treatment and outcome have resolved
            $q.all(ps).then(function(){
                ohdsiService.getIncidentRate($scope.appModel.treatment.CONCEPT_ID, $scope.outcome.CONCEPT_ID, $scope.timeAtRisk)
                            .then(onGetIncidentRate)
            })

        }]);