FROM php:apache

COPY deployments/apache.conf /etc/apache2/sites-available/000-default.conf
COPY deployments/php.ini /usr/local/etc/php/

RUN chown -R www-data:www-data /var/www/html && a2enmod rewrite