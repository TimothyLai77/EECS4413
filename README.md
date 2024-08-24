

# Installation/Setup (Docker Compose)
* Create a `docker-compose.yml` file, and copy the following below
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
* Project should be on `localhost:80`
* This was tested on Ubuntu 24.04 LTS and Debian 12
* Also tested on a Microsoft Azure Ubuntu VM. 

# Installation/Setup on local machine (no docker):
* have MariaDB installed on your system. 
* clone this repository, and navigate inside
* run `npm install` on the project root directory
* create a `.env` file and populate it with (the app is configured to use these values): 
```env
DATABASE_SERVER = "localhost"
DATABASE_PORT = "3306"
DATABASE_NAME = "app"
DATABASE_USER = "appWorker"
DATABASE_PASSWORD = "password"
```
* Build the front end by: navigating to `client/` and run `npm install` followed by `npm run build`
* Navigate back to the project root and init the database by running `setup/db_init.sql`
* navigate back to the project root, and run `npm run start`. Project is on `localhost:8080`

## Application Admin Account Details:
* In the application the administrator email and password is `root@app.com` and `root` respectively. 
