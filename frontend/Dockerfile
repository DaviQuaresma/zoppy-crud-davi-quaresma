# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Etapa de produção
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/dist/frontend/browser/browser /app
RUN npm install -g http-server
EXPOSE 4200
CMD ["http-server", "/app", "-p", "4200"]
