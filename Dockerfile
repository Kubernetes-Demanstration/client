### STAGE 1: Build ###
FROM node:12.16.1-alpine AS compile-image

WORKDIR /opt/ng
COPY package.json package-lock.json ./

Run npm config set proxy null
Run npm config set https-proxy null
RUN npm config set registry http://registry.cnpmjs.org/
RUN npm install
COPY . .
### ENV PATH="./node_modules/.bin:$PATH"  ###

RUN ng build --prod
### STAGE 2: Run ###
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/ng/dist/client /usr/share/nginx/html