FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV VITE_API_URL=$VITE_API_URL

EXPOSE 5173

CMD [ "npm", "run", "preview" ]