# Dockerfile running from mysql/

FROM mysql:5.7
COPY db_script.sql /docker-entrypoint-initdb.d/
USER mysql
RUN usermod -u 1000 -g 1000 mysql
