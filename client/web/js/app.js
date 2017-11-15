console.log("Welcome to OHDSI Side Effect Incidence Rate Application!");

angular.module("ohdsiInformerApp",
    ["ui.router", "ngAnimate", "ui.bootstrap", "services", "directives", "controllers"])

.config(function ($stateProvider) {
    var appState = {
        name: 'app',
        url: '',
        templateUrl: 'templates/app.html',
        controller: 'AppCtrl'
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
        controller: 'ConditionsByDrugCtrl'
    };
    var irListState = {
        name: 'app.drug_condition',
        url: '/{drugConceptId}/{conditionConceptId}',
        templateUrl: 'templates/irList.html',
        controller: 'IrListCtrl'
    };
    $stateProvider.state(appState);
    $stateProvider.state(homeState);
    $stateProvider.state(conditionsByDrugState);
    $stateProvider.state(irListState);
});
