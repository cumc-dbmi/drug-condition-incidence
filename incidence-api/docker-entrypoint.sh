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

ping_database_server() {
  attempt=1  
  while [ "$attempt" -le "$DATABASESERVER_CHECK_MAX_ATTEMPTS" ]
  do
    # Ping the server. Change 1 to the number of packets you want to send.
    ping -c 1 "$DATASOURCE_HOSTNAME" >/dev/null 2>&1

    # If the server is reachable
    if [ "$?" -eq 0 ]
    then
      echo "DATASOURCE CHECK: Server is up. Starting API server..."
      echo ""
      return 0
    else
      echo "DATASOURCE CHECK: Server is not reachable. Retry after $DATABASESERVER_CHECK_SLEEP_TIME seconds. Attempt #$attempt of $DATABASESERVER_CHECK_MAX_ATTEMPTS."
      
      # Increment attempt counter
      attempt=$(expr $attempt + 1)

      # If maximum attempts reached
      if [ $attempt -gt $DATABASESERVER_CHECK_MAX_ATTEMPTS ]
      then
        echo "Max attempts reached. Exiting..."
        return 1
      else
        # Wait before retrying
        sleep $DATABASESERVER_CHECK_SLEEP_TIME

      fi
    fi
  done
}

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

ping_database_server

python2 ./incidence.py

echo ""
echo "Application Stopped"
