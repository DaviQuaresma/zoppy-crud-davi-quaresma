FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --configuration=production

RUN npm install -g http-server
EXPOSE 4200
CMD ["npm", "start"]
