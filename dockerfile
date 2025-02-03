FROM node:21
WORKDIR /
COPY . .
RUN npm install
CMD ["npm", "start"]