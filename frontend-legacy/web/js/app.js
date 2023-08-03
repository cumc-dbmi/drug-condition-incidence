console.log("Welcome to OHDSI Side Effect Incidence Rate Application!");

angular.module("ohdsiInformerApp",
    ["ui.router", "ngAnimate", "ui.bootstrap", "services", "directives", "controllers"])

.config(function ($stateProvider) {
    var appState = {
        name: 'app',
        url: '',
        templateUrl: 'templates/app.html',
        controller: 'AppCtrl',
        resolve: {
            drugList: ['ohdsiService',
                function(ohdsiService) {
                    return ohdsiService.getDrugList();
                }]
        }
    };
    var homeState = {
        name: 'app.home',
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
    };
    var conditionsByDrugState = {
        name: 'app.drug',
        url: '/{drugConceptId}',
        templateUrl: 'templates/conditionsByDrug.html',
        controller: 'ConditionsByDrugCtrl',
        resolve: {
            // splicer
            conditionList: ['$stateParams', 'ohdsiService',
                function($stateParams, ohdsiService) {
                    return ohdsiService.getEvidence($stateParams.drugConceptId);
                }
            ],
            treatment: ['$stateParams', 'drugList',
                function($stateParams, drugList) {
                    var drugFilter = function(drug) { return drug.drug_concept_id == $stateParams.drugConceptId; };
                    return drugList.find(drugFilter);
                }
            ]
        }
    };
    // TODO consider nesting state; inherited resolved dependencies (i.e. conditionList) could be overwritten
    var irListState = {
        name: 'app.drug_condition',
        url: '/{drugConceptId}/{conditionConceptId}',
        templateUrl: 'templates/irList.html',
        controller: 'IrListCtrl',
        resolve: {
            // incidence results
            conditionList: ['$stateParams', 'ohdsiService',
                function($stateParams, ohdsiService) {
                    return ohdsiService.getConditionList($stateParams.drugConceptId);
                }
            ],
            // duplicate from above
            treatment: ['$stateParams', 'drugList',
                function($stateParams, drugList) {
                    var drugFilter = function(drug) { return drug.drug_concept_id == $stateParams.drugConceptId; };
                    return drugList.find(drugFilter);
                }
            ],
            outcome: ['$stateParams', 'conditionList',
                function($stateParams, conditionList) {
                    var outcomeFilter = function(outcome) {
                        return outcome.outcome_concept_id == $stateParams.conditionConceptId;
                    };
                    return conditionList.find(outcomeFilter);
                }
            ]
        }
    };
    $stateProvider.state(appState);
    $stateProvider.state(homeState);
    $stateProvider.state(conditionsByDrugState);
    $stateProvider.state(irListState);
});
