FROM node:alpine

RUN apk add --no-cache tini

WORKDIR /app

COPY ./package.json /app
RUN yarn -s
COPY . /app
RUN yarn tsc

ENTRYPOINT ["/sbin/tini", "--"]
