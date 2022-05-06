### STAGE 1: bildcode###
FROM registry.devopsnonprd.vayuktbcs:8083/e2e/tool/node:16.13.2-alpine AS builder
USER root
WORKDIR /dist/src/app
COPY . /dist/src/app
RUN npm config set strict-ssl false
RUN npm config set registry https://registry.devopsnonprd.vayuktbcs:8443/repository/npm-registry/
RUN npm config set '_auth=YnJzdXNyMDE6YnJzdXNyMDFvbmx5'
RUN npm install --verbose
RUN npm run generate


### STAGE 2: Run nginx ###
FROM registry.devopsnonprd.vayuktbcs:8083/e2e/tool/nginx:1.17-alpine
COPY nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=builder /dist/src/app/dist /usr/share/nginx/html/e2e
ENV TZ Asia/Bangkok
EXPOSE 30273
