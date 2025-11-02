FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i --only=production

COPY . .

RUN mkdir -p uploads

EXPOSE 3001

CMD ["npm", "start"]
