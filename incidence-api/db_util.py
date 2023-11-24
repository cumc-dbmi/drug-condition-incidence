def determine_dialect(conn_str):
    result = None
    if conn_str.startswith('mssql'):
        result = 'mssql'
    elif conn_str.startswith('postgresql'):
        result = 'postgresql'
    else:
        colon_index = conn_str.find(':')
        plus_index = conn_str.find('+')
        dialect_end_index = colon_index if colon_index > -1 else plus_index
        if dialect_end_index > -1:
            result = conn_str[0:dialect_end_index]
    return result
