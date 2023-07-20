from flask import Flask, request, Response
from flask_cors import CORS

import decimal
import json
import logging.config
from sqlalchemy import exc
import time
from functools import wraps

from db import drug_condition, drug_list, condition_list, incidence_rate, incidence_rate_source_details

# Configure the logging package from the logging ini file; defined as an environment variable
logging.config.fileConfig('/usr/app/config/logging.ini', disable_existing_loggers=False)

#Get a logger for our module
log = logging.getLogger(__name__)


app = Flask(__name__)
cors  = CORS(app)

APPLICATION_JSON_CONTENT_TYPE = 'application/json'

def timer_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()  # Use time.time instead of time.perf_counter
        result = func(*args, **kwargs)
        end_time = time.time()  # Use time.time instead of time.perf_counter
        elapsed_time = end_time - start_time
        log.info('Function {func.__name__} took {elapsed_time:.4f} seconds.'.format(func=func, elapsed_time=elapsed_time))
        return result
    return wrapper


def serialize_obj(obj):
    if isinstance(obj, decimal.Decimal):
        return str(round(obj, 4))
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)


@app.route("/incidence-api/drug_condition", methods=['GET'])
@timer_decorator
def drug_condition_endpoint():
    concept_id = request.args.get('drug_concept_id', type=int)
    results = drug_condition(concept_id)
    response_body = json.dumps(results, default=serialize_obj)
    return Response(response_body, mimetype=APPLICATION_JSON_CONTENT_TYPE)


@app.route("/incidence-api/drug_list", methods=['GET'])
@timer_decorator
def drug_list_endpoint():
    log.debug('GET /drug_list')
    try:
        results = drug_list()
        response_body = json.dumps(results, default=serialize_obj)
        return Response(response_body, mimetype=APPLICATION_JSON_CONTENT_TYPE)
    except exc.SqlAlchemyError:
        log.exception('An exception occurred while retireving all drugs')

@app.route("/incidence-api/condition_list", methods=['GET'])
@timer_decorator
def condition_list_endpoint():
    log.debug('GET /condition_list')
    try:
        concept_id = request.args.get('drug_concept_id', type=int)
        results = condition_list(concept_id)
        response_body = json.dumps(results, default=serialize_obj)
        return Response(response_body, mimetype=APPLICATION_JSON_CONTENT_TYPE)
    except exc.SqlAlchemyError:
        log.exception('An exception occurred while retireving condition list using provided drug concept id: ' + concept_id)


@app.route("/incidence-api/incidence_rate", methods=['GET'])
@timer_decorator
def incidence_rate_endpoint():
    log.debug('GET /incidence_rate')
    try:
        drug_concept_id = request.args.get('drug_concept_id', type=int)
        outcome_concept_id = request.args.get('outcome_concept_id', type=int)
        time_at_risk_id = request.args.get('time_at_risk_id', type=int)
        incidence_rate_results = incidence_rate(drug_concept_id, outcome_concept_id, time_at_risk_id)
        incidence_rate_results['source_details'] = incidence_rate_source_details(drug_concept_id,
                                                                             outcome_concept_id,
                                                                             time_at_risk_id)
        response_body = json.dumps(incidence_rate_results, default=serialize_obj)
        return Response(response_body, mimetype=APPLICATION_JSON_CONTENT_TYPE)
    except exc.SqlAlchemyError:
        log.exception('An exception occurred while retireving incidence rate.')


@app.route("/incidence-api/incidence_rate_source_details", methods=['GET'])
@timer_decorator
def incidence_rate_source_endpoint():
    log.debug('GET /incidence_rate_source_details')
    try:
        drug_concept_id = request.args.get('drug_concept_id', type=int)
        outcome_concept_id = request.args.get('outcome_concept_id', type=int)
        time_at_risk_id = request.args.get('time_at_risk_id', type=int)
        results = incidence_rate_source_details(drug_concept_id, outcome_concept_id, time_at_risk_id)
        response_body = json.dumps(results, default=serialize_obj)
        return Response(response_body, mimetype=APPLICATION_JSON_CONTENT_TYPE)
    except exc.SqlAlchemyError:
        log.exception('An exception occurred while retireving incidence rate source details.')    


@app.route("/incidence-api/ops/health", methods=['GET'])
@timer_decorator
def ops_health():
    log.debug('GET /ops/health')
    return Response(json.dumps({"status": "up"}), mimetype="application/json")    

  
if __name__ == "__main__":
    app.run(host='0.0.0.0')