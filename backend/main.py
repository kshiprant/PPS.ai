from fastapi import FastAPI
from queries import get_avs, get_eci, get_chargeback, get_fraud_patterns

app = FastAPI(title="Fraud & Payment Codes API")

@app.get("/avs/{code}")
def avs_lookup(code: str):
    result = get_avs(code.upper())
    return {"code": code.upper(), "results": result}

@app.get("/eci/{code}")
def eci_lookup(code: str):
    result = get_eci(code)
    return {"code": code, "results": result}

@app.get("/chargeback/{code}")
def chargeback_lookup(code: str):
    result = get_chargeback(code)
    return {"code": code, "results": result}

@app.get("/fraud")
def fraud_lookup(keyword: str):
    result = get_fraud_patterns(keyword)
    return {"keyword": keyword, "results": result}
