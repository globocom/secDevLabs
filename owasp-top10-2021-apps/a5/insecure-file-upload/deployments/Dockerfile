FROM php:8.2-apache

RUN a2enmod rewrite

COPY app/public /var/www/html/public
COPY deployments/apache.conf /etc/apache2/sites-available/000-default.conf


RUN mkdir -p /var/www/html/public/uploads
RUN chmod 775 /var/www/html/public/uploads

RUN chown -R www-data:www-data /var/www/html
