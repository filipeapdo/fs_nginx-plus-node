# Dockerfile running from nginx/

FROM nginx:latest
COPY node-server.conf /etc/nginx/conf.d/
RUN rm -f /etc/nginx/conf.d/default.conf
RUN apt update && \
    apt install -y wget && \
    wget -O /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it
