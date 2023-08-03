import os

driver = os.environ['DATASOURCE_DRIVER']
username = os.environ['DATASOURCE_USERNAME']
password = os.environ['DATASOURCE_PASSWORD']
hostname = os.environ['DATASOURCE_HOSTNAME']
port = os.environ['DATASOURCE_PORT']
database = os.environ['DATASOURCE_DATABASE']
schema = os.environ['DATASOURCE_SCHEMA']
#MS SQL
#conn_str = 'mssql+pymssql://{username}:{password}@{hostname}:{port}/{database}'.format(driver=driver, username=username, password=password, hostname=hostname, port=port, database=database)
#print("CONN STRING: "+conn_str)
conn_str = '{driver}://{username}:{password}@{hostname}:{port}/{database}'.format(driver=driver, username=username, password=password, hostname=hostname, port=port, database=database)
#print("CONN STRING: "+conn_str)