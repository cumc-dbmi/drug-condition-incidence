# Incidence API

Backend REST API with the endpoints described below

### POST `/drug_condition`
 * __Request body__ list of drug concept_ids
 * __Response body__ list of associated conditions as list of objects

## Requirements
 * Python 2.7
 * [virtualenv](https://virtualenv.pypa.io/en/stable/installation/) (optional, but highly recommended)

## Installation
 * Create a file `settings.py` (see examples in `_settings.py`)
 * If using virtualenv, activate the environment:
 
       source /path/to/venv/bin/activate
   
 * Install required packages by running this at the command line:
 
       python install.py

## Running

      python incidence.py
