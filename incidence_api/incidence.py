import decimal
import json

from flask import Flask, request, Response
from flask_cors import CORS

from db import drug_condition, incidence_rate, incidence_rate_source_details

app = Flask(__name__)
CORS(app)
APPLICATION_JSON_CONTENT_TYPE = 'application/json'


def serialize_obj(obj):
    if isinstance(obj, decimal.Decimal):
        return str(round(obj, 4))
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)


@app.route("/drug_condition", methods=['GET'])
def drug_condition_endpoint():
    concept_id = request.args.get('drug_concept_id', type=int)
    results = drug_condition(concept_id)
    response_body = json.dumps(results)
    return Response(response_body, mimetype=APPLICATION_JSON_CONTENT_TYPE)


@app.route("/incidence_rate", methods=['GET'])
def incidence_rate_endpoint():
    drug_concept_id = request.args.get('drug_concept_id', type=int)
    outcome_concept_id = request.args.get('outcome_concept_id', type=int)
    time_at_risk_id = request.args.get('time_at_risk_id', type=int)
    incidence_rate_results = incidence_rate(drug_concept_id, outcome_concept_id, time_at_risk_id)
    incidence_rate_results['source_details'] = incidence_rate_source_details(drug_concept_id,
                                                                             outcome_concept_id,
                                                                             time_at_risk_id)
    response_body = json.dumps(incidence_rate_results, default=serialize_obj)
    return Response(response_body, mimetype=APPLICATION_JSON_CONTENT_TYPE)


@app.route("/incidence_rate_source_details", methods=['GET'])
def incidence_rate_source_endpoint():
    drug_concept_id = request.args.get('drug_concept_id', type=int)
    outcome_concept_id = request.args.get('outcome_concept_id', type=int)
    time_at_risk_id = request.args.get('time_at_risk_id', type=int)
    results = incidence_rate_source_details(drug_concept_id, outcome_concept_id, time_at_risk_id)
    response_body = json.dumps(results, default=serialize_obj)
    return Response(response_body, mimetype=APPLICATION_JSON_CONTENT_TYPE)


if __name__ == "__main__":
    app.run()
