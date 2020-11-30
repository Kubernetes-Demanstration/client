### STAGE 1: Build ###
FROM node:12.16.1-alpine AS compile-image

WORKDIR /opt/ng
COPY package.json package-lock.json ./


RUN npm install
COPY . .
### ENV PATH="./node_modules/.bin:$PATH"  ###

RUN ng build --prod
### STAGE 2: Run ###
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/ng/dist/client /usr/share/nginx/html