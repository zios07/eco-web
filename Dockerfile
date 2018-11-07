FROM node:alpine as builder
WORKDIR /app
COPY package.json .
RUN apk update && \
    apk upgrade && \
    apk add git
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/builder /usr/share/nginx/html