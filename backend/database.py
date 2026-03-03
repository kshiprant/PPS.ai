import psycopg2
from psycopg2.extras import RealDictCursor

def get_connection():
    # Replace with your actual DB credentials
    conn = psycopg2.connect(
        host="YOUR_DB_HOST",
        database="YOUR_DB_NAME",
        user="YOUR_DB_USER",
        password="YOUR_DB_PASSWORD"
    )
    return conn

def query_db(query, params=None):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, params or ())
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result
