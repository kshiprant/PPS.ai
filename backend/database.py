# database.py
import psycopg2
from psycopg2.extras import RealDictCursor
import config  # import config file with DB credentials

def get_connection():
    """
    Connect to the PostgreSQL database using credentials from config.py
    """
    conn = psycopg2.connect(
        host=config.DB_HOST,
        database=config.DB_NAME,
        user=config.DB_USER,
        password=config.DB_PASSWORD,
        port=config.DB_PORT
    )
    return conn

def query_db(query, params=None):
    """
    Execute a query and return all results as a list of dictionaries
    """
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute(query, params or ())
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result
