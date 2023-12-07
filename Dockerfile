FROM node:18-alpine as builder



WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start:prod"]

