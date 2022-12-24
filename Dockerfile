FROM node:18.12

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY ./dist ./

CMD ["npm", "run", "start:prod"]
