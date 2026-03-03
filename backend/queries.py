from database import query_db

def get_avs(code):
    sql = "SELECT * FROM avs_codes WHERE code = %s"
    return query_db(sql, (code,))

def get_eci(code):
    sql = "SELECT * FROM eci_values WHERE code = %s"
    return query_db(sql, (code,))

def get_chargeback(code):
    sql = "SELECT * FROM chargeback_codes WHERE code = %s"
    return query_db(sql, (code,))

def get_fraud_patterns(keyword):
    # Simple keyword search in fraud_patterns.keywords column
    sql = "SELECT * FROM fraud_patterns WHERE keywords ILIKE %s AND active = TRUE"
    return query_db(sql, (f"%{keyword}%",))
