FROM node:alpine as builder
WORKDIR /app
COPY package.json .
RUN sudo apt-get update
RUN sudo apt-get install git-core
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/builder /usr/share/nginx/html