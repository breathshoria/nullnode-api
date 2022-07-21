FROM node:16-buster as dev

WORKDIR /usr/src/app

COPY --chown=node:node  package*.json ./

RUN npm ci

COPY --chown=node:node  . .

RUN chown -R node:node ./node_modules

USER node

FROM node:16-buster as build

WORKDIR /usr/src/app

COPY package*.json ./

COPY --from=dev /usr/src/app/node_modules ./node_modules

COPY . .

RUN npx prisma generate

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

FROM node:16-buster as production

COPY --from=build /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/src/main.js" ]