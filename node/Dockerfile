# Dockerfile running from node/

FROM node:latest
WORKDIR /usr/src/app
RUN apt update && \
    apt install -y wget && \
    wget -O /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it

EXPOSE 3000
