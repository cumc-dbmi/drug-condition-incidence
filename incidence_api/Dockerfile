# pull official base image
FROM python:2.7.18-slim as build

#RUN apt-get update
#RUN apt-get install -y --no-install-recommends build-essential gcc libc6-x32
#X RUN apt-get update && apt-get install -y --no-install-recommends build-essential gcc

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
RUN . venv/bin/activate && python2 -m pip install -r requirements.txt

# STAGE TO CREATE IMAGE
FROM python:2.7.18-alpine

RUN addgroup -g 168 dbmi && \
    adduser -D -u 168 -G dbmi dbmi

RUN mkdir /usr/app && chown dbmi:dbmi /usr/app
WORKDIR /usr/app

COPY --chown=dbmi:dbmi --from=build /usr/app/venv ./venv
COPY --chown=dbmi:dbmi . .
USER 168
RUN chmod +x /usr/app/incidence.py
RUN chmod +x /usr/app/docker-entrypoint.sh

EXPOSE 5000

ENV PATH="/usr/app/venv/bin:$PATH"
ENTRYPOINT ["/usr/app/docker-entrypoint.sh"]

# LINKS
# https://snyk.io/blog/best-practices-containerizing-python-docker/?_gl=1*15siglz*_ga*Mjc0NTgyMjQ4LjE2ODQ2ODQ5NDA.*_ga_X9SH3KP7B4*MTY4NDY4NDk4NC4xLjEuMTY4NDY4NTAzMS4wLjAuMA..

# BUILD DOCKER IMAGE NO CACHE
# docker build --platform linux/arm/v8 --no-cache -t cumc-dbmi/howoften-backend .

# BUILD DOCKER IMAGE
# export DOCKER_BUILDKIT=1
# docker build -t  cumc-dbmi/howoften-backend --cache-from  cumc-dbmi/howoften-backend --build-arg BUILDKIT_INLINE_CACHE=1 .


# START DOCKER CONTAINER
# docker run --platform linux/arm/v8 cumc-dbmi/howoften-backend

# GET CONTAINER NAME 
# docker ps

# SSH INTO CONTAINER
# docker exec -it <CONTAINER> /bin/bash

# EXECUTE COMMAND IN CONTAINER
# docker exec -it <container name> <command>
