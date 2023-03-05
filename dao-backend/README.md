## Installation

```bash
$ npm install
```

## Running the app

```bash
# DEV env
# DB container
$ docker-compose up -d

# Run DB migration scripts for first install
$ npm run migration:run

# development
$ npm run start:dev

# watch mode
$ npm run start:dev:watch



#INTEGRATION env
# Run DB migration scripts for first install
$ npm run migration:run:integration

# integartion
$ npm run start:integration

# watch mode
$ npm run start:integration:watch

```
