FROM node:lts-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm install


COPY . .
RUN npm run build

FROM node:lts-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]
