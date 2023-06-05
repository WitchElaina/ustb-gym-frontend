FROM node

COPY . /app
RUN cd /app && npm install && npm run build

WORKDIR /app
CMD ["npm", "run", "preview"]

EXPOSE 4173