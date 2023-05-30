# pull official base image
FROM python:2.7.18-slim as build

RUN apt-get update
RUN apt-get install -y --no-install-recommends build-essential gcc libc6-x32

# set environment variables
#X ENV PYTHONDONTWRITEBYTECODE=1
#X ENV PYTHONUNBUFFERED=1

# set work directory
WORKDIR /usr/app

# create venv to gather dependencies
RUN python2 -m pip install virtualenv
RUN rm -rf /usr/app/venv
RUN python2 -m virtualenv /usr/app/venv
ENV PATH="/usr/app/venv/bin:$PATH"

COPY requirements.txt .
RUN . /usr/app/venv/bin/activate && python2 -m pip install flask==0.12.2 flask-cors==3.0.3 sqlalchemy==0.9.0 nose==1.3.7 pymssql==2.1.3

# STAGE TO CREATE IMAGE
FROM python:2.7.18-alpine AS build-image

RUN addgroup -g 168 dbmi && \
    adduser -D -u 168 -G dbmi dbmi

RUN mkdir /usr/app && chown dbmi:dbmi /usr/app
WORKDIR /usr/app

COPY --chown=dbmi:dbmi --from=build /usr/app/venv ./venv
COPY --chown=dbmi:dbmi . .
USER 168
RUN chmod +x /usr/app/incidence.py
RUN chmod +x /usr/app/docker-entrypoint.sh

EXPOSE 8085

RUN pip install gunicorn==19.9.0

ENV PATH="/usr/app/venv/bin/python2:/usr/app/venv/bin:$PATH"
ENTRYPOINT ["/usr/app/docker-entrypoint.sh"]

# LINKS
# https://snyk.io/blog/best-practices-containerizing-python-docker/?_gl=1*15siglz*_ga*Mjc0NTgyMjQ4LjE2ODQ2ODQ5NDA.*_ga_X9SH3KP7B4*MTY4NDY4NDk4NC4xLjEuMTY4NDY4NTAzMS4wLjAuMA..

# BUILD DOCKER IMAGE NO CACHE
# docker build --no-cache -t cumc-dbmi/howoften-backend .

# BUILD DOCKER IMAGE
# export DOCKER_BUILDKIT=1
# docker build -t  cumc-dbmi/howoften-backend --cache-from  cumc-dbmi/howoften-backend --build-arg BUILDKIT_INLINE_CACHE=1 .


# START DOCKER CONTAINER
# docker run -p 8080:5000 cumc-dbmi/howoften-backend

# GET CONTAINER NAME 
# docker ps

# SSH INTO CONTAINER
# docker exec -it <CONTAINER> /bin/bash

# EXECUTE COMMAND IN CONTAINER
# docker exec -it <container name> <command>
