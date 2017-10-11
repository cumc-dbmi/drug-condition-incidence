import pip

_all_ = [
    'Flask==0.12.2',
    'Flask-Cors==3.0.3',
    'sqlalchemy==0.9.0',
    'nose==1.3.7'
]

windows = ['pyodbc==3.0.7']
linux = ['pymssql==2.1.3']


def install(packages):
    for package in packages:
        pip.main(['install', package])

if __name__ == '__main__':
    from sys import platform

    install(_all_)
    if platform == 'windows':
        install(windows)
    if platform.startswith('linux'):
        install(linux)
