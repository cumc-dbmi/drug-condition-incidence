const drugs = require('./drugs.json');
const drugConditions = require('./drug-conditions-974166.json');
const drugConditionDetail = require('./drug-conditions-974144-details-44784217.json');
const demo = require('./demo.json');

module.exports = () => ({
  drugs: drugs,
  'drug-conditions': drugConditions,
  'drug-condition-details': drugConditionDetail,
  demo: demo,
});
