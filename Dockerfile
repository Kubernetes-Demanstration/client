### STAGE 1: Build ###

FROM node:12.16.1-alpine AS compile-image
ENV NODE_DEBUG fs,module,http,https
WORKDIR /opt/ng
COPY package.json  ./


Run npm config set strict-ssl false
# RUN npm config set registry http://registry.npmjs.org/
RUN npm install
COPY . .
### ENV PATH="./node_modules/.bin:$PATH"  ###

RUN ng build --prod
### STAGE 2: Run ###
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/ng/dist/client /usr/share/nginx/html