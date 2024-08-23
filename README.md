

# Installation/Setup (Docker Compose)
* Create a `docker-compose.yml` file, and copy the following: 
* Make changes as desired (updating passwords, ports, etc. (recommended to move passwords to an .env), posted here as an example and for simplicity)
* Run `docker compose pull`
* Run `docker compose up`
```yml
version: '3.1'

services:
  app:
    image: notnottimothy77/ecommerce-app
    command: "bash -c 'while !</dev/tcp/db/3306; do sleep 1; done; node /app/server.js'"
    ports:
      - 80:8080
    depends_on:
      - db

  db:
    image: mariadb
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_USER: appWorker
      MYSQL_PASSWORD: password
      MYSQL_DATABASE: app
    ports:
      - 3306:3306

```
* This was tested on Ubuntu 24.04 LTS and Debian 12
* Also tested on a Microsoft Azure Ubuntu VM. 

## Application Admin Account Details:
* In the application the administrator email and password is `root@app.com` and `root` respectively. 
