FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# Accept build argument and set it as environment variable
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# If you're building your app inside the container
RUN npm run build  

EXPOSE 5173

CMD [ "npm", "run", "preview" ]