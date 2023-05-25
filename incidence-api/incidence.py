from flask import Flask, request, Response
from flask_cors import CORS

import decimal
import json


from db import drug_condition, drug_list, condition_list, incidence_rate, incidence_rate_source_details

# Configure the logging package from the logging ini file; defined as an environment variable
#logging.config.fileConfig('/usr/app/config/logging.ini',
#                          disable_existing_loggers=False)

# Get a logger for our module
#log = logging.getLogger(__name__)


app = Flask(__name__)
cors  = CORS(app)

APPLICATION_JSON_CONTENT_TYPE = 'application/json'


def serialize_obj(obj):
    if isinstance(obj, decimal.Decimal):
        return str(round(obj, 4))
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)


@app.route("/drug_condition", methods=['GET'])
def drug_condition_endpoint():
    concept_id = request.args.get('drug_concept_id', type=int)
    results = drug_condition(concept_id)
    response_body = json.dumps(results, default=serialize_obj)
    return Response(response_body, mimetype=APPLICATION_JSON_CONTENT_TYPE)


@app.route("/drug_list", methods=['GET'])
def drug_list_endpoint():
#    log.info('GET /drug_list')
    results = drug_list()
    response_body = json.dumps(results, default=serialize_obj)
    return Response(response_body, mimetype=APPLICATION_JSON_CONTENT_TYPE)


@app.route("/condition_list", methods=['GET'])
def condition_list_endpoint():
    concept_id = request.args.get('drug_concept_id', type=int)
    results = condition_list(concept_id)
    response_body = json.dumps(results, default=serialize_obj)
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


@app.route("/ops/health", methods=['GET'])
def ops_health():
    print("Hello Health CHecker")
    return Response(json.dumps("{\"status:\" \"up\"}", default=serialize_obj), mimetype=APPLICATION_JSON_CONTENT_TYPE)

  
if __name__ == "__main__":
    app.run(host='0.0.0.0')