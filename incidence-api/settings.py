import os

username = os.environ['DATASOURCE_USERNAME']
password = os.environ['DATASOURCE_PASSWORD']
hostname = os.environ['DATASOURCE_HOSTNAME']
port = os.environ['DATASOURCE_PORT']
database = os.environ['DATASOURCE_DATABASE']
schema = os.environ['DATASOURCE_SCHEMA']
conn_str = 'mssql+pymssql://{username}:{password}@{hostname}:{port}/{database}'.format(username=username, password=password, hostname=hostname, port=port, database=database)

# If set to `None` the current schema contains the incidence tables
# schema = None
# otherwise on PostgreSQL the search path will be set explicitly to this value on every connection
