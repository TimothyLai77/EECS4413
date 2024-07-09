CREATE DATABASE app;

CREATE USER 'appWorker'@'localhost';
GRANT ALL PRIVILEGES ON app.* To 'appWorker'@'localhost' IDENTIFIED BY 'password';

