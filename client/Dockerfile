FROM node:16-alpine as build

WORKDIR /usr/app

COPY . .
RUN npm install && npm -yes install -g grunt-cli 
RUN rm -Rf dist && grunt build 

FROM nginx:1.10.1-alpine 

COPY --from=build /usr/app/dist/ /usr/share/nginx/html


# LINKS
# https://snyk.io/blog/best-practices-containerizing-python-docker/?_gl=1*15siglz*_ga*Mjc0NTgyMjQ4LjE2ODQ2ODQ5NDA.*_ga_X9SH3KP7B4*MTY4NDY4NDk4NC4xLjEuMTY4NDY4NTAzMS4wLjAuMA..

# BUILD DOCKER IMAGE NO CACHE
# docker build --platform linux/arm64/v8 --no-cache -t cumc-dbmi/howoften-frontend .  

# BUILD DOCKER IMAGE
# export DOCKER_BUILDKIT=1
# docker build -t cumc-dbmi/howoften-frontend --cache-from cumc-dbmi/howoften-frontend --build-arg BUILDKIT_INLINE_CACHE=1 .

# RUN DOCKER CONTAINER
# docker run --platform linux/arm64/v8 -p 8080:80 cumc-dbmi/howoften-frontend