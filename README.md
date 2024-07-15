# First Time Setup Instructions
1. Install MariaDB for your operating system
2. fill in `.env` file (see sample below)
2. run the `db_init.sql` script in `/setup` to setup database and users
3. run `npm ci`

# Starting Backend
1. run `npm run start`

# Start Production Frontend
1. `cd` into `/client`
2. run `npm ci`
3. run `npm run build`
4. cd `../`
5. run `npm run start`


# Sample .env configuration (server is configured to use these values)
```.env
DATABASE_SERVER = "localhost"
DATABASE_PORT = "3306"
DATABASE_NAME = "app"
DATABASE_USER = "appWorker"
DATABASE_PASSWORD = <<ASK FOR PASSWORD>>
```