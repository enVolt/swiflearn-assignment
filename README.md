# Swiflearn Assignment

This repository has two parts -

1. Client
2. Server

Both need to be started in order to run the project.

# Prerequisites

* Node.js (This was built on v12.14.1)
* PostgreSQL (or can be run on MySQL by installing relevant adapter on server)

# How to run

1. Create `.env` file for Backend (`PROJECT_DIR/server/.env`) refering to `.env.example`

2. Install Deps -

```bash
cd ./client
npm i

cd ../server
npm i
npm run migrate
npm run seed
```

3. Start Backend -

```bash
cd ./server
npm start
````

4. From a different terminal, run Frontend -

```bash
cd ./client
PORT=3001 npm start
```

5. Web browser should open pointing to `http://localhost:3001`


