FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps --no-audit --no-fund

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev --legacy-peer-deps --no-audit --no-fund

COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
