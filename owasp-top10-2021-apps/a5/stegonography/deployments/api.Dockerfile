FROM node:22-bookworm-slim
WORKDIR /app
ADD app/ /app
RUN apt-get update && \
    npm install package.json
CMD node index.js