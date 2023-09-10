FROM tiangolo/uvicorn-gunicorn:python3.11-slim

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .


ENV PORT=5001
ENV MAX_WORKERS=5
ENV GUNICORN_CMD_ARGS="--worker-tmp-dir /var/tmp"
