FROM node:18

WORKDIR /usr/scr/app

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
