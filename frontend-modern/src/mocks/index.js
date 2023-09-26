var drugs = require('./drugs.json');
var drugConditions = require( './drug-conditions-974166.json');
var drugConditionDetail = require ('./drug-conditions-974144-details-44784217.json');

module.exports = () => {
    return {
        drugs,
        "drug-conditions-974166": drugConditions,
        "drug-conditions-974144-details-44784217": drugConditionDetail
    };
};
