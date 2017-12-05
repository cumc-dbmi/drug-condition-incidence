angular.module('services', ['config'])
    .service('ohdsiService', ['$http', '$q', 'ApiBaseUrl', function ($http, $q, ApiBaseUrl) {
        var self = this;

        self.getIncidentRate = function (targetId, outcomeId, timeAtRisk) {
            var deferred = $q.defer();
            var url = ApiBaseUrl + "/incidence_rate?"
                + 'drug_concept_id=' + targetId
                + '&outcome_concept_id=' + outcomeId
                + '&time_at_risk_id=' + timeAtRisk;
            $http.get(url)
                .then(function (resp) {
                    deferred.resolve(resp.data);
                }, function (err) {
                    console.log(err);
                });
            return deferred.promise;
        };

        self.getIncidentRateSource = function (targetId, outcomeId, timeAtRisk) {
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
                    console.log(err);
                });
            return deferred.promise;
        };

        var drugCache = {};

        self.getEvidence = function (drugConceptId) {
            var deferred = $q.defer();
            var url = ApiBaseUrl + "/drug_condition?"
                + 'drug_concept_id=' + drugConceptId;
            if (drugCache.hasOwnProperty(drugConceptId)) {
                deferred.resolve(drugCache[drugConceptId]);
            } else {
                $http.get(url)
                    .then(function (resp) {
                        drugCache[drugConceptId] = resp.data;
                        deferred.resolve(resp.data);
                    }, function (err) {
                        console.log(err);
                    });
            }
            return deferred.promise;
        };

        self.getDrugList = function () {
            var deferred = $q.defer();
            var url = ApiBaseUrl + "/drug_list";
            $http.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    console.log(err);
                });
            return deferred.promise;
        };

        self.getConditionList = function (drugConceptId) {
            var deferred = $q.defer();
            var url = ApiBaseUrl + "/condition_list?"
                + 'drug_concept_id=' + drugConceptId;
            $http.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    console.log(err);
                });
            return deferred.promise;
        };
    }])


    .service('vocabularyService', ['$http', '$q', 'VocabBaseUrl', function ($http, $q, VocabBaseUrl) {
        var self = this;
        var searchCache = {};

        self.search = function (searchData) {
            var deferred = $q.defer();
            var key = JSON.stringify(searchData);
            if (searchCache.hasOwnProperty(key)){
                deferred.resolve(searchCache[key]);
            } else {
                $http.post(VocabBaseUrl + '/search', searchData)
                .then(function (response) {
                    deferred.resolve(response.data);
                });
            }
            return deferred.promise;
        };

        var conceptCache = {};

        self.concept = function (conceptId) {
            var deferred = $q.defer();
            if (conceptCache.hasOwnProperty(conceptId)){
                deferred.resolve(conceptCache[conceptId]);
            } else {
                $http.get(VocabBaseUrl + '/concept/' + conceptId)
                .then(function (response) {
                    conceptCache[conceptId] = response.data;
                    deferred.resolve(response.data);
                });
            }
            return deferred.promise;
        };

        self.relatedConcepts = function (data) {
            return $http.post(VocabBaseUrl + '/relatedconcepts', data)
                .then(function (response) {
                    return response.data;
                });
        };

    }]);

