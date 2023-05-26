#!/bin/sh

echo "Application Running"

echo ""
echo "ENVIRONNMENT VARIABLES"
echo "------------------------------------------"
echo "DATASOURCE_USERNAME: "$DATASOURCE_USERNAME
echo "DATASOURCE_HOSTNAME: "$DATASOURCE_HOSTNAME
echo "DATASOURCE_PORT: "$DATASOURCE_PORT
echo "DATASOURCE_SCHEMA: "$DATASOURCE_SCHEMA
echo "DATASOURCE_DATABASE: "$DATASOURCE_DATABASE
echo "------------------------------------------"

source venv/bin/activate

python2 --version
echo ""
echo "which: " $(which python2)
echo ""
echo "PATH: "$PATH
echo ""
str=$(which python2)

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

python2 ./incidence.py

echo "Application Stopped"
