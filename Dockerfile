FROM nginx
RUN mkdir /app
COPY dist /app
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80