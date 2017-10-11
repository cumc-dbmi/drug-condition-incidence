import decimal
from flask import Flask, request, Response
from flask_cors import CORS
from sqlalchemy import create_engine
import json
import settings

app = Flask(__name__)
CORS(app)
engine = create_engine(settings.conn_str)


def serialize_obj(obj):
    if isinstance(obj, decimal.Decimal):
        return str(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)


APPLICATION_JSON_CONTENT_TYPE = 'application/json'
DRUG_CONDITION_QUERY = """
SELECT DISTINCT condition_concept_id, 
  condition 
FROM [incidence_rate].[dbo].[drug_condition_filtered] 
WHERE ingredient_concept_id IN (%s)"""

INCIDENCE_RATE_QUERY_OLD = """
SELECT DISTINCT c.concept_name, 
  num_persons_prior_outcome, 
  num_persons_at_risk, 
  num_persons_post_365d,
pt_365d,ip_365d, ir_365d
FROM [ohdsi_west_pending].[results].[IR_exposure_outcome_summary] s
JOIN [ohdsi_west_pending].[results].[IR_cohort_definition] d 
  ON s.outcome_cohort_definition_id = d.cohort_definition_id
JOIN [ohdsi_west_pending].[dbo].[concept] c 
  ON d.concept_id = c.concept_id
WHERE s.ip_365d IS NOT NULL 
AND s.target_cohort_definition_id = (%s)
ORDER BY s.ip_365d desc"""

INCIDENCE_RATE_QUERY = """
SELECT TOP 1 
  incidence_proportion_range_low, 
  incidence_proportion_range_high 
FROM [incidence_rate].[dbo].[IR_all_exposure_outcome_summary_overall]
WHERE drug_concept_id = %(drug_concept_id)s 
AND outcome_concept_id = %(outcome_concept_id)s  
AND time_at_risk_id = %(time_at_risk_id)s"""

INCIDENCE_RATE_SOURCE_QUERY = """
SELECT source_short_name, 
  source_country, 
  incidence_proportion, 
  incidence_rate 
FROM [incidence_rate].[dbo].[IR_all_exposure_outcome_summary_full]
WHERE drug_concept_id = %(drug_concept_id)s 
AND outcome_concept_id = %(outcome_concept_id)s  
AND time_at_risk_id = %(time_at_risk_id)d"""


def drug_condition(drug_concept_ids):
    """
    Given a list of drug concept_id, return associated conditions as list of dict
    """
    drug_concept_id_params = ','.join(map(str, drug_concept_ids))
    q = DRUG_CONDITION_QUERY % drug_concept_id_params
    items = engine.execute(q)
    rows = []
    for item in items:
        row = dict(zip(item.keys(), item))
        rows.append(row)
    return rows


def incidence_rate(drug_concept_id, outcome_concept_id, time_at_risk_id):
    """
    Given a drug concept_id and condition_concept_id, return incidence_proportion_range_low and
    incidence_proportion_range_high
    """
    params = {'drug_concept_id': drug_concept_id, 'outcome_concept_id': outcome_concept_id,
              'time_at_risk_id': time_at_risk_id}
    q = INCIDENCE_RATE_QUERY % params
    items = engine.execute(q)
    for item in items:
        row = dict(zip(item.keys(), item))
        return row
    return None


def incidence_rate_source(drug_concept_id, outcome_concept_id, time_at_risk_id):
    """
    Given a drug concept_id and condition_concept_id, return incidence_proportion_range_low and
    incidence_proportion_range_high
    """
    params = {'drug_concept_id': drug_concept_id, 'outcome_concept_id': outcome_concept_id,
              'time_at_risk_id': time_at_risk_id}
    q = INCIDENCE_RATE_SOURCE_QUERY % params
    items = engine.execute(q)
    rows = []
    for item in items:
        row = dict(zip(item.keys(), item))
        rows.append(row)
    return rows


@app.route("/drug_condition", methods=['GET'])
def drug_condition_endpoint():
    concept_ids = request.args.getlist('drug_concept_ids', type=int)
    results = drug_condition(concept_ids)
    response_body = json.dumps(results)
    return Response(response_body, mimetype=APPLICATION_JSON_CONTENT_TYPE)


@app.route("/incidence_rate", methods=['GET'])
def incidence_rate_endpoint():
    drug_concept_id = request.args.get('drug_concept_id', type=int)
    outcome_concept_id = request.args.get('outcome_concept_id', type=int)
    time_at_risk_id = request.args.get('time_at_risk_id', type=int)
    results = incidence_rate(drug_concept_id, outcome_concept_id, time_at_risk_id)
    response_body = json.dumps(results, default=serialize_obj)
    return Response(response_body, mimetype=APPLICATION_JSON_CONTENT_TYPE)


@app.route("/incidence_rate_source", methods=['GET'])
def incidence_rate_source_endpoint():
    drug_concept_id = request.args.get('drug_concept_id', type=int)
    outcome_concept_id = request.args.get('outcome_concept_id', type=int)
    time_at_risk_id = request.args.get('time_at_risk_id', type=int)
    results = incidence_rate_source(drug_concept_id, outcome_concept_id, time_at_risk_id)
    response_body = json.dumps(results, default=serialize_obj)
    return Response(response_body, mimetype=APPLICATION_JSON_CONTENT_TYPE)


if __name__ == "__main__":
    app.run()
