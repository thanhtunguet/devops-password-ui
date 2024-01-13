# Using nginx to serve front-end
FROM nginx:alpine

EXPOSE 8080

WORKDIR /usr/share/nginx/html/

USER root
RUN chmod -R g+w /var/cache/
RUN chmod -R g+w /var/run/

# Copy built artifacts
COPY ./dist/ ./
