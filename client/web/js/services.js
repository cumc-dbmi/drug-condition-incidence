angular.module('services', [])
    .service('ohdsiService', ['$http', '$q', function ($http, $q) {
        var self = this;
        var baseUrl = "http://localhost:5000";

        this.getIncidentRate = function (targetId, outcomeId, timeAtRisk) {
            var deferred = $q.defer();
            var url = baseUrl + "/incidence_rate?"
                + 'drug_concept_id=' + targetId
                + '&outcome_concept_id=' + outcomeId
                + '&time_at_risk_id=' + timeAtRisk;
            $http.get(url)
                .then(function (resp) {
                    deferred.resolve(resp.data);
                }, function (err) {
                });
            return deferred.promise;
        };

        this.getIncidentRateSource = function (targetId, outcomeId, timeAtRisk) {
            var deferred = $q.defer();
            var res = [];
            var url = baseUrl + "/incidence_rate_source?"
                + 'drug_concept_id=' + targetId
                + '&outcome_concept_id=' + outcomeId
                + '&time_at_risk_id=' + timeAtRisk;
            $http.get(url)
                .then(function (resp) {
                    //console.log(resp);
                    if (resp.data && resp.data.length > 0) {
                        for (var i = 0; i < resp.data.length; i++) {
                            var item = resp.data[i];
                            res.push(item);
                        }
                    }
                    deferred.resolve(res);
                }, function (err) {
                });
            return deferred.promise;
        };

         this.getEvidence = function (targetId) {
            var deferred = $q.defer();
            var url = baseUrl + "/drug_condition?"
                + 'drug_concept_id=' + targetId
            $http.get(url)
                .then(function (resp) {
                    deferred.resolve(resp.data);
                }, function (err) {
                });
            return deferred.promise;
        };
    }]);
