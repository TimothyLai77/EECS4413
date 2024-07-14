DROP USER 'appWorker'@'localhost';
DROP DATABASE app;

CREATE DATABASE app;

CREATE USER 'appWorker'@'localhost';
GRANT ALL PRIVILEGES ON app.* To 'appWorker'@'localhost' IDENTIFIED BY 'password';