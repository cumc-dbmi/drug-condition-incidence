FROM node:16-alpine as build

WORKDIR /usr/app

COPY . .
RUN npm install && npm -yes install -g grunt-cli 
RUN rm -Rf dist && grunt build 

FROM nginx:1.10.1-alpine 

COPY --from=build /usr/app/dist/ /usr/share/nginx/html
