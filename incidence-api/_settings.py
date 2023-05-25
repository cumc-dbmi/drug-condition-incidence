# PostgreSQL
conn_str = 'postgresql://user:pass@localhost/postgres'

# Microsoft SQL Server on Linux
# conn_str = 'mssql+pymssql://user:pass@server/incidence_rate?charset=utf8'

# Microsoft SQL Server on Windows, assuming windows authentication
# conn_str = 'mssql+pyodbc://server/incidence_rate'

# If set to `None` the current schema contains the incidence tables
schema = None
# otherwise on PostgreSQL the search path will be set explicitly to this value on every connection
# schema = 'incidence_rate'
