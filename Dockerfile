# build
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev
COPY . .

RUN npm run build

# nginx
FROM nginx:1.21.6-alpine

COPY --from=builder ./app/build /usr/share/nginx/html