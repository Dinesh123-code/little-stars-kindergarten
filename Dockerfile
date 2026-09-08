FROM php:8.2-apache

# Install PDO MySQL & SQLite extensions
RUN docker-php-ext-install pdo pdo_mysql

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy PHP project and API files to Apache root
COPY php_project/ /var/www/html/
COPY php/ /var/www/html/php/
COPY php/api/ /var/www/html/api/

# Set working directory and permissions
WORKDIR /var/www/html
RUN chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80
