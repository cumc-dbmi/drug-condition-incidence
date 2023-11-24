#!/bin/sh
DATABASESERVER_CHECK_MAX_ATTEMPTS=10
DATABASESERVER_CHECK_SLEEP_TIME=30

echo "Application Running"

source venv/bin/activate

echo ""
echo "PATH: "$PATH
echo ""

python2 --version
str=$(which python2)
echo "PYTHONEXE:"$str

oldstr="\/bin\/python2"
newstr=""
pythonuserbase=$(echo $str | sed "s/$oldstr/$newstr/")
echo "PYTHONUSERBASE:$pythonuserbase"
export PYTHONUSERBASE=$pythonuserbase

oldstr="\/bin\/python2"
newstr="\/lib\/python2.7\/site-packages"
pythonpath=$(echo $str | sed "s/$oldstr/$newstr/")
echo "PYTHONPATH:$pythonpath"
export PYTHONPATH=$pythonpath
echo ""

python -m site
echo ""

print_datasource_info(){
  echo ""
  echo "ENVIRONNMENT VARIABLES"
  echo "------------------------------------------"
  echo "DATASOURCE_USERNAME: "$DATASOURCE_USERNAME
  echo "DATASOURCE_HOSTNAME: "$DATASOURCE_HOSTNAME
  echo "DATASOURCE_PORT: "$DATASOURCE_PORT
  echo "DATASOURCE_SCHEMA: "$DATASOURCE_SCHEMA
  echo "DATASOURCE_DATABASE: "$DATASOURCE_DATABASE
  echo "------------------------------------------"
}
print_datasource_info

python ./incidence.py

# Start Gunicorn
#echo "================================================"
#echo "Starting app with Gunicorn"
#source venv/bin/activate && python2 -m pip install gunicorn && 
#echo $(ls -lrt /usr/app/venv/bin |grep gunicorn) 
#/usr/app/venv/bin/gunicorn --bind :5000 --workers 3 --access-logfile --error-logfile - incidence:app

echo ""
echo "Application Stopped"
