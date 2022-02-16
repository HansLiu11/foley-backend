FROM node:14-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./
EXPOSE 3000

FROM base as builder
RUN npm ci
COPY . .
RUN npx tsc

FROM base as production
ENV NODE_ENV=production
RUN npm ci --only=prod &&\
    npm rb &&\
    npm cache clean --force &&\
    touch .env

COPY . .
COPY --from=builder /usr/src/app/dist /usr/src/app/dist
ENV DB_USERNAME=\
    DB_PASSWORD=\
    DB_HOST=\
    DB_NAME=\
    PORT=

CMD ["node", "dist/app.js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm i
RUN npm rb &&\
    npm cache clean --force &&\
    touch .env
COPY . /
ENV DB_USERNAME=\
    DB_PASSWORD=\
    DB_HOST=\
    DB_NAME=\
    PORT=

CMD ["npm", "run", "start:dev"]