FROM tiangolo/uvicorn-gunicorn:python3.11-slim

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=5001
ENV MAX_WORKERS=15
ENV GUNICORN_CMD_ARGS="--worker-tmp-dir /var/tmp"
