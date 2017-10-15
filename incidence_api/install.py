from sys import platform
import pip
import db_util

_all_ = [
    'Flask==0.12.2',
    'Flask-Cors==3.0.3',
    'sqlalchemy==0.9.0',
    'nose==1.3.7'
]

MSSQL_WIN32_PKG = 'pyodbc==3.0.7'
MSSQL_LINUX_PKG = 'pymssql==2.1.3'
POSTGRES_PKG = 'psycopg2==2.7.3.1'
DB_PKG_DEFAULTS = dict(mysql='MySQL-python',
                       oracle='cx_Oracle')
CONN_STR_INVALID = 'The connection string in settings.py is not valid'
WARNING_DIALECT_FMT = 'Warning: dialect `%s` on platform `%s` has not been tested'


def determine_db_pkg(conn_str):
    """
    Determine the DBAPI package to install
    :param conn_str: connection string (from settings)
    :return: name of package
    """
    result = None
    dialect = db_util.determine_dialect(conn_str)

    if dialect is None:
        raise EnvironmentError(CONN_STR_INVALID)
    if dialect == 'mssql':
        if platform == 'win32':
            result = MSSQL_WIN32_PKG
        elif platform.startswith('linux'):
            result = MSSQL_LINUX_PKG
    elif dialect == 'postgresql':
        result = POSTGRES_PKG
    elif dialect in DB_PKG_DEFAULTS:
        result = DB_PKG_DEFAULTS[dialect]
        print WARNING_DIALECT_FMT % (dialect, platform)
    else:
        raise EnvironmentError(CONN_STR_INVALID)
    return result


def install():
    import settings

    to_install = []
    to_install.extend(_all_)
    db_pkg = determine_db_pkg(settings.conn_str)
    if db_pkg is None:
        raise EnvironmentError(CONN_STR_INVALID)
    to_install.extend([db_pkg])
    for package in to_install:
        pip.main(['install', package])


if __name__ == '__main__':
    install()
