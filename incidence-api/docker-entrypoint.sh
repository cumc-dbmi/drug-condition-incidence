#!/bin/sh

echo "Application Running"

source venv/bin/activate

python2 --version
echo $("which: " $(which python2))

echo $("PATH: " $(PATH))

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

python -m site

ls -la $result

export PYTHONPATH 
python2 ./incidence.py

echo "Application Stopped"
