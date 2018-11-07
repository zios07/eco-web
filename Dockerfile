FROM node:alpine as builder
WORKDIR /app
COPY package.json .
RUN apt-get update && \
    apt-get upgrade && \
    apt-get install -y git
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/builder /usr/share/nginx/html