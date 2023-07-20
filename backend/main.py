import sys

from fastapi import FastAPI, APIRouter

version = f"{sys.version_info.major}.{sys.version_info.minor}"

app = FastAPI()
router = APIRouter()

@router.get("/")
async def root():
    message = f"Hello world! From FastAPI running on Uvicorn with Gunicorn. Using Python {version}"
    return {"message": message}

app.include_router(router, prefix="/api/incidence/v2")

@app.get("/")
async def getroot():
    message = f"Hello world! From FastAPI running on Uvicorn with Gunicorn. Using Python {version}"
    return {"message": message}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
