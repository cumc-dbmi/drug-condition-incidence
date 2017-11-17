import json
import unittest

from incidence_api import db
from incidence_api import incidence
from incidence_api.incidence import APPLICATION_JSON_CONTENT_TYPE

SIMVASTATIN_DRUG_CONCEPT_ID = 1518133
ALOPECIA_CONDITION_CONCEPT_ID = 133280
SIMVASTATIN_DRUG_1_ING_CONCEPT_ID = 1539403
SWOLLEN_CONDITION_CONCEPT_ID = 4144411
TIME_AT_RISK_ID_365 = 365


class IncidenceTest(unittest.TestCase):
    def setUp(self):
        super(IncidenceTest, self).setUp()

    def test_drug_condition(self):
        expected_count = 85
        result = db.drug_condition(SIMVASTATIN_DRUG_1_ING_CONCEPT_ID)
        actual_count = len(result)
        self.assertEqual(expected_count, actual_count)

    def test_drug_list(self):
        expected_count = 2185
        result = db.drug_list()
        actual_count = len(result)
        self.assertEqual(expected_count, actual_count)

    def test_condition_list(self):
        expected_count = 16138
        result = db.condition_list(SIMVASTATIN_DRUG_1_ING_CONCEPT_ID)
        actual_count = len(result)
        self.assertEqual(expected_count, actual_count)

    def test_drug_condition_endpoint(self):
        with incidence.app.test_client() as c:
            data = dict(drug_concept_id=SIMVASTATIN_DRUG_1_ING_CONCEPT_ID)
            response = c.get('/drug_condition', query_string=data, content_type=APPLICATION_JSON_CONTENT_TYPE)
            response_data = json.loads(response.data)
            expected = 85
            self.assertTrue(type(response_data) is list)
            self.assertTrue(len(response_data) == expected)

    def test_incidence_rate(self):
        result = db.incidence_rate(SIMVASTATIN_DRUG_1_ING_CONCEPT_ID, SWOLLEN_CONDITION_CONCEPT_ID,
                                   TIME_AT_RISK_ID_365)
        self.assertTrue(type(result) is dict)
        self.assertTrue('incidence_proportion_range_high' in result)
        self.assertTrue('incidence_proportion_range_low' in result)

    def test_incidence_rate_endpoint(self):
        with incidence.app.test_client() as c:
            data = dict(drug_concept_id=SIMVASTATIN_DRUG_1_ING_CONCEPT_ID,
                        outcome_concept_id=SWOLLEN_CONDITION_CONCEPT_ID,
                        time_at_risk_id=TIME_AT_RISK_ID_365)
            response = c.get('/incidence_rate', query_string=data, content_type=APPLICATION_JSON_CONTENT_TYPE)
            response_data = json.loads(response.data)
            self.assertTrue('incidence_proportion_range_high' in response_data)
            self.assertTrue('incidence_proportion_range_low' in response_data)
            self.assertTrue('source_details' in response_data)
            self.assertTrue(type(response_data['source_details']) is list)

    def test_serialize_obj(self):
        import decimal
        d = decimal.Decimal('0.00099123')
        result = incidence.serialize_obj(d)
        self.assertTrue('0.001' == result)

    def tearDown(self):
        pass
