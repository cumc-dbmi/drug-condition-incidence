angular.module('services', ['config'])
    .service('ohdsiService', ['$http', '$q', 'ApiBaseUrl', function ($http, $q, ApiBaseUrl) {
        var self = this;

        this.getIncidentRate = function (targetId, outcomeId, timeAtRisk) {
            var deferred = $q.defer();
            var url = ApiBaseUrl + "/incidence_rate?"
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
            var url = ApiBaseUrl + "/incidence_rate_source?"
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
            var url = ApiBaseUrl + "/drug_condition?"
                + 'drug_concept_id=' + targetId
            $http.get(url)
                .then(function (resp) {
                    deferred.resolve(resp.data);
                }, function (err) {
                });
            return deferred.promise;
        };
    }]);
