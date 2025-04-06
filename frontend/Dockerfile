FROM node:22-alpine AS builder

WORKDIR /usr/src/app
ENV PATH /usr/src/node_modules/.bin:$PATH

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

COPY package.json ./

RUN npm install
RUN npm install -g vite

COPY . ./

FROM builder as prod-builder
RUN vite build

FROM nginx:latest as prod

COPY --from=prod-builder /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]